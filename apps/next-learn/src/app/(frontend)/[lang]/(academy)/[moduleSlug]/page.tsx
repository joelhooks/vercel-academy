import { getLessonsByModuleId } from '@/server/content/resources'
import Link from 'next/link'
import { generateModuleParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent, resolveParams } from '@/utils/localization'
import { MDXRemote } from 'next-mdx-remote/rsc'

// Import UI components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import components from '@/mdx/components/components'
import mdxOptions from '@/mdx/mdx-options'

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

		// Validate the module resource
		const moduleResource = await getValidatedResource({
			slug: moduleSlug,
			expectedType: 'module',
		})

		// Fetch all lessons for this module grouped by section
		const lessonsWithSections = await getLessonsByModuleId(moduleResource.id)

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
								components={components}
								options={{
									mdxOptions,
								}}
							/>
						</div>
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
