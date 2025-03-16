import { z } from 'zod'
import { getLocalizedContent } from '@/utils/localization'

/**
 * Zod schema for content resource fields
 * Extends the open-ended record with some common known fields
 * Made more flexible to handle nullish values
 */
export const ContentFieldsSchema = z.record(z.unknown()).and(
	z.object({
		slug: z.string().nullish().optional(),
		title: z.union([z.string(), z.record(z.string()), z.null()]).optional(),
		description: z.union([z.string(), z.record(z.string()), z.null()]).optional(),
		content: z.union([z.string(), z.record(z.string()), z.null()]).optional(),
	}),
)

/**
 * Zod schema for content resources
 */
export const ContentResourceSchema = z.object({
	id: z.string(),
	type: z.enum(['module', 'section', 'lesson']),
	fields: ContentFieldsSchema.nullish().optional(),
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
