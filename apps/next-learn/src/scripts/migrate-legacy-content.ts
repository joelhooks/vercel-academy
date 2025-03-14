import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import cliProgress from 'cli-progress'
import chalk from 'chalk'

import { contentResource, contentResourceResource } from '../db/schema'
import slugify from 'slugify'
import { ulid } from 'ulid'

import db from '@/db'
const LEGACY_CONTENT_PATH = path.join(process.cwd(), 'legacy-content')

// Helper function to create a slug from filename
function createSlug(filename: string): string {
	// Remove numbers and file extension from filename
	const cleanName = filename.replace(/^\d+-/, '').replace(/\.mdx$/, '')
	return slugify(cleanName, { lower: true })
}

// Helper function to get position from filename
function getPosition(filename: string): number {
	const match = filename.match(/^(\d+)/)
	return match ? Number.parseInt(match[1] ?? '0', 10) - 1 : 0
}

// Helper function to create title from slug
function createTitle(slug: string): string {
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

type ContentResource = typeof contentResource.$inferInsert
type ContentResourceResource = typeof contentResourceResource.$inferInsert

interface MigrationData {
	resources: ContentResource[]
	relationships: ContentResourceResource[]
}

async function generateMigrationData(): Promise<MigrationData> {
	const resources: ContentResource[] = []
	const relationships: ContentResourceResource[] = []

	// Create the module (previously course)
	const moduleId = ulid()
	resources.push({
		id: moduleId,
		type: 'module',
		fields: {
			title: 'Next.js Foundations',
			slug: 'nextjs-foundations',
		},
	} as typeof contentResource.$inferInsert)

	// Read all section directories
	const sections = fs
		.readdirSync(LEGACY_CONTENT_PATH)
		.filter((item) => fs.statSync(path.join(LEGACY_CONTENT_PATH, item)).isDirectory())
		.sort((a, b) => {
			const posA = getPosition(a)
			const posB = getPosition(b)
			return posA - posB
		})

	let sectionPosition = 0
	for (const section of sections) {
		const sectionPath = path.join(LEGACY_CONTENT_PATH, section)
		const sectionId = ulid()
		const sectionSlug = createSlug(section)

		// Check for index.mdx file to get section metadata
		const indexPath = path.join(sectionPath, 'index.mdx')
		let sectionTitle = createTitle(sectionSlug)
		let sectionDescription = ''
		let sectionBody = ''

		if (fs.existsSync(indexPath)) {
			const indexContent = fs.readFileSync(indexPath, 'utf-8')
			const { data: frontmatter, content } = matter(indexContent)
			sectionTitle = frontmatter.title || sectionTitle
			sectionDescription = frontmatter.description || ''
			sectionBody = content
		}

		// Create section resource
		resources.push({
			id: sectionId,
			type: 'section',
			fields: {
				title: sectionTitle,
				description: sectionDescription,
				body: sectionBody,
				slug: sectionSlug,
			},
		} as typeof contentResource.$inferInsert)

		// Link section to module (previously course)
		relationships.push({
			resourceOfId: moduleId,
			resourceId: sectionId,
			position: sectionPosition++,
		} as typeof contentResourceResource.$inferInsert)

		// Process lessons in the section
		const lessons = fs
			.readdirSync(sectionPath)
			.filter((file) => file.endsWith('.mdx') && file !== 'index.mdx') // Exclude index.mdx
			.sort((a, b) => {
				const posA = getPosition(a)
				const posB = getPosition(b)
				return posA - posB
			})

		let lessonPosition = 0
		for (const lesson of lessons) {
			const lessonPath = path.join(sectionPath, lesson)
			const lessonContent = fs.readFileSync(lessonPath, 'utf-8')
			const { data: frontmatter, content } = matter(lessonContent)
			const lessonId = ulid()
			const lessonSlug = createSlug(lesson)

			// Create lesson resource
			resources.push({
				id: lessonId,
				type: 'lesson',
				fields: {
					...frontmatter,
					body: content,
					slug: lessonSlug,
				},
			} as typeof contentResource.$inferInsert)

			// Link lesson to section
			relationships.push({
				resourceOfId: sectionId,
				resourceId: lessonId,
				position: lessonPosition++,
			} as typeof contentResourceResource.$inferInsert)
		}
	}

	return { resources, relationships }
}

function validatePositions(relationships: ContentResourceResource[]): {
	valid: boolean
	errors: string[]
} {
	const errors: string[] = []
	const positionsByParent: Record<string, number[]> = {}

	// Group positions by parent resource
	for (const rel of relationships) {
		if (!positionsByParent[rel.resourceOfId]) {
			positionsByParent[rel.resourceOfId] = []
		}
		if (typeof rel.position === 'number') {
			positionsByParent[rel.resourceOfId]?.push(rel.position)
		}
	}

	// Check each parent's positions
	for (const [parentId, positions] of Object.entries(positionsByParent)) {
		if (positions.length === 0) {
			errors.push(`Parent ${parentId}: No positions found`)
			continue
		}

		// Sort positions for checking sequence
		positions.sort((a, b) => a - b)

		// Check if positions start at 0
		const firstPosition = positions.at(0)
		if (firstPosition === undefined || firstPosition !== 0) {
			errors.push(`Parent ${parentId}: Positions don't start at 0`)
			continue
		}

		// Check for sequential numbers and duplicates
		const seen = new Set<number>()
		for (let i = 0; i < positions.length; i++) {
			const pos = positions[i]
			if (pos === undefined) {
				errors.push(`Parent ${parentId}: Invalid position at index ${i}`)
				continue
			}

			if (seen.has(pos)) {
				errors.push(`Parent ${parentId}: Duplicate position ${pos}`)
			}
			seen.add(pos)

			// Check for gaps in sequence
			if (pos !== i) {
				errors.push(`Parent ${parentId}: Missing position ${i}, found ${pos} instead`)
			}
		}
	}

	return {
		valid: errors.length === 0,
		errors,
	}
}

async function migrateContent(isDryRun = false) {
	console.log(chalk.blue('Starting migration...'))

	try {
		console.log(chalk.blue('Reading content files...'))
		const { resources, relationships } = await generateMigrationData()

		console.log(chalk.blue('Validating positions...'))
		const validation = validatePositions(relationships)
		if (!validation.valid) {
			console.error(chalk.red('Position validation failed:'))
			for (const error of validation.errors) {
				console.error(chalk.red(`- ${error}`))
			}
			process.exit(1)
		}

		if (!isDryRun) {
			console.log(chalk.blue('Inserting into database...'))
			const bar = new cliProgress.SingleBar({
				format: `Progress |${chalk.cyan('{bar}')}| {percentage}% || {value}/{total} Items`,
				barCompleteChar: '\u2588',
				barIncompleteChar: '\u2591',
			})

			const total = resources.length + relationships.length
			bar.start(total, 0)

			await db.insert(contentResource).values(resources)
			bar.update(resources.length)

			await db.insert(contentResourceResource).values(relationships)
			bar.update(total)

			bar.stop()
		} else {
			console.log(chalk.yellow('Dry run - skipping database insertion'))
			console.log(chalk.yellow('Would insert:'))
			console.log(chalk.yellow(`- ${resources.length} resources`))
			console.log(chalk.yellow(`- ${relationships.length} relationships`))
			console.log('\nValidation output:')
			console.log(JSON.stringify({ resources, relationships }, null, 2))
		}

		console.log(chalk.green('✓ Migration completed successfully'))
	} catch (error) {
		console.error(chalk.red('Migration failed:'))
		console.error(chalk.red(error instanceof Error ? error.message : String(error)))
		process.exit(1)
	}
}

async function main() {
	try {
		const isDryRun = process.argv.includes('--dry-run')
		await migrateContent(isDryRun)
	} catch (error) {
		console.error(chalk.red('Unexpected error:'))
		console.error(chalk.red(error instanceof Error ? error.message : String(error)))
		process.exit(1)
	} finally {
		// Ensure we clean up the database connection
		await db.$client.end()
	}
}

main()
