import { getLessonsByModuleId } from '@/server/content/resources'
import Link from 'next/link'
import { generateModuleParams } from '@/server/params/static-params'
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

// Import UI components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export async function generateStaticParams() {
	return generateModuleParams()
}

interface ModulePageProps {
	params: {
		lang: string
		moduleSlug: string
	}
}

export default async function ModulePage({ params }: ModulePageProps) {
	try {
		// Resolve and destructure params
		const { lang, moduleSlug } = await resolveParams(params)

		console.log(
			`ModulePage: Attempting to fetch module with slug "${moduleSlug}" and lang "${lang}"`,
		)

		// Validate the module resource
		const moduleResource = await getValidatedResource({
			slug: moduleSlug,
			expectedType: 'module',
		})

		// Fetch all lessons for this module grouped by section
		const lessonsWithSections = await getLessonsByModuleId(moduleResource.id)
		console.log(
			`ModulePage: Found ${lessonsWithSections.length} lessons for module ${moduleResource.id}`,
		)

		// Group lessons by sectionId for display
		const sectionGroups = lessonsWithSections.reduce<Record<string, typeof lessonsWithSections>>(
			(groups, lesson) => {
				const sectionId = lesson.sectionId
				if (!groups[sectionId]) {
					groups[sectionId] = []
				}
				groups[sectionId].push(lesson)
				return groups
			},
			{},
		)

		// Sort sections by sectionPosition
		const sortedSectionIds = Object.keys(sectionGroups).sort((a, b) => {
			const posA = sectionGroups[a]?.[0]?.sectionPosition || 0
			const posB = sectionGroups[b]?.[0]?.sectionPosition || 0
			return posA - posB
		})

		// Get localized title and description
		const title = getLocalizedContent({
			resource: moduleResource,
			field: 'title',
			lang,
			defaultValue: `Module ${moduleResource.id}`,
		})

		const description = getLocalizedContent({
			resource: moduleResource,
			field: 'description',
			lang,
			defaultValue: '',
		})

		// Get localized body content
		const body = getLocalizedContent({
			resource: moduleResource,
			field: 'body',
			lang,
			defaultValue: '',
		})

		console.log('ModulePage: About to render component')

		return (
			<div className="container max-w-6xl mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-4">{title}</h1>
					{description && <p className="text-xl text-muted-foreground mb-6">{description}</p>}

					{/* Display the module body content */}
					{body && (
						<div className="prose dark:prose-invert max-w-none mb-8">
							<MDXRemote
								source={body}
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
					)}

					<Separator className="my-6" />
				</div>

				<div className="grid gap-8">
					{sortedSectionIds.length > 0 ? (
						sortedSectionIds.map((sectionId) => {
							const lessons = sectionGroups[sectionId] || []
							const sectionTitle = lessons[0]?.sectionTitle || `Section ${sectionId}`

							return (
								<div key={sectionId} className="space-y-4">
									<h2 className="text-2xl font-semibold">{sectionTitle}</h2>
									<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
										{lessons.map((lesson) => {
											const lessonTitle = getLocalizedContent({
												resource: lesson,
												field: 'title',
												lang,
												defaultValue: `Lesson ${lesson.id}`,
											})

											const lessonDescription = getLocalizedContent({
												resource: lesson,
												field: 'description',
												lang,
												defaultValue: '',
											})

											// Get lesson slug from fields, fallback to ID if not available
											const lessonSlug = getLocalizedContent({
												resource: lesson,
												field: 'slug',
												lang,
												defaultValue: lesson.id,
											})

											return (
												<Card key={lesson.id} className="flex flex-col h-full">
													<CardHeader>
														<CardTitle className="line-clamp-2">{lessonTitle}</CardTitle>
														{lessonDescription && (
															<p className="text-sm text-muted-foreground line-clamp-2 mt-1">
																{lessonDescription}
															</p>
														)}
													</CardHeader>
													<CardContent className="flex-grow">
														<div className="h-2 w-full bg-muted rounded-full mb-4">
															<div className="h-2 bg-blue-500 rounded-full w-0" />
														</div>
														<p className="text-sm text-muted-foreground">Not started</p>
													</CardContent>
													<CardFooter className="flex justify-end pt-2">
														<Link
															href={`/${lang}/${moduleSlug}/${lessonSlug}`}
															className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center hover:underline transition-all"
														>
															Start lesson
															<svg
																xmlns="http://www.w3.org/2000/svg"
																className="h-4 w-4 ml-1 transition-transform hover:translate-x-1"
																fill="none"
																viewBox="0 0 24 24"
																stroke="currentColor"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M14 5l7 7m0 0l-7 7m7-7H3"
																/>
															</svg>
														</Link>
													</CardFooter>
												</Card>
											)
										})}
									</div>
								</div>
							)
						})
					) : (
						<p className="text-center py-8 text-muted-foreground">
							No lessons available for this module yet.
						</p>
					)}
				</div>
			</div>
		)
	} catch (error) {
		console.error('ModulePage: Error rendering module page:', error)
		return (
			<div className="container max-w-6xl mx-auto py-8 px-4">
				<h1 className="text-4xl font-bold mb-4">Error Loading Module</h1>
				<p className="text-red-500">
					There was an error loading this module. Please try again later.
				</p>
				<pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto text-sm">
					{error instanceof Error ? error.message : String(error)}
				</pre>
			</div>
		)
	}
}
