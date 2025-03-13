import db from '@/db'
import { resourceProgress } from '@/db/schema'
import { and, eq } from 'drizzle-orm'

/**
 * Retrieves progress for a specific user and resource
 */
export const getProgressForUserAndResource = async (userId: string, resourceId: string) => {
	try {
		const result = await db
			.select()
			.from(resourceProgress)
			.where(and(eq(resourceProgress.userId, userId), eq(resourceProgress.resourceId, resourceId)))
			.limit(1)

		return result[0] || null
	} catch (error) {
		console.error(
			`Error fetching progress for user "${userId}" and resource "${resourceId}":`,
			error,
		)
		return null
	}
}

/**
 * Retrieves all progress records for a specific user
 */
export const getAllProgressForUser = async (userId: string) => {
	try {
		const result = await db
			.select()
			.from(resourceProgress)
			.where(eq(resourceProgress.userId, userId))

		return result
	} catch (error) {
		console.error(`Error fetching all progress for user "${userId}":`, error)
		return []
	}
}

/**
 * Marks a resource as complete for a user (100% progress)
 */
export const markResourceComplete = async (userId: string, resourceId: string) => {
	try {
		const existingProgress = await getProgressForUserAndResource(userId, resourceId)

		if (existingProgress) {
			// Update existing progress record
			await db
				.update(resourceProgress)
				.set({
					isComplete: true,
					progressPercent: 100,
					updatedAt: new Date(),
				})
				.where(
					and(eq(resourceProgress.userId, userId), eq(resourceProgress.resourceId, resourceId)),
				)
		} else {
			// Create new progress record
			await db.insert(resourceProgress).values({
				userId,
				resourceId,
				isComplete: true,
				progressPercent: 100,
				updatedAt: new Date(),
			})
		}

		return true
	} catch (error) {
		console.error(`Error marking resource "${resourceId}" complete for user "${userId}":`, error)
		return false
	}
}

/**
 * Updates progress percentage for a user on a specific resource
 */
export const updateResourceProgress = async (
	userId: string,
	resourceId: string,
	progressPercent: number,
) => {
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
			// Create new progress record
			await db.insert(resourceProgress).values({
				userId,
				resourceId,
				isComplete,
				progressPercent,
				updatedAt: new Date(),
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
