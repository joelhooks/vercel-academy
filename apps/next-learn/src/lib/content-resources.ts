import db from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { ContentResourceSchema, getLocalizedField } from '@/lib/schemas/content-resource'
import type { ContentResource } from '@/lib/schemas/content-resource'
import { ZodError } from 'zod'

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

// Re-export getLocalizedField for convenience
export { getLocalizedField }
