'use client'

import { CheckCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { ChapterCompletionButton } from './chapter-completion-button'
import { useModuleProgress } from '@/components/providers/module-progress-provider'

export interface ChapterCompletionProps {
	lessonId: string
	moduleSlug: string
	currentLessonNumber: number
	lang?: string
}

export function ChapterCompletion({
	lessonId,
	moduleSlug,
	currentLessonNumber,
	lang,
}: ChapterCompletionProps) {
	const { moduleProgress, isPending } = useModuleProgress()
	const isCompleted =
		moduleProgress?.completedLessons?.some((lesson) => lesson.resourceId === lessonId) || false

	return (
		<div className="flex flex-col items-center gap-4 rounded-lg border bg-accent/20 p-8 text-center">
			<div className="rounded-full bg-accent p-3">
				<CheckCircle
					className={isCompleted ? 'h-6 w-6 text-green-500' : 'h-6 w-6 text-muted-foreground'}
				/>
			</div>
			<div className="space-y-2">
				<h2 className="text-xl font-semibold">
					{isCompleted ? 'Lesson completed!' : 'Ready to complete this lesson?'}
				</h2>
				<p className="text-sm text-muted-foreground">
					{isCompleted
						? `You've completed lesson ${moduleProgress?.completedLessonsCount} of ${moduleProgress?.totalLessonsCount}`
						: `You're on lesson ${currentLessonNumber} of ${moduleProgress?.totalLessonsCount}`}
				</p>
			</div>
			<ChapterCompletionButton
				chapterId={lessonId}
				courseSlug={moduleSlug}
				lang={lang}
				isCompleted={isCompleted}
				isPending={isPending}
			/>
		</div>
	)
}

export function ChapterCompletionSkeleton() {
	return (
		<div className="flex flex-col items-center gap-4 rounded-lg border bg-accent/20 p-8 text-center">
			<div className="rounded-full bg-accent p-3">
				<CheckCircle className="h-6 w-6 text-muted-foreground animate-pulse" />
			</div>
			<div className="space-y-2 w-full">
				<Skeleton className="h-8 w-3/4 mx-auto" />
				<Skeleton className="h-4 w-1/2 mx-auto" />
			</div>
			<Skeleton className="h-14 w-full" />
		</div>
	)
}
