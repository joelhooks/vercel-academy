import db from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { eq, and } from 'drizzle-orm'
import { ContentResourceSchema, getLocalizedField } from './schemas/content-resource'
import type { ContentResource } from './schemas/content-resource'

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

		// Validate results with Zod
		return result.map((resource) => ContentResourceSchema.parse(resource))
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

		// Validate results with Zod
		return result.map((r) => ContentResourceSchema.parse(r.section))
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

		// Validate results with Zod
		return result.map((r) => ContentResourceSchema.parse(r.lesson))
	} catch (error) {
		console.error(`Error fetching lessons for section "${sectionId}":`, error)
		return []
	}
}

/**
 * Fetches a single content resource by ID
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
		return ContentResourceSchema.parse(result[0])
	} catch (error) {
		console.error(`Error fetching resource "${resourceId}":`, error)
		return null
	}
}

// Re-export getLocalizedField for convenience
export { getLocalizedField }
