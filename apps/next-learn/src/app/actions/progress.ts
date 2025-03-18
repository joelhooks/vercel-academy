'use server'

import { markResourceComplete, updateResourceProgress } from '@/server/progress/user-progress'
import { revalidatePath } from 'next/cache'

/**
 * Server action for marking a resource as complete
 */
export async function markComplete(formData: FormData) {
	const userId = formData.get('userId') as string
	const resourceId = formData.get('resourceId') as string
	const returnPath = formData.get('returnPath') as string

	// Enhanced validation
	if (!userId) {
		return { error: 'User ID is required' }
	}

	if (!resourceId) {
		return { error: 'Resource ID is required' }
	}

	// Basic validation for resource ID format (assuming it should be alphanumeric)
	if (!/^[a-zA-Z0-9_-]+$/.test(resourceId)) {
		return { error: 'Invalid resource ID format' }
	}

	try {
		await markResourceComplete(userId, resourceId)

		// Revalidate the current page to reflect changes
		if (returnPath) {
			revalidatePath(returnPath)
		}

		return { success: true }
	} catch (error) {
		console.error('Error marking resource complete:', error)
		return {
			error: 'Failed to update progress',
			details: error instanceof Error ? error.message : String(error),
		}
	}
}

/**
 * Server action for updating resource progress
 */
export async function updateProgress(formData: FormData) {
	const userId = formData.get('userId') as string
	const resourceId = formData.get('resourceId') as string
	const progressValue = formData.get('progressPercent') as string
	const progressPercent = Number.parseFloat(progressValue)
	const returnPath = formData.get('returnPath') as string

	// Enhanced validation
	if (!userId) {
		return { error: 'User ID is required' }
	}

	if (!resourceId) {
		return { error: 'Resource ID is required' }
	}

	if (Number.isNaN(progressPercent) || progressPercent < 0 || progressPercent > 100) {
		return { error: 'Progress percentage must be a number between 0 and 100' }
	}

	try {
		await updateResourceProgress(userId, resourceId, progressPercent)

		// Revalidate the current page to reflect changes
		if (returnPath) {
			revalidatePath(returnPath)
		}

		return { success: true }
	} catch (error) {
		console.error('Error updating resource progress:', error)
		return {
			error: 'Failed to update progress',
			details: error instanceof Error ? error.message : String(error),
		}
	}
}
