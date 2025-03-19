import { generateModuleParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent, resolveParams } from '@/utils/localization'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Balancer from 'react-wrap-balancer'
// Import UI components
import components from '@/mdx/components/components'
import mdxOptions from '@/mdx/mdx-options'
import { SidebarInset } from '@/components/ui/sidebar'
import { Section } from '@/components/layout'
import { Container } from '@/components/layout'
import { Badge } from '@/components/ui/badge'
import {
	AcademySidebar,
	AcademySidebarSkeleton,
} from '@/components/academy/sidebar/academy-sidebar'
import { Suspense } from 'react'
import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { getProgressForModule } from '@/server/progress/user-progress'
import { auth } from '@/auth'

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

		// Get current user if authenticated
		const session = await auth()
		const userId = session?.user?.id

		// Validate the module resource
		const moduleResource = await getValidatedResource({
			slug: moduleSlug,
			expectedType: 'module',
		})

		// Get user progress for this module
		const moduleProgressLoader = userId
			? getProgressForModule(userId, moduleResource.id)
			: Promise.resolve(null)

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
			<>
				<Suspense fallback={<AcademySidebarSkeleton course={moduleResource} />}>
					<AcademySidebar course={moduleResource} lang={lang} />
				</Suspense>
				<SidebarInset id="module" className="relative overflow-y-auto pb-12">
					<ModuleProgressProvider moduleProgressLoader={moduleProgressLoader}>
						<Section className="bg-accent/30 border-b relative !bg-grid">
							<Container className="ds space-y-4 sm:space-y-6 items-center" isUniversity>
								<h1>{title}</h1>
								{description && (
									<p className="text-muted-foreground leading-tight">
										<Balancer>{description}</Balancer>
									</p>
								)}
								<div className="flex flex-wrap gap-1">
									<Badge>{5} Chapters</Badge>
									<Badge variant="secondary">~ {12} hours</Badge>
									{/* {completedChapters > 0 && (
									<Badge variant="secondary">
										{completedChapters}/{totalChapters} Complete
									</Badge>
								)}
								{numOfStudentsEnrolled > 0 && (
									<Badge variant="secondary">{numOfStudentsEnrolled.toLocaleString()} Students</Badge>
								)} */}
								</div>
							</Container>
						</Section>
						<div className="container max-w-6xl mx-auto py-8 px-4">
							<div className="mb-8">
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
					</ModuleProgressProvider>
				</SidebarInset>
			</>
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
