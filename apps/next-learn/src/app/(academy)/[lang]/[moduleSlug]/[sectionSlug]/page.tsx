import { getLessonsBySectionId } from '@/server/content/resources'
import Link from 'next/link'
import { generateSectionParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent, resolveParams } from '@/utils/localization'

// Import shadcn UI components
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export async function generateStaticParams() {
	return generateSectionParams()
}

interface SectionPageProps {
	params: {
		lang: string
		moduleSlug: string
		sectionSlug: string
	}
}

export default async function SectionPage({ params }: SectionPageProps) {
	// Resolve and destructure params
	const { lang, moduleSlug, sectionSlug } = await resolveParams(params)

	// Get and validate module and section resources
	const moduleResource = await getValidatedResource({
		slug: moduleSlug,
		expectedType: 'module',
	})

	const sectionResource = await getValidatedResource({
		slug: sectionSlug,
		expectedType: 'section',
	})

	// Get lessons for this section
	const lessons = await getLessonsBySectionId(sectionResource.id)

	// Get localized content
	const moduleTitle = getLocalizedContent({
		resource: moduleResource,
		field: 'title',
		lang,
		defaultValue: 'Untitled Module',
	})

	const sectionTitle = getLocalizedContent({
		resource: sectionResource,
		field: 'title',
		lang,
		defaultValue: 'Untitled Section',
	})

	const sectionDescription = getLocalizedContent({
		resource: sectionResource,
		field: 'description',
		lang,
		defaultValue: '',
	})

	return (
		<div className="container mx-auto py-8 px-4">
			{/* Breadcrumb Navigation with shadcn UI */}
			<Breadcrumb className="mb-6">
				<BreadcrumbItem>
					<BreadcrumbLink href={`/${lang}/${moduleSlug}`}>{moduleTitle}</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				<BreadcrumbItem>
					<span className="font-medium">{sectionTitle}</span>
				</BreadcrumbItem>
			</Breadcrumb>

			{/* Section header */}
			<Card className="mb-8">
				<CardHeader>
					<Badge variant="outline" className="w-fit mb-2">
						Section
					</Badge>
					<CardTitle className="text-3xl">{sectionTitle}</CardTitle>
					{sectionDescription && (
						<CardDescription className="text-lg mt-2">{sectionDescription}</CardDescription>
					)}
				</CardHeader>
			</Card>

			<Separator className="my-8" />

			{/* Lessons list */}
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold mb-6">Lessons</h2>

				{lessons.length === 0 ? (
					<Card>
						<CardContent className="p-6">
							<p className="text-gray-500">No lessons available for this section yet.</p>
						</CardContent>
					</Card>
				) : (
					<div className="space-y-3">
						{lessons.map((lesson, index) => {
							const lessonTitle = getLocalizedContent({
								resource: lesson,
								field: 'title',
								lang,
								defaultValue: `Lesson ${index + 1}`,
							})

							// Get lesson slug from fields, fallback to ID if not available
							const lessonSlug = getLocalizedContent({
								resource: lesson,
								field: 'slug',
								lang,
								defaultValue: lesson.id,
							})

							return (
								<Card key={lesson.id} className="hover:shadow-md transition-shadow">
									<CardContent className="p-4 flex items-center">
										<div className="flex-shrink-0 mr-4">
											<Badge
												variant="outline"
												className="w-8 h-8 rounded-full flex items-center justify-center p-0"
											>
												{index + 1}
											</Badge>
										</div>
										<div className="flex-grow">
											<Link
												href={`/${lang}/${moduleSlug}/${sectionSlug}/${lessonSlug}`}
												className="block"
											>
												<h3 className="font-medium text-lg hover:text-blue-600 transition-colors">
													{lessonTitle}
												</h3>
											</Link>
										</div>
										<div className="flex-shrink-0">
											<Link
												href={`/${lang}/${moduleSlug}/${sectionSlug}/${lessonSlug}`}
												className="text-blue-600 hover:text-blue-800"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="size-5"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
													aria-hidden="true"
												>
													<title>Go to lesson</title>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M9 5l7 7-7 7"
													/>
												</svg>
											</Link>
										</div>
									</CardContent>
								</Card>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}
