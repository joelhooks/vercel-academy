import { z } from 'zod'

/**
 * Zod schema for resource progress
 */
export const ResourceProgressSchema = z.object({
	id: z.number().optional(),
	userId: z.string(),
	resourceId: z.string(),
	isComplete: z.boolean().default(false),
	progressPercent: z.number().min(0).max(100).default(0),
	updatedAt: z.date().optional(),
})

/**
 * Type definition derived from Zod schema
 */
export type ResourceProgress = z.infer<typeof ResourceProgressSchema>

/**
 * Function to calculate completion status based on progress percentage
 */
export function isResourceComplete(progress: ResourceProgress | null): boolean {
	if (!progress) return false
	return progress.isComplete || progress.progressPercent >= 100
}

/**
 * Function to format progress percentage for display
 */
export function formatProgressPercentage(progress: ResourceProgress | null): string {
	if (!progress) return '0%'
	return `${Math.round(progress.progressPercent)}%`
}

/**
 * Function to determine if a resource has been started
 */
export function hasStartedResource(progress: ResourceProgress | null): boolean {
	if (!progress) return false
	return progress.progressPercent > 0
}
