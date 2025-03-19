'use server'

import db from '@/db'
import { contentResource, resourceProgress } from '@/db/schema'
import { and, eq, inArray, sql } from 'drizzle-orm'
import {
	ResourceProgressSchema,
	formatProgressPercentage,
	hasStartedResource,
} from '@/schemas/progress'
import { z } from 'zod'
import { getLessonsByModuleId } from '../content/resources'

import 'server-only'

// Define the type for the result of ResourceProgressSchema.parse
type ResourceProgress = z.infer<typeof ResourceProgressSchema>

// Define types for module progress
interface CompletedLesson {
	resourceId: string
	isComplete: boolean | null
	userId: string | null
}

export interface ModuleProgress {
	completedLessons: CompletedLesson[]
	nextResource: string | null
	percentCompleted: number
	completedLessonsCount: number
	totalLessonsCount: number
	userId: string | null
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
	const lessons = await getLessonsByModuleId(moduleId)

	const resourceProgressForLessons = await db.query.resourceProgress.findMany({
		where: and(
			eq(resourceProgress.userId, userId),
			inArray(
				resourceProgress.resourceId,
				lessons.map((lesson) => lesson.id),
			),
		),
	})

	const completedLessons = resourceProgressForLessons.filter((progress) => progress.isComplete)
	const completedLessonIds = new Set(completedLessons.map((lesson) => lesson.resourceId))

	const totalLessonsCount = lessons.length
	const completedLessonsCount = completedLessons.length
	const percentCompleted =
		totalLessonsCount > 0 ? Math.round((completedLessonsCount / totalLessonsCount) * 100) : 0

	// Find the next resource
	let nextResource: string | null = null

	// Find the last completed lesson's index
	const lastCompletedLessonIndex = lessons.reduce((lastIndex, lesson, currentIndex) => {
		return completedLessonIds.has(lesson.id) ? currentIndex : lastIndex
	}, -1)

	if (lastCompletedLessonIndex < lessons.length - 1) {
		// If not at the end, return next lesson in sequence
		const nextLesson = lessons[lastCompletedLessonIndex + 1]
		nextResource = nextLesson ? nextLesson.id : null
	} else if (lastCompletedLessonIndex === lessons.length - 1) {
		// At the end, look for first uncompleted lesson
		const firstUncompletedLesson = lessons.find((lesson) => !completedLessonIds.has(lesson.id))
		nextResource = firstUncompletedLesson?.id || null
	}

	if (nextResource) {
		const result = await db.execute(
			sql`SELECT ${contentResource.fields}->>'slug' as slug FROM ${contentResource} WHERE id = ${nextResource}`,
		)

		nextResource = (result.rows[0]?.slug as string) ?? nextResource
	}

	return {
		completedLessons,
		nextResource,
		percentCompleted,
		completedLessonsCount,
		totalLessonsCount,
		userId,
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
export async function getAllProgressForUser(userId: string): Promise<ResourceProgress[]> {
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

export async function addProgressToResource({
	userId,
	resourceId,
}: {
	userId: string
	resourceId: string
}): Promise<void> {
	await db.insert(resourceProgress).values({
		userId,
		resourceId,
		isComplete: true,
	})
}

export async function removeProgressFromResource({
	userId,
	resourceId,
}: {
	userId: string
	resourceId: string
}): Promise<void> {
	await db
		.delete(resourceProgress)
		.where(and(eq(resourceProgress.userId, userId), eq(resourceProgress.resourceId, resourceId)))
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
