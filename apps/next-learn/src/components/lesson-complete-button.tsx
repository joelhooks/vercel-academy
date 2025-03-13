'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useModuleProgress } from '@/components/providers/module-progress-provider'

interface LessonCompleteButtonProps {
	lessonId: string
	onComplete?: () => void
}

export function LessonCompleteButton({ lessonId, onComplete }: LessonCompleteButtonProps) {
	const { moduleProgress, addLessonProgress, removeLessonProgress } = useModuleProgress()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const isComplete = moduleProgress?.completedLessons.some(
		(lesson) => lesson.resourceId === lessonId,
	)

	const handleToggleComplete = async () => {
		setIsSubmitting(true)

		try {
			if (isComplete) {
				// Mark as incomplete (server action will be called by provider)
				removeLessonProgress(lessonId)
			} else {
				// Mark as complete (server action will be called by provider)
				addLessonProgress(lessonId)
				if (onComplete) onComplete()
			}
		} catch (error) {
			console.error('Failed to update lesson progress', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	return (
		<Button
			onClick={handleToggleComplete}
			disabled={isSubmitting}
			variant={isComplete ? 'secondary' : 'default'}
			className={
				isComplete
					? 'bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900 border border-green-200 shadow-sm'
					: 'bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all'
			}
			size="lg"
		>
			{isSubmitting ? (
				<>
					<svg
						className="mr-2 size-4 animate-spin"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<title>Loading</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
						/>
					</svg>
					Updating...
				</>
			) : isComplete ? (
				<>
					<svg
						className="mr-2 size-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<title>Completed</title>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
					Lesson Completed
				</>
			) : (
				<>
					<svg
						className="mr-2 size-4"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<title>Mark complete</title>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
					</svg>
					Mark as Complete
				</>
			)}
		</Button>
	)
}
