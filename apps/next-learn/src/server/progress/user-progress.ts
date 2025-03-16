'use server'

import db from '@/db'
import { resourceProgress } from '@/db/schema'
import { and, eq } from 'drizzle-orm'
import {
	ResourceProgressSchema,
	formatProgressPercentage,
	hasStartedResource,
} from '@/schemas/progress'

// Define types for module progress
interface CompletedLesson {
	resourceId: string
	completedAt: Date
	userId: string
}

export interface ModuleProgress {
	completedLessons: CompletedLesson[]
	nextResource: string | null
	percentCompleted: number
	completedLessonsCount: number
	totalLessonsCount: number
}

// Local interface for progress tracking
interface ProgressRecord {
	id: string
	userId: string
	resourceId: string
	completedAt: Date
}

// Dummy progress data for demonstration
const progressStore: ProgressRecord[] = []

/**
 * Get progress for a specific user and resource
 */
export async function getProgressForUserAndResource(
	userId: string,
	resourceId: string,
): Promise<ProgressRecord | null> {
	// In a real implementation, this would query a database
	const progress = progressStore.find((p) => p.userId === userId && p.resourceId === resourceId)
	return progress || null
}

/**
 * Check if a resource is completed by the user
 */
export async function checkResourceComplete(progress: ProgressRecord | null): Promise<boolean> {
	return !!progress
}

/**
 * Get all progress for a module and calculate stats
 */
export async function getProgressForModule(
	userId: string,
	moduleId: string,
): Promise<ModuleProgress> {
	// In a real implementation, this would query a database for all lessons in module
	// and check completion status

	// For demonstration purposes, we'll return a dummy object
	const completedLessons = progressStore
		.filter((p) => p.userId === userId && p.resourceId.startsWith(moduleId))
		.map((p) => ({
			resourceId: p.resourceId,
			completedAt: p.completedAt,
			userId: p.userId,
		}))

	// In a real implementation, you would count the total number of lessons in the module
	const totalLessonsCount = 10 // Example value
	const completedLessonsCount = completedLessons.length
	const percentCompleted =
		totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0

	return {
		completedLessons,
		nextResource: null, // This would be determined from module structure
		percentCompleted,
		completedLessonsCount,
		totalLessonsCount,
	}
}

/**
 * Mark a resource as complete for a user
 */
export async function markResourceComplete(userId: string, resourceId: string): Promise<void> {
	// Check if already completed
	const existingProgress = await getProgressForUserAndResource(userId, resourceId)
	if (existingProgress) {
		return // Already marked as complete
	}

	// In a real implementation, this would write to a database
	const newProgress: ProgressRecord = {
		id: `${userId}-${resourceId}`,
		userId,
		resourceId,
		completedAt: new Date(),
	}

	progressStore.push(newProgress)
}

/**
 * Remove completion status for a resource
 */
export async function markResourceIncomplete(userId: string, resourceId: string): Promise<void> {
	// In a real implementation, this would delete from a database
	const progressIndex = progressStore.findIndex(
		(p) => p.userId === userId && p.resourceId === resourceId,
	)

	if (progressIndex !== -1) {
		progressStore.splice(progressIndex, 1)
	}
}

/**
 * Retrieves all progress records for a specific user
 */
export async function getAllProgressForUser(userId: string): Promise<any[]> {
	try {
		const result = await db
			.select()
			.from(resourceProgress)
			.where(eq(resourceProgress.userId, userId))

		// Validate with Zod
		return result.map((progress) => ResourceProgressSchema.parse(progress))
	} catch (error) {
		console.error(`Error fetching all progress for user "${userId}":`, error)
		return []
	}
}

/**
 * Updates progress percentage for a user on a specific resource
 */
export async function updateResourceProgress(
	userId: string,
	resourceId: string,
	progressPercent: number,
): Promise<boolean> {
	try {
		const isComplete = progressPercent >= 100
		const existingProgress = await getProgressForUserAndResource(userId, resourceId)

		if (existingProgress) {
			// Update existing progress record
			await db
				.update(resourceProgress)
				.set({
					isComplete,
					progressPercent,
					updatedAt: new Date(),
				})
				.where(
					and(eq(resourceProgress.userId, userId), eq(resourceProgress.resourceId, resourceId)),
				)
		} else {
			// Create new progress record in the database
			await db.insert(resourceProgress).values({
				userId,
				resourceId,
				isComplete,
				progressPercent,
				updatedAt: new Date(),
			})

			// And also add to our in-memory store for demo purposes
			progressStore.push({
				id: `${userId}-${resourceId}`,
				userId,
				resourceId,
				completedAt: new Date(),
			})
		}

		return true
	} catch (error) {
		console.error(
			`Error updating progress for user "${userId}" on resource "${resourceId}":`,
			error,
		)
		return false
	}
}

// Re-export helper functions for convenience
export { formatProgressPercentage, hasStartedResource }
