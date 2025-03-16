import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import cliProgress from 'cli-progress'
import chalk from 'chalk'

import { contentResource, contentResourceResource } from '../db/schema'
import slugify from 'slugify'
import { guid } from '../utils/guid'

import db from '@/db'
const LEGACY_CONTENT_PATH = path.join(process.cwd(), 'legacy-content')

// Helper function to create a slug from filename or string
function createSlug(name: string): string {
	// Remove numbers and file extension from filename
	const cleanName = name.replace(/^\d+-/, '').replace(/\.mdx$/, '')
	return slugify(cleanName, { lower: true })
}

// Helper function to create title from slug
function createTitle(slug: string): string {
	return slug
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')
}

// Helper function to generate an ID with the format type_guid
function generateId(type: 'module' | 'section' | 'lesson'): string {
	return `${type}_${guid()}`
}

type CourseConfig = {
	id: string
	type: string
	introduction: string
	resources: Array<ResourceConfig>
}

type ResourceConfig = {
	id: string
	type: string
	path?: string
	title?: string
	resources?: Array<ResourceConfig>
}

type ContentResource = typeof contentResource.$inferInsert
type ContentResourceResource = typeof contentResourceResource.$inferInsert

interface MigrationData {
	resources: ContentResource[]
	relationships: ContentResourceResource[]
}

// Function to read MDX file content
function readMdxFile(filePath: string): { title: string; description: string; body: string } {
	if (!fs.existsSync(filePath)) {
		return { title: '', description: '', body: '' }
	}

	const fileContent = fs.readFileSync(filePath, 'utf-8')
	const { data: frontmatter, content } = matter(fileContent)

	return {
		title: frontmatter.title || '',
		description: frontmatter.description || '',
		body: content,
	}
}

async function generateMigrationData(): Promise<MigrationData> {
	const resources: ContentResource[] = []
	const relationships: ContentResourceResource[] = []

	// Read all course directories
	const courseDirectories = fs
		.readdirSync(LEGACY_CONTENT_PATH)
		.filter((item) => fs.statSync(path.join(LEGACY_CONTENT_PATH, item)).isDirectory())

	for (const courseDir of courseDirectories) {
		const coursePath = path.join(LEGACY_CONTENT_PATH, courseDir)
		const configPath = path.join(coursePath, 'course-config.json')

		// Skip if no config file exists
		if (!fs.existsSync(configPath)) {
			console.warn(chalk.yellow(`No course config found for ${courseDir}, skipping...`))
			continue
		}

		// Parse the course config
		const courseConfig: CourseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

		// Read the introduction file to get course metadata
		const introPath = path.join(coursePath, courseConfig.introduction)
		const {
			title: courseTitle,
			description: courseDescription,
			body: courseBody,
		} = readMdxFile(introPath)

		// Create the module (formerly course)
		const moduleId = generateId('module')
		const moduleSlug = createSlug(courseConfig.id)

		resources.push({
			id: moduleId,
			type: 'module',
			fields: {
				title: courseTitle || createTitle(moduleSlug),
				description: courseDescription,
				body: courseBody,
				slug: moduleSlug,
			},
		})

		// Process the resources in the config
		let resourcePosition = 0

		// Process top-level resources in the config
		for (const resource of courseConfig.resources) {
			if (resource.type === 'section') {
				// Process section
				const sectionId = generateId('section')
				const sectionSlug = createSlug(resource.id)
				const sectionTitle = resource.title || createTitle(sectionSlug)

				resources.push({
					id: sectionId,
					type: 'section',
					fields: {
						title: sectionTitle,
						slug: sectionSlug,
					},
				})

				// Link section to module
				relationships.push({
					resourceOfId: moduleId,
					resourceId: sectionId,
					position: resourcePosition++,
				})

				// Process lessons in the section
				if (resource.resources && resource.resources.length > 0) {
					let lessonPosition = 0

					for (const lesson of resource.resources) {
						if (lesson.type === 'lesson' && lesson.path) {
							const lessonId = generateId('lesson')
							const lessonPath = path.join(coursePath, lesson.path)
							const {
								title: lessonTitle,
								description: lessonDescription,
								body: lessonBody,
							} = readMdxFile(lessonPath)
							const lessonSlug = createSlug(lesson.id)

							resources.push({
								id: lessonId,
								type: 'lesson',
								fields: {
									title: lessonTitle || createTitle(lessonSlug),
									description: lessonDescription,
									body: lessonBody,
									slug: lessonSlug,
								},
							})

							// Link lesson to section
							relationships.push({
								resourceOfId: sectionId,
								resourceId: lessonId,
								position: lessonPosition++,
							})
						}
					}
				}
			} else if (resource.type === 'lesson' && resource.path) {
				// Process top-level lesson
				const lessonId = generateId('lesson')
				const lessonPath = path.join(coursePath, resource.path)
				const {
					title: lessonTitle,
					description: lessonDescription,
					body: lessonBody,
				} = readMdxFile(lessonPath)
				const lessonSlug = createSlug(resource.id)

				resources.push({
					id: lessonId,
					type: 'lesson',
					fields: {
						title: lessonTitle || createTitle(lessonSlug),
						description: lessonDescription,
						body: lessonBody,
						slug: lessonSlug,
					},
				})

				// Link lesson directly to module
				relationships.push({
					resourceOfId: moduleId,
					resourceId: lessonId,
					position: resourcePosition++,
				})
			}
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
