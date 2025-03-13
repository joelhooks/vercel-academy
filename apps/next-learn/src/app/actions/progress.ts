'use server'

import { markResourceComplete, updateResourceProgress } from '@/lib/data/progress'
import { revalidatePath } from 'next/cache'

/**
 * Server action for marking a resource as complete
 */
export async function markComplete(formData: FormData) {
	const userId = formData.get('userId') as string
	const resourceId = formData.get('resourceId') as string
	const returnPath = formData.get('returnPath') as string

	if (!userId || !resourceId) {
		return { error: 'Missing required fields' }
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
		return { error: 'Failed to update progress' }
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

	if (!userId || !resourceId || Number.isNaN(progressPercent)) {
		return { error: 'Missing or invalid fields' }
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
		return { error: 'Failed to update progress' }
	}
}
