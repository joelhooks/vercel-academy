import Link from 'next/link'
import { auth } from '@/auth'
import { LessonCompleteButton } from '@/components/lesson-complete-button'
import { Suspense } from 'react'
import { generateNewLessonParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent, resolveParams } from '@/utils/localization'
import { MDXRemote } from 'next-mdx-remote/rsc'
// Import shadcn UI components
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import '@/styles/hljs/github-dark.css'

import components from '@/mdx/components/components'
import mdxOptions from '@/mdx/mdx-options'

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

	return (
		<div className="container mx-auto py-8 px-4 max-w-4xl">
			{/* Simple Breadcrumb */}
			<div className="mb-6 flex items-center text-sm">
				<Link href={`/${lang}/${moduleSlug}`} className="text-primary hover:underline">
					{moduleTitle}
				</Link>
				<span className="mx-2">/</span>
				<span className="font-medium text-foreground">{lessonTitle}</span>
			</div>

			{/* Lesson title */}
			<h1 className="text-3xl font-bold mb-6">{lessonTitle}</h1>

			{/* Main content */}
			<div className="prose dark:prose-invert max-w-none mb-8">
				<MDXRemote
					source={lessonContent}
					components={components}
					options={{
						mdxOptions,
					}}
				/>
			</div>

			{/* Completion button for logged in users */}
			{userId && (
				<div className="mb-8 flex justify-center">
					<Suspense fallback={<Button disabled>Loading progress...</Button>}>
						<LessonCompleteButton lessonId={lessonResource.id} />
					</Suspense>
				</div>
			)}

			<Separator className="my-6" />

			{/* Navigation buttons - these will be automatically populated by layout based on the navigation context */}
			<div className="flex justify-between">
				<div>
					<Button variant="outline" asChild>
						<Link href={`/${lang}/${moduleSlug}`} className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-2"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M10 19l-7-7m0 0l7-7m-7 7h18"
								/>
							</svg>
							Back to module
						</Link>
					</Button>
				</div>
			</div>
		</div>
	)
}
