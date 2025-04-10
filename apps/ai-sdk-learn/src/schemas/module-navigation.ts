import { z } from 'zod'

export const navigationLessonSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	position: z.number(),
	type: z.literal('lesson'),
})

export type NavigationLesson = z.infer<typeof navigationLessonSchema>

export const navigationSectionSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	position: z.number(),
	type: z.literal('section'),
	lessons: z.array(navigationLessonSchema),
})

export type NavigationSection = z.infer<typeof navigationSectionSchema>

export const navigationResourceSchema = z.discriminatedUnion('type', [
	navigationSectionSchema,
	navigationLessonSchema,
])

export type NavigationResource = z.infer<typeof navigationResourceSchema>

export const moduleNavigationSchema = z.object({
	id: z.string(),
	slug: z.string(),
	title: z.string(),
	coverImage: z.string().nullable().optional(),
	resources: z.array(navigationResourceSchema),
	introduction: z
		.object({
			title: z.string(),
			description: z.string(),
		})
		.optional(),
})

export type ModuleNavigation = z.infer<typeof moduleNavigationSchema>
