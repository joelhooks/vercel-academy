'use client'

import * as React from 'react'
import {
	addProgressToResource,
	removeProgressFromResource,
	type ModuleProgress,
} from '@/server/progress/user-progress'

// Define a basic schema for module progress until we import the actual one

type ModuleProgressContextType = {
	moduleProgress: ModuleProgress | null
	removeLessonProgress: (lessonId: string) => void
	addLessonProgress: (lessonId: string) => void
	isPending: boolean
}

const ModuleProgressContext = React.createContext<ModuleProgressContextType>({
	moduleProgress: null,
	removeLessonProgress: () => {},
	addLessonProgress: () => {},
	isPending: false,
})

type LessonProgressAction = {
	type: 'REMOVE_LESSON_PROGRESS' | 'ADD_LESSON_PROGRESS'
	payload: { lessonId: string }
}

type SyncProgressAction = {
	type: 'SYNC_PROGRESS'
	payload: { progress: ModuleProgress | null }
}

type ProgressAction = LessonProgressAction | SyncProgressAction

function progressReducer(
	progress: ModuleProgress | null,
	action: ProgressAction,
): ModuleProgress | null {
	switch (action.type) {
		case 'SYNC_PROGRESS': {
			const newProgress = action.payload.progress
			if (!progress || !progress.completedLessons.length) {
				return newProgress
			}
			return progress
		}
		case 'ADD_LESSON_PROGRESS':
		case 'REMOVE_LESSON_PROGRESS': {
			const currentProgress = progress || {
				completedLessons: [],
				nextResource: null,
				percentCompleted: 0,
				completedLessonsCount: 0,
				totalLessonsCount: 0,
				userId: null,
			}

			if (action.type === 'ADD_LESSON_PROGRESS') {
				// Check if lesson is already completed to prevent duplicates
				if (
					currentProgress.completedLessons.some(
						(lesson) => lesson.resourceId === action.payload.lessonId,
					)
				) {
					return currentProgress
				}

				return {
					...currentProgress,
					completedLessons: [
						...currentProgress.completedLessons,
						{
							resourceId: action.payload.lessonId,
							isComplete: true,
							userId: currentProgress.userId,
						},
					],
					completedLessonsCount: currentProgress.completedLessonsCount + 1,
				}
			} else {
				// Only remove if it exists
				if (
					!currentProgress.completedLessons.some(
						(lesson) => lesson.resourceId === action.payload.lessonId,
					)
				) {
					return currentProgress
				}

				return {
					...currentProgress,
					completedLessons: currentProgress.completedLessons.filter(
						(completedLesson) => completedLesson.resourceId !== action.payload.lessonId,
					),
					completedLessonsCount: currentProgress.completedLessonsCount - 1,
				}
			}
		}
		default:
			return progress
	}
}

const EMPTY_PROGRESS: ModuleProgress = {
	completedLessons: [],
	nextResource: null,
	percentCompleted: 0,
	completedLessonsCount: 0,
	totalLessonsCount: 0,
	userId: null,
}

function ModuleProgressProviderInner({
	children,
	serverProgress,
}: {
	children: React.ReactNode
	serverProgress: ModuleProgress | null
}) {
	const [isPending, startTransition] = React.useTransition()
	const [localProgress, setLocalProgress] = React.useState<ModuleProgress | null>(null)

	// Track if we're in a server request
	const isUpdatingRef = React.useRef(false)

	React.useEffect(() => {
		if (!localProgress) {
			setLocalProgress(serverProgress)
		}
	}, [serverProgress, localProgress])

	const [optimisticProgress, updateOptimisticProgress] = React.useOptimistic(
		localProgress,
		progressReducer,
	)

	const handleProgressUpdate = React.useCallback(
		async (action: LessonProgressAction) => {
			if (!optimisticProgress?.userId) return

			// If we're already updating, don't trigger another update
			if (isUpdatingRef.current) return

			isUpdatingRef.current = true

			try {
				// Apply optimistic update immediately
				startTransition(() => {
					updateOptimisticProgress(action)
				})

				// Make server request after optimistic update
				if (action.type === 'ADD_LESSON_PROGRESS') {
					await addProgressToResource({
						userId: optimisticProgress.userId,
						resourceId: action.payload.lessonId,
					})
					// Update the underlying state to match optimistic state
					setLocalProgress((prev) => progressReducer(prev, action))
				} else if (action.type === 'REMOVE_LESSON_PROGRESS') {
					await removeProgressFromResource({
						userId: optimisticProgress.userId,
						resourceId: action.payload.lessonId,
					})
					// Update the underlying state to match optimistic state
					setLocalProgress((prev) => progressReducer(prev, action))
				}
			} catch (error) {
				console.error(error)
				// Revert optimistic update on error
				startTransition(() => {
					updateOptimisticProgress({
						type:
							action.type === 'ADD_LESSON_PROGRESS'
								? 'REMOVE_LESSON_PROGRESS'
								: 'ADD_LESSON_PROGRESS',
						payload: { lessonId: action.payload.lessonId },
					})
				})
			} finally {
				isUpdatingRef.current = false
			}
		},
		[optimisticProgress?.userId, startTransition, updateOptimisticProgress],
	)

	const value = React.useMemo(
		() => ({
			moduleProgress: optimisticProgress,
			isPending,
			removeLessonProgress: (lessonId: string) => {
				handleProgressUpdate({
					type: 'REMOVE_LESSON_PROGRESS',
					payload: { lessonId },
				})
			},
			addLessonProgress: (lessonId: string) => {
				handleProgressUpdate({
					type: 'ADD_LESSON_PROGRESS',
					payload: { lessonId },
				})
			},
		}),
		[optimisticProgress, handleProgressUpdate, isPending],
	)

	return <ModuleProgressContext.Provider value={value}>{children}</ModuleProgressContext.Provider>
}

export const ModuleProgressProvider = ({
	children,
	moduleProgressLoader,
}: {
	children: React.ReactNode
	moduleProgressLoader: Promise<ModuleProgress | null>
}) => {
	const serverProgress = React.use(moduleProgressLoader) || EMPTY_PROGRESS

	return (
		<ModuleProgressProviderInner serverProgress={serverProgress}>
			{children}
		</ModuleProgressProviderInner>
	)
}

export const useModuleProgress = () => {
	const context = React.useContext(ModuleProgressContext)
	if (!context) {
		throw new Error('useModuleProgress must be used within a ModuleProgressProvider')
	}
	return context
}
