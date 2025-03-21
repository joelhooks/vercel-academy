import { generateModuleParams } from '@/server/params/static-params'
import { getValidatedResource, getLocalizedContent } from '@/utils/localization'
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

export async function generateStaticParams() {
	return generateModuleParams()
}

interface ModulePageProps {
	params: Promise<{
		lang: string
		moduleSlug: string
	}>
}

export default async function ModulePage({ params }: ModulePageProps) {
	// Resolve and destructure params
	const { lang, moduleSlug } = await params

	// Validate the module resource
	const moduleResource = await getValidatedResource({
		slug: moduleSlug,
		expectedType: 'module',
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
		<>
			<SidebarInset id="module" className="relative overflow-y-auto pb-12">
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
				<div className="container mx-auto py-8 px-4 max-w-4xl">
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
			</SidebarInset>
		</>
	)
}
