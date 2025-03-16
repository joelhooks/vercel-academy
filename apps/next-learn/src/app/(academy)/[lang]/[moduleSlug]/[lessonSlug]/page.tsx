import { getLessonsByModuleId } from '@/server/content/resources'
import Link from 'next/link'
import { auth } from '@/auth'
import { LessonCompleteButton } from '@/components/lesson-complete-button'
import { Suspense } from 'react'
import { generateNewLessonParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent, resolveParams } from '@/utils/localization'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MdxImage } from '@/components/mdx/mdx-image'
import { InThisChapter } from '@/components/mdx/in-this-chapter'
import { Quiz } from '@/components/mdx/quiz'
import { Reveal } from '@/components/mdx/reveal'
import { Callout } from '@/components/mdx/callout'
import { Steps, Step } from '@/components/mdx/steps'
import { CodeBlock } from '@/components/mdx/code-block'
import { Tabs } from '@/components/mdx/tabs'
import { Card as MdxCard } from '@/components/mdx/card'

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
import { Badge } from '@/components/ui/badge'

export async function generateStaticParams() {
	return generateNewLessonParams()
}

interface LessonPageProps {
	params: {
		lang: string
		moduleSlug: string
		lessonSlug: string
	}
}

export default async function LessonPage({ params }: LessonPageProps) {
	// Resolve and destructure params
	const { lang, moduleSlug, lessonSlug } = await resolveParams(params)

	// Get current user if authenticated
	const session = await auth()
	const userId = session?.user?.id

	// Get and validate module resource
	const moduleResource = await getValidatedResource({
		slug: moduleSlug,
		expectedType: 'module',
	})

	// Get and validate lesson resource
	const lessonResource = await getValidatedResource({
		slug: lessonSlug,
		expectedType: 'lesson',
	})

	// Get all lessons in this module with their section information
	const lessonsWithSections = await getLessonsByModuleId(moduleResource.id)

	// Find current lesson index and associated section info
	const currentLessonIndex = lessonsWithSections.findIndex(
		(lesson) => lesson.id === lessonResource.id,
	)
	const currentLesson = currentLessonIndex >= 0 ? lessonsWithSections[currentLessonIndex] : null
	const sectionTitle = currentLesson?.sectionTitle || 'Unknown Section'

	// Set up navigation to previous and next lessons across section boundaries
	const prevLesson = currentLessonIndex > 0 ? lessonsWithSections[currentLessonIndex - 1] : null
	const nextLesson =
		currentLessonIndex < lessonsWithSections.length - 1
			? lessonsWithSections[currentLessonIndex + 1]
			: null

	// Get localized fields
	const moduleTitle = getLocalizedContent({
		resource: moduleResource,
		field: 'title',
		lang,
		defaultValue: 'Untitled Module',
	})

	const lessonTitle = getLocalizedContent({
		resource: lessonResource,
		field: 'title',
		lang,
		defaultValue: 'Untitled Lesson',
	})

	const lessonContent =
		getLocalizedContent({
			resource: lessonResource,
			field: 'body',
			lang,
			defaultValue: 'No content available for this lesson.',
		}) || ''

	// Calculate lesson number and progress
	const lessonNumber = currentLessonIndex + 1
	const totalLessons = lessonsWithSections.length
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
						<span className="font-medium">{lessonTitle}</span>
					</BreadcrumbItem>
				</Breadcrumb>

				{/* Section Tag */}
				<div className="mb-4">
					<Badge variant="outline" className="text-sm">
						Section: {sectionTitle}
					</Badge>
				</div>

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
						<div className="prose dark:prose-invert max-w-none my-8">
							<MDXRemote
								source={lessonContent}
								components={{
									Image: MdxImage,
									InThisChapter: InThisChapter,
									Quiz: Quiz,
									Reveal: Reveal,
									Callout: Callout,
									Steps: Steps,
									Step: Step,
									CodeBlock: CodeBlock,
									Tabs: Tabs,
									Card: MdxCard,
								}}
							/>
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
								href={`/${lang}/${moduleSlug}/${getLocalizedContent({
									resource: prevLesson,
									field: 'slug',
									lang,
									defaultValue: prevLesson.id,
								})}`}
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
								{getLocalizedContent({
									resource: prevLesson,
									field: 'title',
									lang,
									defaultValue: 'Previous Lesson',
								})}
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
								href={`/${lang}/${moduleSlug}/${getLocalizedContent({
									resource: nextLesson,
									field: 'slug',
									lang,
									defaultValue: nextLesson.id,
								})}`}
							>
								{getLocalizedContent({
									resource: nextLesson,
									field: 'title',
									lang,
									defaultValue: 'Next Lesson',
								})}
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
						<div />
					)}
				</div>
			</div>
		</div>
	)
}
