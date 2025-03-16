'use server'

import db from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { ContentResourceSchema } from '@/schemas/content'
import type { ContentResource } from '@/schemas/content'
import { ZodError } from 'zod'
import { cache } from 'react'

// Define a type for the raw resource data
type RawResourceData = {
	id: string
	type: string
	fields?: Record<string, unknown>
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date | null
}

/**
 * Helper function to safely parse content resources with Zod
 * Falls back to a more lenient approach if strict validation fails
 */
function safelyParseResource(resource: unknown): ContentResource | null {
	try {
		// First try strict validation
		return ContentResourceSchema.parse(resource)
	} catch (error) {
		if (error instanceof ZodError) {
			console.warn('Zod validation error, attempting lenient parsing:', error.message)

			// If the validation error is due to a specific field, try to create a clean object
			// This is a simplified approach - in a production system you might want to be more careful
			if (typeof resource === 'object' && resource !== null) {
				try {
					const {
						id,
						type,
						fields = {},
						createdAt,
						updatedAt,
						deletedAt,
					} = resource as RawResourceData

					// Create a sanitized version with minimal validation
					return {
						id: id ?? 'unknown-id',
						type: type as 'module' | 'section' | 'lesson',
						fields: fields ?? {},
						createdAt,
						updatedAt,
						deletedAt,
					}
				} catch (fallbackError) {
					console.error('Failed even with lenient parsing:', fallbackError)
					return null
				}
			}
		}
		console.error('Failed to parse resource:', error)
		return null
	}
}

/**
 * Fetches content modules (type: 'module')
 */
export async function getModules(): Promise<ContentResource[]> {
	try {
		const result = await db
			.select()
			.from(contentResource)
			.where(eq(contentResource.type, 'module'))
			.orderBy(contentResource.createdAt)
			.limit(100)

		// Validate results with Zod, filtering out any that fail parsing
		return result
			.map((resource) => safelyParseResource(resource))
			.filter((resource): resource is ContentResource => resource !== null)
	} catch (error) {
		console.error('Error fetching modules:', error)
		return []
	}
}

/**
 * Fetches sections within a specific module using the relationship table
 */
export async function getSectionsByModuleId(moduleId: string): Promise<ContentResource[]> {
	try {
		const result = await db
			.select({
				section: contentResource,
			})
			.from(contentResource)
			.innerJoin(
				contentResourceResource,
				and(
					eq(contentResourceResource.resourceId, contentResource.id),
					eq(contentResourceResource.resourceOfId, moduleId),
				),
			)
			.where(eq(contentResource.type, 'section'))
			.orderBy(contentResourceResource.position)

		// Validate results with Zod, filtering out any that fail parsing
		return result
			.map((r) => safelyParseResource(r.section))
			.filter((resource): resource is ContentResource => resource !== null)
	} catch (error) {
		console.error(`Error fetching sections for module "${moduleId}":`, error)
		return []
	}
}

/**
 * Fetches lessons within a specific section using the relationship table
 */
export async function getLessonsBySectionId(sectionId: string): Promise<ContentResource[]> {
	try {
		const result = await db
			.select({
				lesson: contentResource,
			})
			.from(contentResource)
			.innerJoin(
				contentResourceResource,
				and(
					eq(contentResourceResource.resourceId, contentResource.id),
					eq(contentResourceResource.resourceOfId, sectionId),
				),
			)
			.where(eq(contentResource.type, 'lesson'))
			.orderBy(contentResourceResource.position)

		// Validate results with Zod, filtering out any that fail parsing
		return result
			.map((r) => safelyParseResource(r.lesson))
			.filter((resource): resource is ContentResource => resource !== null)
	} catch (error) {
		console.error(`Error fetching lessons for section "${sectionId}":`, error)
		return []
	}
}

/**
 * Fetches all lessons that belong to sections within a specific module
 * Returns lessons with their associated section information
 */
export async function getLessonsByModuleId(
	moduleId: string,
): Promise<
	Array<ContentResource & { sectionId: string; sectionTitle: string; sectionPosition: number }>
> {
	try {
		// First get all sections belonging to this module
		const sections = await getSectionsByModuleId(moduleId)

		if (!sections.length) {
			console.log(`[getLessonsByModuleId] No sections found for module "${moduleId}"`)
			return []
		}

		// Create a map to store section ID to section data for quick lookup
		const sectionMap = new Map(
			sections.map((section) => {
				// Get the section from relationships data to access position
				return [
					section.id,
					{
						id: section.id,
						title: section.fields?.title || 'Untitled Section',
						// Default position to 0 if not found
						position: 0,
					},
				]
			}),
		)

		// Get all section IDs
		const sectionIds = sections.map((section) => section.id)

		// Query to get all lessons from these sections along with their relationships
		const result = await db
			.select({
				lesson: contentResource,
				relationship: contentResourceResource,
				sectionId: contentResourceResource.resourceOfId,
			})
			.from(contentResource)
			.innerJoin(
				contentResourceResource,
				and(
					eq(contentResourceResource.resourceId, contentResource.id),
					// Use IN clause for multiple section IDs
					sql`${contentResourceResource.resourceOfId} IN (${sectionIds.join(',')})`,
				),
			)
			.where(eq(contentResource.type, 'lesson'))
			.orderBy(contentResourceResource.position)

		// Process and return the results with section information attached
		return result
			.map((r) => {
				const lesson = safelyParseResource(r.lesson)
				if (!lesson) return null

				const sectionId = r.sectionId
				const sectionInfo = sectionMap.get(sectionId)

				return {
					...lesson,
					sectionId,
					sectionTitle: sectionInfo?.title || 'Unknown Section',
					sectionPosition: sectionInfo?.position || 0,
				}
			})
			.filter(
				(
					result,
				): result is ContentResource & {
					sectionId: string
					sectionTitle: string
					sectionPosition: number
				} => result !== null,
			)
	} catch (error) {
		console.error(`[getLessonsByModuleId] Error fetching lessons for module "${moduleId}":`, error)
		return []
	}
}

/**
 * Fetches a single content resource by ID
 * Use this for internal references; for user-facing URLs prefer getContentResourceBySlug
 */
export async function getContentResourceById(resourceId: string): Promise<ContentResource | null> {
	try {
		const result = await db
			.select()
			.from(contentResource)
			.where(eq(contentResource.id, resourceId))
			.limit(1)

		if (!result[0]) return null

		// Validate result with Zod
		return safelyParseResource(result[0])
	} catch (error) {
		console.error(`Error fetching resource "${resourceId}":`, error)
		return null
	}
}

/**
 * Fetches a single content resource by slug from the fields.slug property
 * Use this for URL paths and user-facing identifiers
 */
export async function getContentResourceBySlug(slug: string): Promise<ContentResource | null> {
	try {
		// Simple string without interpolation
		console.log('[getContentResourceBySlug] Searching for resource with slug:', slug)

		// First try: direct match on fields->>'slug'
		console.log('[getContentResourceBySlug] Executing query with fields->>"slug"')
		let result = await db
			.select()
			.from(contentResource)
			.where(sql`fields->>'slug' = ${slug}`)
			.limit(1)

		console.log('[getContentResourceBySlug] First query result count:', result.length)

		// If no results, try with a more flexible approach
		if (result.length === 0) {
			console.log('[getContentResourceBySlug] No exact match found, trying case-insensitive search')
			// Try with LOWER function for case-insensitive matching
			result = await db
				.select()
				.from(contentResource)
				.where(sql`LOWER(fields->>'slug') = LOWER(${slug})`)
				.limit(1)

			console.log('[getContentResourceBySlug] Case-insensitive search result count:', result.length)
		}

		// If still no results, do a fallback search by ID
		if (result.length === 0) {
			console.log('[getContentResourceBySlug] No slug match found, trying as ID')
			result = await db.select().from(contentResource).where(eq(contentResource.id, slug)).limit(1)
			console.log('[getContentResourceBySlug] ID search result count:', result.length)
		}

		if (!result[0]) {
			console.log('[getContentResourceBySlug] No resource found with slug or ID:', slug)

			// Last resort: get all content resources to see what's available
			const allResources = await db
				.select({
					id: contentResource.id,
					type: contentResource.type,
					fields: contentResource.fields,
				})
				.from(contentResource)
				.limit(20)

			console.log(
				'[getContentResourceBySlug] Available resources:',
				allResources.map((r) => ({
					id: r.id,
					type: r.type,
					slug: r.fields?.slug || 'NO_SLUG',
					title: r.fields?.title || 'NO_TITLE',
				})),
			)

			return null
		}

		console.log('[getContentResourceBySlug] Found resource:', {
			id: result[0].id,
			type: result[0].type,
			fields: result[0].fields,
		})

		// Validate result with Zod but use the safer parsing method
		return safelyParseResource(result[0])
	} catch (error) {
		console.error('[getContentResourceBySlug] Error fetching resource with slug:', slug, error)
		return null
	}
}

/**
 * Gets the complete navigation data for a module, including both:
 * 1. Standalone lessons directly attached to the module
 * 2. Sections with their nested lessons
 *
 * All resources are properly ordered by their position values.
 */
export const getModuleNavigationData = cache(async (moduleSlugOrId: string) => {
	// Fetch the module
	const module = await getContentResourceBySlug(moduleSlugOrId)

	if (!module || module.type !== 'module') {
		throw new Error(`Module not found: ${moduleSlugOrId}`)
	}

	// 1. Get all sections that belong to this module
	const sections = await getSectionsByModuleId(module.id)

	// 2. Get all lessons directly attached to the module (standalone lessons)
	const standaloneModuleLessonsResult = await db.execute(sql`
		SELECT
			cr.id,
			cr.type,
			cr.fields,
			crr.position
		FROM ${contentResource} AS cr
		JOIN ${contentResourceResource} AS crr 
			ON cr.id = crr.resource_id
		WHERE 
			cr.type = 'lesson'
			AND crr.resource_of_id = ${module.id}
			AND NOT EXISTS (
				SELECT 1 FROM ${contentResourceResource} AS section_rel
				JOIN ${contentResource} AS section 
					ON section_rel.resource_id = section.id AND section.type = 'section'
				JOIN ${contentResourceResource} AS lesson_section_rel 
					ON lesson_section_rel.resource_of_id = section.id
				WHERE 
					section_rel.resource_of_id = ${module.id}
					AND lesson_section_rel.resource_id = cr.id
			)
	`)

	// 3. Get all sections with their position and lessons
	const sectionsWithLessonsResult = await db.execute(sql`
		SELECT
			section.id AS section_id,
			section.fields AS section_fields,
			section_rel.position AS section_position,
			lesson.id AS lesson_id,
			lesson.fields AS lesson_fields,
			lesson_rel.position AS lesson_position
		FROM ${contentResource} AS section
		JOIN ${contentResourceResource} AS section_rel 
			ON section.id = section_rel.resource_id
		LEFT JOIN ${contentResourceResource} AS lesson_rel 
			ON section.id = lesson_rel.resource_of_id
		LEFT JOIN ${contentResource} AS lesson 
			ON lesson.id = lesson_rel.resource_id AND lesson.type = 'lesson'
		WHERE 
			section.type = 'section'
			AND section_rel.resource_of_id = ${module.id}
		ORDER BY 
			section_rel.position,
			lesson_rel.position
	`)

	// Process standalone lessons
	const standaloneModuleLessons = standaloneModuleLessonsResult.rows.map((row) => {
		const fields = typeof row.fields === 'string' ? JSON.parse(row.fields) : row.fields
		return {
			id: row.id,
			slug: fields?.slug || '',
			title: fields?.title || '',
			position: row.position || 0,
			type: 'lesson' as const,
		}
	})

	// Process sections and their lessons
	const sectionsMap = new Map()

	sectionsWithLessonsResult.rows.forEach((row) => {
		const sectionId = row.section_id
		const sectionFields =
			typeof row.section_fields === 'string' ? JSON.parse(row.section_fields) : row.section_fields

		// Add section to map if it doesn't exist
		if (!sectionsMap.has(sectionId)) {
			sectionsMap.set(sectionId, {
				id: sectionId,
				slug: sectionFields?.slug || '',
				title: sectionFields?.title || '',
				position: row.section_position || 0,
				type: 'section' as const,
				lessons: [],
			})
		}

		// Add lesson to section if it exists
		if (row.lesson_id) {
			const lessonFields =
				typeof row.lesson_fields === 'string' ? JSON.parse(row.lesson_fields) : row.lesson_fields

			const section = sectionsMap.get(sectionId)
			section.lessons.push({
				id: row.lesson_id,
				slug: lessonFields?.slug || '',
				title: lessonFields?.title || '',
				position: row.lesson_position || 0,
				type: 'lesson' as const,
			})
		}
	})

	// Sort lessons within each section
	sectionsMap.forEach((section) => {
		section.lessons.sort((a: any, b: any) => a.position - b.position)
	})

	// Combine all resources and sort by position
	const navigationSections = Array.from(sectionsMap.values())
	const allResources = [...standaloneModuleLessons, ...navigationSections].sort(
		(a: any, b: any) => a.position - b.position,
	)

	return {
		id: module.id,
		slug: (module.fields?.slug as string) || '',
		title: module.fields?.title || '',
		coverImage: module.fields?.coverImage || null,
		resources: allResources,
	}
})
