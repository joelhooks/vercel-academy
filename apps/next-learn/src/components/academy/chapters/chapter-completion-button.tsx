'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { defaultLocale } from '@/config/locales'
import { cn } from '@/lib/utils'
import { useModuleProgress } from '@/components/providers/module-progress-provider'
import { SignInButton } from '@/components/sign-in-button'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ChapterCompletionButtonProps {
	chapterId: string
	courseSlug: string
	lang?: string
	isCompleted?: boolean
	isPending?: boolean
}

export function ChapterCompletionButton({
	chapterId,
	courseSlug,
	lang,
	isCompleted: propIsCompleted,
	isPending: propIsPending,
}: ChapterCompletionButtonProps) {
	const router = useRouter()
	const { moduleProgress, addLessonProgress, isPending: contextIsPending } = useModuleProgress()
	const [isSubmitting, setIsSubmitting] = useState(false)

	// Create path with or without language prefix
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''

	// Use prop value if provided, otherwise calculate from context
	const isCompleted =
		propIsCompleted !== undefined
			? propIsCompleted
			: moduleProgress?.completedLessons?.some((lesson) => lesson.resourceId === chapterId) || false

	const isPending = propIsPending !== undefined ? propIsPending : contextIsPending

	const handleComplete = async () => {
		// If chapter is already completed and there's a next resource, just navigate
		if (isCompleted) {
			// For completion page or next chapter
			if (moduleProgress?.nextResource) {
				router.push(`${langPrefix}/${courseSlug}/${moduleProgress.nextResource}`, {
					scroll: true,
				})
			} else {
				router.push(`${langPrefix}/${courseSlug}/completion`, { scroll: true })
			}
			return
		}

		// Otherwise, mark as completed and then navigate
		setIsSubmitting(true)

		try {
			// Mark this lesson as complete
			await addLessonProgress(chapterId)

			// Force a refresh to ensure server state is updated
			router.refresh()

			// Wait a moment to ensure state is updated
			setTimeout(() => {
				if (moduleProgress?.nextResource) {
					router.push(`${langPrefix}/${courseSlug}/${moduleProgress.nextResource}`, {
						scroll: true,
					})
				} else {
					router.push(`${langPrefix}/${courseSlug}/completion`, { scroll: true })
				}
			}, 300)
		} catch (error) {
			console.error('Failed to complete chapter:', error)
			setIsSubmitting(false)
		}
	}

	// If no user is logged in (moduleProgress is null), show sign in button
	if (!moduleProgress?.userId) {
		return (
			<SignInButton
				className={cn(
					'w-full text-xl py-6',
					'bg-primary text-primary-foreground hover:bg-primary/90',
				)}
				callbackUrl={`${langPrefix}/${courseSlug}/${moduleProgress?.nextResource || ''}`}
				label="Sign In to Track Progress"
			/>
		)
	}

	// If chapter is completed and there's no next chapter, render a Link to completion page
	if (isCompleted && !moduleProgress?.nextResource) {
		return (
			<Link
				href={`${langPrefix}/${courseSlug}/completion`}
				className={cn(
					'w-full text-xl py-6 flex items-center gap-2 justify-center',
					'bg-primary text-primary-foreground hover:bg-primary/90',
					'rounded-md font-medium ring-offset-background transition-colors',
					'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
					'h-12 px-4',
				)}
			>
				View completion certificate
			</Link>
		)
	}

	return (
		<Button
			onClick={handleComplete}
			size="lg"
			className={cn(
				'w-full text-xl py-6 flex items-center gap-2 justify-center',
				(isSubmitting || isPending || moduleProgress?.percentCompleted === 100) &&
					'cursor-not-allowed opacity-50',
			)}
			disabled={isSubmitting || isPending}
		>
			{isSubmitting || isPending ? (
				<>
					<Loader2 className="h-4 w-4 animate-spin" />
					<span>Completing chapter...</span>
				</>
			) : isCompleted ? (
				'Continue to next chapter'
			) : (
				'Complete chapter'
			)}
		</Button>
	)
}
