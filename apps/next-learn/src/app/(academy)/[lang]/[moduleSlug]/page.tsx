import {
	getContentResourceById,
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
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang, moduleSlug } = resolvedParams

	const moduleResource = await getContentResourceById(moduleSlug)
	if (!moduleResource || moduleResource.type !== 'module') {
		notFound()
	}

	const sections = await getSectionsByModuleId(moduleResource.id)

	const title = getLocalizedField<string>(
		{ fields: moduleResource.fields || {} },
		'title',
		lang,
		'Untitled Module',
	)

	const description = getLocalizedField<string>(
		{ fields: moduleResource.fields || {} },
		'description',
		lang,
		'',
	)

	return (
		<div className="container mx-auto py-8 px-4">
			{/* Module header card */}
			<Card className="mb-8">
				<CardHeader>
					<Badge variant="outline" className="w-fit mb-2">
						Module
					</Badge>
					<CardTitle className="text-3xl">{title}</CardTitle>
					{description && <CardDescription className="text-lg mt-2">{description}</CardDescription>}
				</CardHeader>
			</Card>

			<Separator className="my-8" />

			{/* Sections */}
			<div className="space-y-4">
				<h2 className="text-2xl font-semibold mb-6">Sections</h2>

				{sections.length === 0 ? (
					<Card>
						<CardContent className="p-6">
							<p className="text-gray-500">No sections available for this module yet.</p>
						</CardContent>
					</Card>
				) : (
					<div className="grid gap-4 md:grid-cols-2">
						{sections.map((section) => {
							const sectionTitle = getLocalizedField<string>(
								{ fields: section.fields || {} },
								'title',
								lang,
								'Untitled Section',
							)

							const sectionDescription = getLocalizedField<string>(
								{ fields: section.fields || {} },
								'description',
								lang,
								'',
							)

							return (
								<Card key={section.id} className="overflow-hidden transition-all hover:shadow-md">
									<CardHeader className="pb-3">
										<CardTitle className="text-xl">{sectionTitle}</CardTitle>
										{sectionDescription && (
											<CardDescription className="line-clamp-2">
												{sectionDescription}
											</CardDescription>
										)}
									</CardHeader>
									<CardFooter className="pt-3 border-t">
										<Link
											href={`/${lang}/${moduleSlug}/${section.id}`}
											className="text-blue-600 hover:text-blue-800 font-medium text-sm inline-flex items-center"
										>
											Begin Section
											<svg
												xmlns="http://www.w3.org/2000/svg"
												className="size-4 ml-1"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor"
												aria-hidden="true"
											>
												<title>Begin section</title>
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
				)}
			</div>
		</div>
	)
}
