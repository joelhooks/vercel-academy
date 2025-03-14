import {
	getContentResourceBySlug,
	getSectionsByModuleId,
	getLocalizedField,
} from '@/lib/content-resources'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Import shadcn UI components
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface ModulePageProps {
	params: {
		lang: string
		moduleSlug: string
	}
}

export default async function ModulePage({ params }: ModulePageProps) {
	try {
		// Await params to resolve before destructuring
		const resolvedParams = await Promise.resolve(params)
		const { lang, moduleSlug } = resolvedParams

		console.log(
			`ModulePage: Attempting to fetch module with slug "${moduleSlug}" and lang "${lang}"`,
		)

		const moduleResource = await getContentResourceBySlug(moduleSlug)

		console.log(
			'ModulePage: Fetch result:',
			moduleResource
				? {
						id: moduleResource.id,
						type: moduleResource.type,
						fields: moduleResource.fields,
					}
				: 'NULL (Not Found)',
		)

		// Check if module exists and is of type 'module'
		if (!moduleResource || moduleResource.type !== 'module') {
			console.log(
				`ModulePage: Module not found or invalid type. Found: ${moduleResource?.type || 'null'}`,
			)
			return notFound()
		}

		// Fetch sections for this module
		const sections = await getSectionsByModuleId(moduleResource.id)
		console.log(`ModulePage: Found ${sections.length} sections for module ${moduleResource.id}`)

		// Get localized title and description
		const title = getLocalizedField<string>(
			{ fields: moduleResource.fields || {} },
			'title',
			lang,
			`Module ${moduleResource.id}`,
		)

		const description = getLocalizedField<string>(
			{ fields: moduleResource.fields || {} },
			'description',
			lang,
			'',
		)

		console.log('ModulePage: About to render component')

		return (
			<div className="container max-w-6xl mx-auto py-8 px-4">
				<div className="mb-8">
					<h1 className="text-4xl font-bold mb-4">{title}</h1>
					{description && <p className="text-xl text-muted-foreground mb-6">{description}</p>}
					<Separator className="my-6" />
				</div>

				<div className="grid gap-6">
					{sections.length > 0 ? (
						sections.map((section) => {
							const sectionTitle = getLocalizedField<string>(
								{ fields: section.fields || {} },
								'title',
								lang,
								`Section ${section.id}`,
							)

							const sectionDescription = getLocalizedField<string>(
								{ fields: section.fields || {} },
								'description',
								lang,
								'',
							)

							// Get section slug from fields, fallback to ID if not available
							const sectionSlug = getLocalizedField<string>(
								{ fields: section.fields || {} },
								'slug',
								lang,
								section.id,
							)

							return (
								<Card key={section.id} className="overflow-hidden">
									<CardHeader>
										<CardTitle>{sectionTitle}</CardTitle>
										{sectionDescription && <CardDescription>{sectionDescription}</CardDescription>}
									</CardHeader>
									<CardContent>
										<div className="h-2 w-full bg-muted rounded-full mb-4">
											<div className="h-2 bg-blue-500 rounded-full w-0" />
										</div>
										<p className="text-sm text-muted-foreground">Section progress: Not started</p>
									</CardContent>
									<CardFooter className="flex justify-between">
										<Badge variant="outline" className="bg-muted/30">
											Section
										</Badge>
										<Link
											href={`/${lang}/${moduleSlug}/${sectionSlug}`}
											className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center hover:underline transition-all"
										>
											View section
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="size-4 ml-1 transition-transform hover:translate-x-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<title>View section</title>
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
						})
					) : (
						<p className="text-center py-8 text-muted-foreground">
							No sections available for this module yet.
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
