import db from '@/db'
import { contentResource, contentResourceResource } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

/**
 * Fetches content modules (type: 'module')
 */
export const getModules = async () => {
	try {
		const result = await db
			.select()
			.from(contentResource)
			.where(eq(contentResource.type, 'module'))
			.orderBy(contentResource.createdAt)
			.limit(100)

		return result
	} catch (error) {
		console.error('Error fetching modules:', error)
		return []
	}
}

/**
 * Fetches sections within a specific module
 */
export const getSectionsByModuleId = async (moduleId: string) => {
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

		return result.map((r) => r.section)
	} catch (error) {
		console.error(`Error fetching sections for module "${moduleId}":`, error)
		return []
	}
}

/**
 * Fetches lessons within a specific section
 */
export const getLessonsBySectionId = async (sectionId: string) => {
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

		return result.map((r) => r.lesson)
	} catch (error) {
		console.error(`Error fetching lessons for section "${sectionId}":`, error)
		return []
	}
}

/**
 * Fetches a single content resource by ID
 */
export const getContentResourceById = async (resourceId: string) => {
	try {
		const result = await db
			.select()
			.from(contentResource)
			.where(eq(contentResource.id, resourceId))
			.limit(1)

		return result[0] || null
	} catch (error) {
		console.error(`Error fetching resource "${resourceId}":`, error)
		return null
	}
}

/**
 * Helper function to get localized content from a resource's fields
 */
export const getLocalizedField = <T>(
	resource: { fields: Record<string, unknown> },
	fieldName: string,
	locale = 'en',
	fallback?: T,
): T | undefined => {
	const field = resource.fields[fieldName]

	if (!field) return fallback

	// If the field is a localized object with locale keys
	if (typeof field === 'object' && field !== null) {
		const localizedValue =
			(field as Record<string, unknown>)[locale] || (field as Record<string, unknown>).en

		return (localizedValue as T) || fallback
	}

	// Return the field directly if it's not localized
	return field as T
}
