import {
	getContentResourceBySlug,
	getLessonsBySectionId,
	getLocalizedField,
} from '@/lib/content-resources'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { auth } from '@/auth'
import { LessonCompleteButton } from '@/components/lesson-complete-button'
import { Suspense } from 'react'

// Import shadcn UI components
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

interface LessonPageProps {
	params: {
		lang: string
		moduleSlug: string
		sectionSlug: string
		lessonSlug: string
	}
}

export default async function LessonPage({ params }: LessonPageProps) {
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang, moduleSlug, sectionSlug, lessonSlug } = resolvedParams

	// Get current user if authenticated
	const session = await auth()
	const userId = session?.user?.id

	// Get all resources by slug
	const moduleResource = await getContentResourceBySlug(moduleSlug)
	if (!moduleResource || moduleResource.type !== 'module') {
		notFound()
	}

	const sectionResource = await getContentResourceBySlug(sectionSlug)
	if (!sectionResource || sectionResource.type !== 'section') {
		notFound()
	}

	const lessonResource = await getContentResourceBySlug(lessonSlug)
	if (!lessonResource || lessonResource.type !== 'lesson') {
		notFound()
	}

	// Get all lessons in this section for navigation
	const lessons = await getLessonsBySectionId(sectionResource.id)

	// Find current lesson index
	const currentLessonIndex = lessons.findIndex((lesson) => lesson.id === lessonResource.id)
	const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null
	const nextLesson =
		currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null

	// Get localized fields
	const moduleTitle = getLocalizedField<string>(
		{ fields: moduleResource.fields || {} },
		'title',
		lang,
		'Untitled Module',
	)

	const sectionTitle = getLocalizedField<string>(
		{ fields: sectionResource.fields || {} },
		'title',
		lang,
		'Untitled Section',
	)

	const lessonTitle = getLocalizedField<string>(
		{ fields: lessonResource.fields || {} },
		'title',
		lang,
		'Untitled Lesson',
	)

	const lessonContent =
		getLocalizedField<string>(
			{ fields: lessonResource.fields || {} },
			'body',
			lang,
			'No content available for this lesson.',
		) || ''

	// Safely split content into paragraphs
	const contentParagraphs = lessonContent.split('\n').filter(Boolean)

	// Calculate lesson number and progress
	const lessonNumber = currentLessonIndex + 1
	const totalLessons = lessons.length
	const progressPercent = (lessonNumber / totalLessons) * 100

	return (
		<div className="min-h-screen bg-gradient-to-b from-background to-background/80">
			<div className="container mx-auto py-8 px-4 max-w-4xl">
				{/* Breadcrumb Navigation with shadcn UI */}
				<Breadcrumb className="mb-6">
					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/${lang}/${moduleSlug}`}
							className="text-primary/80 hover:text-primary"
						>
							{moduleTitle}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbLink
							href={`/${lang}/${moduleSlug}/${sectionSlug}`}
							className="text-primary/80 hover:text-primary"
						>
							{sectionTitle}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<span className="font-medium">{lessonTitle}</span>
					</BreadcrumbItem>
				</Breadcrumb>

				{/* Progress indicator */}
				<div className="mb-8">
					<div className="flex justify-between text-sm text-muted-foreground mb-2">
						<span>
							Lesson {lessonNumber} of {totalLessons}
						</span>
						<span>{Math.round(progressPercent)}% Complete</span>
					</div>
					<Progress value={progressPercent} className="h-2" />
				</div>

				{/* Main content card with lesson */}
				<Card className="mb-8 border shadow-md">
					<CardHeader className="bg-muted/40 border-b">
						<CardTitle className="text-2xl">{lessonTitle}</CardTitle>
					</CardHeader>
					<CardContent className="p-6">
						<div className="prose prose-blue prose-lg max-w-none">
							<Suspense fallback={<div className="p-4 text-center">Loading lesson content...</div>}>
								{contentParagraphs.map((paragraph: string, index: number) => {
									// Create a truly unique key based on index and content hash
									// This ensures uniqueness even if paragraphs start with the same text
									const contentHash = Buffer.from(paragraph.substring(0, 20)).toString('base64')
									const uniqueKey = `paragraph-${index}-${contentHash}`

									return (
										<p key={uniqueKey} className="my-4 leading-relaxed">
											{paragraph}
										</p>
									)
								})}
							</Suspense>
						</div>
					</CardContent>
				</Card>

				{/* Completion button for logged in users */}
				{userId && (
					<div className="mb-8 flex justify-center">
						<Suspense fallback={<Button disabled>Loading progress...</Button>}>
							<LessonCompleteButton lessonId={lessonResource.id} />
						</Suspense>
					</div>
				)}

				{/* Navigation buttons */}
				<Separator className="my-6" />

				<div className="flex justify-between">
					{prevLesson ? (
						<Button
							variant="outline"
							className="flex items-center shadow-sm hover:shadow transition-all"
							asChild
						>
							<Link
								href={`/${lang}/${moduleSlug}/${sectionSlug}/${getLocalizedField<string>(
									{ fields: prevLesson.fields || {} },
									'slug',
									lang,
									prevLesson.id,
								)}`}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<title>Previous lesson</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M15 19l-7-7 7-7"
									/>
								</svg>
								{getLocalizedField<string>(
									{ fields: prevLesson.fields || {} },
									'title',
									lang,
									'Previous Lesson',
								)}
							</Link>
						</Button>
					) : (
						<div />
					)}

					{nextLesson ? (
						<Button
							variant="outline"
							className="flex items-center shadow-sm hover:shadow hover:bg-accent/50 transition-all"
							asChild
						>
							<Link
								href={`/${lang}/${moduleSlug}/${sectionSlug}/${getLocalizedField<string>(
									{ fields: nextLesson.fields || {} },
									'slug',
									lang,
									nextLesson.id,
								)}`}
							>
								{getLocalizedField<string>(
									{ fields: nextLesson.fields || {} },
									'title',
									lang,
									'Next Lesson',
								)}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 ml-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<title>Next lesson</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 5l7 7-7 7"
									/>
								</svg>
							</Link>
						</Button>
					) : (
						<Button
							variant="default"
							className="flex items-center shadow-sm hover:shadow transition-all"
							asChild
						>
							<Link href={`/${lang}/${moduleSlug}`}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="size-4 mr-2"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<title>Complete module</title>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
								Complete Module
							</Link>
						</Button>
					)}
				</div>
			</div>
		</div>
	)
}
