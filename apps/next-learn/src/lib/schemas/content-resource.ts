import { z } from 'zod'

/**
 * Zod schema for content resource fields
 */
export const ContentFieldsSchema = z.record(z.unknown())

/**
 * Zod schema for content resources
 */
export const ContentResourceSchema = z.object({
	id: z.string(),
	type: z.enum(['module', 'section', 'lesson']),
	fields: ContentFieldsSchema.optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	deletedAt: z.date().nullish(),
})

/**
 * Zod schema for content resource relationships
 */
export const ContentResourceRelationshipSchema = z.object({
	resourceOfId: z.string(),
	resourceId: z.string(),
	position: z.number(),
	metadata: z.record(z.unknown()).optional(),
	createdAt: z.date().optional(),
	updatedAt: z.date().optional(),
	deletedAt: z.date().nullish(),
})

/**
 * Type definitions derived from Zod schemas
 */
export type ContentResource = z.infer<typeof ContentResourceSchema>
export type ContentResourceRelationship = z.infer<typeof ContentResourceRelationshipSchema>

/**
 * Helper function for retrieving localized content from a resource's fields
 * The fields object can store localized data in two formats:
 * 1. Direct fields with locale suffix: { title_en: "English Title", title_fr: "French Title" }
 * 2. Nested locale objects: { title: { en: "English Title", fr: "French Title" } }
 * This function handles both formats and falls back gracefully.
 */
export function getLocalizedField<T>(
	resource: { fields?: Record<string, unknown> },
	fieldName: string,
	locale = 'en',
	fallback?: T,
): T | undefined {
	if (!resource.fields) return fallback

	const field = resource.fields[fieldName]

	// Case 1: Check for direct field with locale suffix (e.g., title_en)
	const localizedKey = `${fieldName}_${locale}`
	if (localizedKey in resource.fields) {
		return resource.fields[localizedKey] as T
	}

	// Case 2: Check if the field is a nested object with locale keys
	if (field && typeof field === 'object' && field !== null) {
		const localizedField = field as Record<string, unknown>
		if (locale in localizedField) {
			return localizedField[locale] as T
		}
		// Try English as fallback for nested objects
		if ('en' in localizedField) {
			return localizedField.en as T
		}
	}

	// Case 3: Return the non-localized field if it exists
	if (field) {
		return field as T
	}

	// Return the provided fallback
	return fallback
}
