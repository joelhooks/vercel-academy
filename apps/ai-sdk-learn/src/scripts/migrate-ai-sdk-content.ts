import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import cliProgress from 'cli-progress'
import chalk from 'chalk'
import { sql, eq, inArray } from 'drizzle-orm'

import { contentResource, contentResourceResource } from '../db/schema'
import slugify from 'slugify'
import { guid } from '../utils/guid'

import db from '@/db'

// Define the root path for the AI SDK content module
const AI_SDK_ROOT_PATH = path.join(process.cwd(), 'new-content', 'ai-sdk')

// Helper function to create a slug from filename or id
function createSlug(name: string): string {
	// Remove file extension if present
	const cleanName = name.replace(/\.mdx$/, '')
	// Use the provided id/name directly for slugification, assuming it's meaningful
	return slugify(cleanName, { lower: true, strict: true }) // strict removes characters like '/'
}

// Helper function to create title from slug (fallback if not in frontmatter or config)
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

// Interfaces for course config structure (matching legacy format)
type CourseConfig = {
	id: string // Module ID (e.g., 'ai-sdk')
	dbId?: string // Optional: Database ID of the module resource
	type: string // Should be 'module' or 'course'
	introduction: string // Filename of the intro MDX (e.g., 'index.mdx')
	resources: ResourceConfig[]
}

type ResourceConfig = {
	id: string // Section or Lesson ID (e.g., '01-fundamentals', '01-01-llms')
	dbId?: string // Optional: Database ID of the section/lesson resource
	type: 'section' | 'lesson'
	path?: string // Path to lesson MDX file relative to AI_SDK_ROOT_PATH
	title?: string // Optional title override from config
	resources?: ResourceConfig[] // Nested lessons within a section
}

type ContentResource = typeof contentResource.$inferInsert
type ContentResourceResource = typeof contentResourceResource.$inferInsert

// Add 'sites' to the fields type definition if possible, or handle dynamically
interface ContentResourceFields extends Record<string, any> {
	title?: string
	description?: string
	body?: string
	slug?: string
	summary?: any
	position?: number
	sites?: string[] // Added sites field
}

// Ensure ContentResource type uses the enhanced fields definition
interface EnhancedContentResource extends Omit<ContentResource, 'fields'> {
	fields?: ContentResourceFields
}

// Modified structure to include dbId and originalId alongside generated data
interface GeneratedResourceData {
	resource: EnhancedContentResource // Use enhanced type
	originalId: string
	dbId?: string // The ID read from the config, if any
	children?: GeneratedResourceData[] // For nesting sections/lessons
}

interface MigrationData {
	moduleData: GeneratedResourceData // Single top-level module
	// We'll flatten this for DB operations later, but keep structure for processing
	// resources: ContentResource[];
	// relationships: ContentResourceResource[];
}

// Function to read MDX file content including summary
function readMdxFile(filePath: string): {
	title: string
	description: string
	summary: any
	body: string
} {
	if (!fs.existsSync(filePath)) {
		console.warn(chalk.yellow(`File not found: ${filePath}`))
		return { title: '', description: '', summary: null, body: '' }
	}
	try {
		const fileContent = fs.readFileSync(filePath, 'utf-8')
		const { data: frontmatter, content } = matter(fileContent)
		return {
			title: frontmatter.title || '',
			description: frontmatter.description || '',
			summary: frontmatter.summary || null,
			body: content,
		}
	} catch (error) {
		console.error(chalk.red(`Error reading file ${filePath}:`), error)
		return { title: '', description: '', summary: null, body: '' }
	}
}

async function generateMigrationData(): Promise<MigrationData> {
	const configPath = path.join(AI_SDK_ROOT_PATH, 'course-config.json')

	if (!fs.existsSync(configPath)) {
		throw new Error(`Course config file not found at: ${configPath}`)
	}

	// Parse the course config
	const courseConfig: CourseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

	// 1. Create the Module Resource Data
	const moduleId = generateId('module') // We generate a *new* internal ID for potential insertion
	const moduleOriginalId = courseConfig.id // Use the config 'id' as the stable originalId
	const moduleSlug = createSlug(moduleOriginalId)
	const introPath = path.join(AI_SDK_ROOT_PATH, courseConfig.introduction)
	const {
		title: introTitle,
		description: introDescription,
		body: introBody,
	} = readMdxFile(introPath)

	const moduleData: GeneratedResourceData = {
		originalId: moduleOriginalId,
		dbId: courseConfig.dbId, // Read dbId from config
		resource: {
			id: moduleId, // Temporary ID for now
			type: 'module',
			fields: {
				title: introTitle || createTitle(moduleSlug),
				description: introDescription,
				body: introBody,
				slug: moduleSlug,
				sites: [], // Initialize sites array
				// No longer storing originalId in fields
			},
		},
		children: [],
	}

	// 2. Process Resources Defined in Config Recursively
	function processConfigResources(
		configResources: ResourceConfig[],
		parentData: GeneratedResourceData,
	): void {
		let position = 0
		for (const resourceConfig of configResources) {
			const resourceInternalId = generateId(resourceConfig.type)
			const resourceOriginalId = resourceConfig.id
			const resourceDbId = resourceConfig.dbId
			let resourceData: GeneratedResourceData | null = null

			if (resourceConfig.type === 'section') {
				const sectionSlug = createSlug(resourceConfig.title || resourceOriginalId)
				const sectionTitle = resourceConfig.title || createTitle(sectionSlug)

				console.log('section', {
					sectionSlug,
					sectionTitle,
				})

				resourceData = {
					originalId: resourceOriginalId,
					dbId: resourceDbId,
					resource: {
						id: resourceInternalId,
						type: 'section',
						fields: {
							title: sectionTitle,
							slug: sectionSlug,
							sites: [], // Initialize sites array
						},
					},
					children: [],
				}

				if (resourceConfig.resources) {
					processConfigResources(resourceConfig.resources, resourceData) // Recurse
				}
			} else if (resourceConfig.type === 'lesson' && resourceConfig.path) {
				const lessonPath = path.join(AI_SDK_ROOT_PATH, resourceConfig.path)
				const {
					title: fileTitle,
					description: fileDescription,
					summary: fileSummary,
					body: fileBody,
				} = readMdxFile(lessonPath)
				const lessonSlug = createSlug(fileTitle || resourceOriginalId)
				const finalTitle = fileTitle || resourceConfig.title || createTitle(lessonSlug)

				console.log('lesson', {
					lessonSlug,
					finalTitle,
				})

				resourceData = {
					originalId: resourceOriginalId,
					dbId: resourceDbId,
					resource: {
						id: resourceInternalId,
						type: 'lesson',
						fields: {
							title: finalTitle,
							description: fileDescription,
							summary: fileSummary,
							body: fileBody,
							slug: lessonSlug,
							sites: [], // Initialize sites array
						},
					},
					// Lessons don't have children in this structure
				}
			}

			if (resourceData) {
				// We store position conceptually here; relationships are built later
				if (resourceData.resource.fields) {
					resourceData.resource.fields.position = position++
				}
				parentData.children = parentData.children || []
				parentData.children.push(resourceData)
			}
		}
	}

	processConfigResources(courseConfig.resources, moduleData)

	// Flatten resources and create relationships (will need adjustment later)
	// const resources: ContentResource[] = [];
	// const relationships: ContentResourceResource[] = [];
	// function flattenAndRelate(data: GeneratedResourceData, parentDbId?: string) {
	// 	 resources.push(data.resource);
	// 	 if (parentDbId && data.dbId) { // Need actual DB IDs here
	// 		 relationships.push({
	// 			 resourceOfId: parentDbId,
	// 			 resourceId: data.dbId,
	// 			 position: data.resource.fields.position ?? 0,
	// 		 });
	// 	 }
	// 	 if (data.children) {
	// 		 data.children.forEach(child => flattenAndRelate(child, data.dbId));
	// 	 }
	// }
	// flattenAndRelate(moduleData);

	return { moduleData }
}

// --- Validation function (needs adjustment for new structure) ---
// function validatePositions(relationships: ContentResourceResource[]): {
// ... existing code ...
async function migrateContent(isDryRun = false) {
	console.log(chalk.blue('Starting AI SDK content migration sync...'))
	const siteName = process.env.SITE_NAME // Get current site name

	console.log(chalk.cyan(`[DEBUG] Using SITE_NAME: ${siteName || 'Not Set'}`))

	if (!siteName) {
		console.warn(
			chalk.yellow(
				'WARNING: process.env.SITE_NAME is not set. The "sites" field will not be updated.',
			),
		)
	}

	// Define configPath here
	const configPath = path.join(AI_SDK_ROOT_PATH, 'course-config.json')

	try {
		console.log(chalk.blue('Reading AI SDK course config and content files...'))

		// Read config here as well, needed for writing back later
		if (!fs.existsSync(configPath)) {
			throw new Error(`Course config file not found at: ${configPath}`)
		}
		const courseConfig: CourseConfig = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

		const { moduleData } = await generateMigrationData()

		console.log(
			chalk.blue(
				`Generated data for module: ${moduleData.originalId} (DB ID from config: ${moduleData.dbId || 'N/A'})`,
			),
		)

		// --- Fetch Existing Data by dbId ---
		console.log(chalk.blue('Fetching existing data from database using dbId if available...'))
		const existingDataMap = new Map<
			string,
			{ resource: ContentResource; relationships: ContentResourceResource[] }
		>()

		async function fetchExistingRecursive(
			dbId: string | undefined,
			originalId: string,
		): Promise<string | undefined> {
			if (!dbId) {
				// console.log(chalk.yellow(`No dbId provided for ${originalId}, treating as potentially new.`));
				return undefined
			}
			if (existingDataMap.has(dbId)) return dbId // Already fetched

			const resource = (
				await db.select().from(contentResource).where(eq(contentResource.id, dbId)).limit(1)
			)[0]
			if (!resource) {
				// console.log(chalk.yellow(`Resource with dbId ${dbId} (originalId: ${originalId}) not found in DB. Will be treated as new.`));
				// Remove the dbId from the config if it's invalid? Maybe later.
				return undefined
			}

			const relationships = await db
				.select()
				.from(contentResourceResource)
				.where(eq(contentResourceResource.resourceOfId, dbId))
			existingDataMap.set(dbId, { resource, relationships })
			// console.log(chalk.cyan(`  Fetched existing ${resource.type}: ${title} (DB ID: ${dbId})`));

			// Fetch children recursively
			for (const rel of relationships) {
				// We don't have originalId here, just the child dbId. Fetch based on that.
				await fetchExistingRecursive(rel.resourceId, 'unknown') // Pass 'unknown' as we don't know originalId here
			}
			return dbId
		}

		console.log(chalk.blue('Fetching existing module tree from database...'))
		const rootDbId = await fetchExistingRecursive(moduleData.dbId, moduleData.originalId)
		// Ensure moduleData.dbId reflects the *actual* found ID, or undefined if not found/no ID in config
		moduleData.dbId = rootDbId
		console.log(chalk.blue(`Fetched ${existingDataMap.size} existing resources.`))

		// --- Diffing and Operations Planning ---
		console.log(chalk.blue('Planning database operations (insert/update/delete)...'))
		const ops = {
			toInsert: [] as EnhancedContentResource[],
			toUpdate: [] as { dbId: string; updates: Partial<EnhancedContentResource> }[], // Store dbId and changes
			toDeleteResourceIds: [] as string[],
			parentsToRebuildRelationships: new Set<string>(), // Store parent dbIds needing relationship rebuild
			relationshipsToInsert: [] as ContentResourceResource[],
			configUpdates: {} as Record<string, string>, // Map originalId -> new dbId
		}

		// Map originalIds from generated data for easier lookup during diff
		const generatedResourceMap = new Map<string, GeneratedResourceData>()
		function mapGenerated(node: GeneratedResourceData) {
			generatedResourceMap.set(node.originalId, node)
			if (node.children) {
				node.children.forEach(mapGenerated)
			}
		}
		mapGenerated(moduleData)

		// --- Recursive Diff Function ---
		async function diffAndPlanOperations(
			generatedNode: GeneratedResourceData,
			existingNodeData:
				| { resource: ContentResource; relationships: ContentResourceResource[] }
				| undefined,
			parentGeneratedNode?: GeneratedResourceData, // Needed to update parent's dbId reference if child is inserted
		) {
			let currentDbId = existingNodeData?.resource.id // Use existing ID if available
			const generatedFields = generatedNode.resource.fields

			console.log(
				chalk.gray(
					`[DEBUG] Diffing: ${generatedNode.originalId} (Type: ${generatedNode.resource.type})`,
				),
			)
			console.log(chalk.gray(`  [DEBUG] Generated Fields: ${JSON.stringify(generatedFields)}`))
			console.log(
				chalk.gray(`  [DEBUG] Existing DB ID: ${existingNodeData?.resource.id || 'None'}`),
			)
			console.log(
				chalk.gray(
					`  [DEBUG] Existing Fields: ${JSON.stringify(existingNodeData?.resource.fields)}`,
				),
			)

			// 1. Handle Resource: Insert or Update?
			if (!existingNodeData) {
				// Insert new resource
				// Initialize sites array with current siteName if available
				if (siteName && generatedNode.resource.fields) {
					generatedNode.resource.fields.sites = [siteName]
					console.log(
						chalk.green(
							`  [DEBUG] Initializing sites for new resource ${generatedNode.originalId}: [${siteName}]`,
						),
					)
				}

				ops.toInsert.push(generatedNode.resource)
				ops.configUpdates[generatedNode.originalId] = generatedNode.resource.id // Temporary link
				currentDbId = generatedNode.resource.id // Use temp ID for relationship planning
				generatedNode.dbId = currentDbId // Crucial: Update the node in memory

				// Mark parent for relationship rebuild if this node is new
				if (parentGeneratedNode?.dbId) {
					ops.parentsToRebuildRelationships.add(parentGeneratedNode.dbId)
				}
			} else {
				// Update existing resource? Compare fields.
				const existingFields = existingNodeData.resource.fields as ContentResourceFields | undefined // Cast existing fields
				const updates: Partial<ContentResourceFields> = {} // Use enhanced fields type
				let needsUpdate = false

				// --- Site Name Update Check (FIRST) ---
				const existingSites = Array.isArray(existingFields?.sites) ? existingFields.sites : []
				console.log(chalk.gray(`  [DEBUG] Existing sites: [${existingSites.join(', ')}]`))
				const shouldAddSite = siteName && !existingSites.includes(siteName)
				console.log(chalk.gray(`  [DEBUG] Should add site '${siteName}'? ${shouldAddSite}`))
				if (siteName && !existingSites.includes(siteName)) {
					updates.sites = [...existingSites, siteName]
					needsUpdate = true
					console.log(
						chalk.yellow(
							`  [DEBUG] Planning site update for ${existingNodeData.resource.id}: ${JSON.stringify(updates.sites)}`,
						),
					)
				}

				// --- Compare other relevant fields ---
				if (generatedFields?.title !== existingFields?.title) {
					updates.title = generatedFields?.title
					needsUpdate = true
				}
				if (generatedFields?.slug !== existingFields?.slug) {
					updates.slug = generatedFields?.slug
					needsUpdate = true
				}
				if (generatedFields?.description !== existingFields?.description) {
					updates.description = generatedFields?.description
					needsUpdate = true
				}
				if (generatedFields?.body !== existingFields?.body) {
					updates.body = generatedFields?.body
					needsUpdate = true
				}
				if (JSON.stringify(generatedFields?.summary) !== JSON.stringify(existingFields?.summary)) {
					updates.summary = generatedFields?.summary
					needsUpdate = true
				}
				// NOTE: Position is handled via relationships

				if (needsUpdate) {
					// Use EnhancedContentResource for updates type safety
					console.log(
						chalk.yellow(
							`  [DEBUG] Adding update operation for ${existingNodeData.resource.id}. Updates: ${JSON.stringify({ fields: updates })}`,
						),
					)
					ops.toUpdate.push({ dbId: existingNodeData.resource.id, updates: { fields: updates } })
				}
				// Ensure the generated node has the correct existing dbId
				generatedNode.dbId = existingNodeData.resource.id
				// Always mark existing nodes for relationship rebuild to handle position changes or child additions/deletions
				ops.parentsToRebuildRelationships.add(existingNodeData.resource.id)
			}

			// 2. Handle Children and Relationships
			const generatedChildren = generatedNode.children || []
			const existingChildDbIdMap = new Map<string, string>() // Map child originalId -> child dbId (from existing relationships)
			const existingRelationshipMap = new Map<string, ContentResourceResource>() // Map child dbId -> relationship
			if (existingNodeData) {
				existingNodeData.relationships.forEach((rel) => {
					const childResource = existingDataMap.get(rel.resourceId)?.resource
					// How to get originalId from existing child? Assume it's NOT stored in DB.
					// We MUST rely on matching generated children to existing ones based on config dbId or *maybe* type/slug/title.
					// For now, primarily rely on dbId from config if present.
					existingRelationshipMap.set(rel.resourceId, rel)
				})
			}

			const processedExistingChildDbIds = new Set<string>()
			let position = 0

			for (const generatedChild of generatedChildren) {
				let foundExistingChildData:
					| { resource: ContentResource; relationships: ContentResourceResource[] }
					| undefined = undefined
				let foundExistingRel: ContentResourceResource | undefined = undefined

				// Try to find match based on dbId from config FIRST
				if (generatedChild.dbId && existingRelationshipMap.has(generatedChild.dbId)) {
					foundExistingChildData = existingDataMap.get(generatedChild.dbId)
					foundExistingRel = existingRelationshipMap.get(generatedChild.dbId)
					if (foundExistingChildData) {
						processedExistingChildDbIds.add(generatedChild.dbId)
					}
				}
				// TODO: Add fallback matching based on originalId or other fields if dbId fails?
				// This gets complex if IDs are missing/config changes.

				// Recurse for the child
				await diffAndPlanOperations(generatedChild, foundExistingChildData, generatedNode)

				// Plan relationship insert/update (always recreate relationships for simplicity)
				if (currentDbId && generatedChild.dbId) {
					// Ensure both parent and child have a dbId (could be temp)
					ops.relationshipsToInsert.push({
						resourceOfId: currentDbId,
						resourceId: generatedChild.dbId, // Use the dbId (potentially temporary) assigned in recursion
						position: position++,
					})
				} else {
					console.warn(
						chalk.yellow(
							`Skipping relationship for ${generatedChild.originalId} due to missing parent/child dbId during planning.`,
						),
					)
				}
			}

			// 3. Detect Deletions
			if (existingNodeData) {
				// Mark parent for rebuild if children counts differ or specific children are gone
				if (existingNodeData.relationships.length !== generatedChildren.length) {
					ops.parentsToRebuildRelationships.add(existingNodeData.resource.id)
				}

				// Identify relationships/children that existed but are no longer in the generated set
				existingNodeData.relationships.forEach((rel) => {
					if (!processedExistingChildDbIds.has(rel.resourceId)) {
						console.log(
							chalk.magenta(
								`  Planning deletion for resource ID: ${rel.resourceId} (was child of ${existingNodeData.resource.id})`,
							),
						)
						ops.toDeleteResourceIds.push(rel.resourceId)
						// Mark parent for rebuild as a child is being deleted
						ops.parentsToRebuildRelationships.add(existingNodeData.resource.id)

						// Also need to recursively delete descendants of this deleted node
						const childToDeleteData = existingDataMap.get(rel.resourceId)
						if (childToDeleteData) {
							findDescendantsToDelete(childToDeleteData)
						}
					}
				})
			}
		}

		// Helper to find all descendants of a node marked for deletion
		function findDescendantsToDelete(nodeData: {
			resource: ContentResource
			relationships: ContentResourceResource[]
		}) {
			nodeData.relationships.forEach((rel) => {
				// Don't track relationship IDs for deletion
				// ops.toDeleteRelationshipIds.push(rel.id);
				ops.toDeleteResourceIds.push(rel.resourceId)
				const childData = existingDataMap.get(rel.resourceId)
				if (childData) {
					findDescendantsToDelete(childData)
				}
			})
		}

		// --- Start the Diff ---
		// Pass existing data only if rootDbId was found
		await diffAndPlanOperations(moduleData, rootDbId ? existingDataMap.get(rootDbId) : undefined)

		// --- Clean up Deletions (ensure no duplicates) ---
		ops.toDeleteResourceIds = [...new Set(ops.toDeleteResourceIds)]
		// ops.toDeleteRelationshipIds = [...new Set(ops.toDeleteRelationshipIds)]; // Removed

		// Remove deleted resources from the update list if they somehow got added
		const deleteIdSet = new Set(ops.toDeleteResourceIds)
		ops.toUpdate = ops.toUpdate.filter((upd) => !deleteIdSet.has(upd.dbId))

		if (isDryRun) {
			console.log(chalk.yellow('\n--- DRY RUN ---'))
			console.log(chalk.yellow('Database will not be modified. Config file will not be written.'))
			console.log(chalk.yellow('\nGenerated Module Structure (with potential dbIds from config):'))
			console.log(JSON.stringify(moduleData, null, 2))
			console.log(
				chalk.yellow('\nPlanned Operations (based on current logic - likely incomplete):'),
			)
			console.log(JSON.stringify(ops, null, 2))
			console.log(chalk.yellow('--- END DRY RUN ---'))
		} else {
			console.log(chalk.blue('Executing database operations within a transaction...'))
			let updatedConfig = { ...courseConfig } // Now courseConfig is available

			await db.transaction(async (tx) => {
				const bar = new cliProgress.SingleBar({
					format: 'Sync Progress |{bar}| {percentage}% ',
					hideCursor: true,
				})
				// Estimate total operations for progress bar (approximate)
				const totalOps =
					ops.toDeleteResourceIds.length +
					ops.parentsToRebuildRelationships.size + // Deleting old relationships
					ops.toUpdate.length +
					ops.toInsert.length +
					ops.relationshipsToInsert.length
				bar.start(totalOps || 1, 0)

				// --- 1. Deletions ---
				// Delete Resources first (due to potential FK constraints on relationships)
				if (ops.toDeleteResourceIds.length > 0) {
					console.log(chalk.magenta(`\n  Deleting ${ops.toDeleteResourceIds.length} resources...`))
					await tx
						.delete(contentResource)
						.where(inArray(contentResource.id, ops.toDeleteResourceIds))
					bar.increment(ops.toDeleteResourceIds.length)
				}
				// Delete Relationships (for parents needing rebuild AND for deleted resources)
				const parentIdsForRelDeletion = [...ops.parentsToRebuildRelationships]
				if (parentIdsForRelDeletion.length > 0) {
					console.log(
						chalk.magenta(
							`  Deleting relationships for ${parentIdsForRelDeletion.length} parents...`,
						),
					)
					await tx
						.delete(contentResourceResource)
						.where(inArray(contentResourceResource.resourceOfId, parentIdsForRelDeletion))
					bar.increment(parentIdsForRelDeletion.length)
				}
				// Also delete any lingering relationships pointing TO a deleted resource
				if (ops.toDeleteResourceIds.length > 0) {
					await tx
						.delete(contentResourceResource)
						.where(inArray(contentResourceResource.resourceId, ops.toDeleteResourceIds))
					// Already counted in resource deletion approx
				}

				// --- 2. Updates ---
				if (ops.toUpdate.length > 0) {
					console.log(chalk.yellow(`\n  Updating ${ops.toUpdate.length} resources...`))
					for (const updateOp of ops.toUpdate) {
						// Fetch the current fields *within the transaction* to ensure freshness
						const currentResource = (
							await tx
								.select({ fields: contentResource.fields })
								.from(contentResource)
								.where(eq(contentResource.id, updateOp.dbId))
								.limit(1)
						)[0]

						console.log(chalk.cyan(`[DEBUG] Preparing update for DB ID: ${updateOp.dbId}`))
						console.log(
							chalk.cyan(`  [DEBUG] Planned updates: ${JSON.stringify(updateOp.updates)}`),
						)

						let existingFields: ContentResourceFields = {} // Use enhanced fields type
						if (currentResource?.fields) {
							if (typeof currentResource.fields === 'string') {
								try {
									const parsed = JSON.parse(currentResource.fields)
									// Ensure parsed is an object
									if (parsed && typeof parsed === 'object') {
										existingFields = parsed
									}
								} catch (e) {
									console.warn(
										chalk.red(
											`Failed to parse existing fields JSON for ${updateOp.dbId}: ${currentResource.fields}`,
										),
									)
									// Fallback to empty object if parsing fails or result is not an object
								}
							} else if (
								typeof currentResource.fields === 'object' &&
								currentResource.fields !== null
							) {
								existingFields = currentResource.fields as ContentResourceFields
							}
						}

						// The updates planned were structured as { fields: partialUpdates }
						// Ensure updateOp.updates and updateOp.updates.fields are defined and are objects
						const partialUpdates =
							updateOp.updates &&
							typeof updateOp.updates.fields === 'object' &&
							updateOp.updates.fields !== null
								? (updateOp.updates.fields as Partial<ContentResourceFields>) // Cast partial updates
								: {}

						// Merge existing fields with the partial updates
						const newFields = { ...existingFields, ...partialUpdates }

						console.log(
							chalk.cyan(`  [DEBUG] Merged fields for update: ${JSON.stringify(newFields)}`),
						)

						await tx
							.update(contentResource)
							.set({ fields: newFields, updatedAt: new Date() }) // Update timestamp
							.where(eq(contentResource.id, updateOp.dbId))
						bar.increment()
					}
				}

				// --- 3. Inserts ---
				const newlyInsertedIdMap = new Map<string, string>() // Map temporary insert ID -> actual DB ID
				if (ops.toInsert.length > 0) {
					console.log(chalk.green(`\n  Inserting ${ops.toInsert.length} new resources...`))
					// Drizzle's batch insert doesn't easily return mapped IDs, insert one by one
					for (const resourceToInsert of ops.toInsert) {
						const tempId = resourceToInsert.id // Grab the temporary ID
						const [insertedResource] = await tx
							.insert(contentResource)
							.values({
								...resourceToInsert,
								createdAt: new Date(),
								updatedAt: new Date(),
							}) // Add timestamps
							.returning({ id: contentResource.id }) // Get the actual ID back

						if (insertedResource && insertedResource.id && tempId) {
							newlyInsertedIdMap.set(tempId, insertedResource.id)
							// Find originalId associated with tempId and update configUpdates map
							for (const [originalId, temp] of Object.entries(ops.configUpdates)) {
								if (temp === tempId) {
									ops.configUpdates[originalId] = insertedResource.id // Update with REAL ID
									break
								}
							}
						} else {
							console.warn(
								chalk.red(
									`  Failed to get DB ID back for inserted resource with temp ID: ${tempId}`,
								),
							)
						}
						bar.increment()
					}
				}

				// --- 4. Insert Relationships ---
				const finalRelationshipsToInsert: ContentResourceResource[] = []
				if (ops.relationshipsToInsert.length > 0) {
					console.log(
						chalk.blue(`\n  Inserting ${ops.relationshipsToInsert.length} relationships...`),
					)
					for (const rel of ops.relationshipsToInsert) {
						const parentDbId = newlyInsertedIdMap.get(rel.resourceOfId) || rel.resourceOfId
						const childDbId = newlyInsertedIdMap.get(rel.resourceId) || rel.resourceId
						if (parentDbId && childDbId) {
							finalRelationshipsToInsert.push({
								resourceOfId: parentDbId,
								resourceId: childDbId,
								position: rel.position,
							})
						} else {
							console.warn(
								chalk.red(
									`  Skipping relationship insert due to missing final DB ID for parent (${rel.resourceOfId}) or child (${rel.resourceId})`,
								),
							)
						}
					}
					if (finalRelationshipsToInsert.length > 0) {
						await tx.insert(contentResourceResource).values(finalRelationshipsToInsert)
						bar.increment(finalRelationshipsToInsert.length)
					}
				}

				bar.update(totalOps) // Ensure bar finishes
				bar.stop()
			})

			console.log(chalk.green('\n✓ Database sync complete.'))

			// --- Update and Write Config File ---
			console.log(chalk.blue('Updating config object with new database IDs...'))

			// Helper function to recursively update dbIds in the config object
			function updateConfigDbIds(
				resources: ResourceConfig[] | undefined,
				idMap: Record<string, string>,
			) {
				if (!resources) return
				for (const resource of resources) {
					const newDbId = idMap[resource.id] // Use original config ID (like '01-fundamentals') as the key
					if (newDbId) {
						resource.dbId = newDbId
					}
					if (resource.resources) {
						updateConfigDbIds(resource.resources, idMap)
					}
				}
			}

			// Update the root module dbId if it was inserted
			const rootOriginalId = moduleData.originalId // Use the module's originalId
			if (ops.configUpdates[rootOriginalId]) {
				updatedConfig.dbId = ops.configUpdates[rootOriginalId]
			}
			// Update children recursively
			updateConfigDbIds(updatedConfig.resources, ops.configUpdates)

			console.log(chalk.blue(`Writing updated configuration to ${configPath}...`))
			try {
				fs.writeFileSync(configPath, JSON.stringify(updatedConfig, null, 2), 'utf-8')
				console.log(chalk.green('✓ Config file updated successfully.'))
			} catch (writeError) {
				console.error(chalk.red('Error writing updated config file:'), writeError)
				console.warn(
					chalk.yellow(
						'Database changes were successful, but config file was not updated with new IDs.',
					),
				)
			}
		}

		console.log(chalk.green('✓ AI SDK Migration Sync finished.'))
	} catch (error) {
		console.error(chalk.red('\nMigration failed:'))
		console.error(chalk.red(error instanceof Error ? error.message : String(error)))
		if (error instanceof Error && error.stack) {
			console.error(chalk.grey(error.stack))
		}
		throw error // Re-throw the error
	}
}

let isConnectionClosed = false // Re-introduce flag

async function main() {
	// Define configPath here
	const configPath = path.join(AI_SDK_ROOT_PATH, 'course-config.json')
	try {
		console.log(chalk.blue('Reading AI SDK course config and content files...'))
		const isDryRun = process.env.DRY_RUN === 'true'
		if (isDryRun) {
			console.log(chalk.yellow('DRY_RUN environment variable is set. Performing dry run...'))
		}
		await migrateContent(isDryRun)
	} catch (error) {
		console.error(chalk.red('Unexpected error in main:'))
		console.error(chalk.red(error instanceof Error ? error.message : String(error)))
		if (error instanceof Error && error.stack) {
			console.error(chalk.grey(error.stack))
		}
		throw error // Re-throw the error
	}
	// No finally block in main needed
}

// Updated main execution to handle errors and exit code
main()
	.then(() => {
		if (process.exitCode !== 1) {
			// Check if an error occurred in main's try block
			console.log(chalk.green('\nMigration script completed successfully.'))
		}
	})
	.catch((error) => {
		// Catch errors thrown from migrateContent or other async operations within main
		console.error(chalk.red('\n--- Migration script failed --- '))
		// Error is already logged in the migrateContent catch block or main catch block
		process.exitCode = 1 // Set exit code to indicate failure
	})
	.finally(async () => {
		// Re-introduce finally block
		// Ensure connection is attempted to close *after* main finishes/errors
		if (!isConnectionClosed) {
			isConnectionClosed = true
			try {
				console.log(chalk.blue('Attempting final database connection close...'))
				await db.$client.end()
				console.log(chalk.blue('Database connection closed.'))
			} catch (endError) {
				// Log potentially benign errors, like closing an already closed pool
				console.warn(
					chalk.yellow('Ignoring error during final connection close (possibly benign):'),
					endError instanceof Error ? endError.message : String(endError),
				)
			}
		}
		// Exit with the appropriate code
		process.exit(process.exitCode === 1 ? 1 : 0)
	})
