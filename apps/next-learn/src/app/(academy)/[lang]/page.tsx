import { getModules } from '@/server/content/resources'
import { getLocalizedContent } from '@/utils/localization'
import Link from 'next/link'

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

interface HomePageProps {
	params: {
		lang: string
	}
}

export default async function HomePage({ params }: HomePageProps) {
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang } = resolvedParams

	const modules = await getModules()

	return (
		<div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-background/90">
			<div className="container max-w-6xl mx-auto py-12 px-4">
				<Card className="mb-12 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-xl overflow-hidden relative">
					<div className="absolute inset-0 bg-white/40 backdrop-blur-sm z-0" />
					<div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-200 rounded-full blur-3xl opacity-50" />
					<div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" />
					<CardHeader className="relative z-10">
						<CardTitle className="text-4xl font-bold text-blue-900">
							Welcome to the Academy
						</CardTitle>
						<CardDescription className="text-xl text-blue-700 mt-2">
							Browse our educational content and start learning today.
						</CardDescription>
					</CardHeader>
				</Card>

				<div className="flex items-center justify-between mb-8">
					<h2 className="text-2xl font-semibold flex items-center">
						<Badge variant="secondary" className="mr-2">
							New
						</Badge>
						Available Modules
					</h2>
				</div>

				<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
					{modules.map((module) => {
						const title = getLocalizedContent<string>({
							resource: {
								id: module.id,
								type: module.type,
								fields: module.fields || {},
							},
							field: 'title',
							lang: lang,
							defaultValue: `Module ${module.id}`,
						})

						const description = getLocalizedContent<string>({
							resource: {
								id: module.id,
								type: module.type,
								fields: module.fields || {},
							},
							field: 'description',
							lang: lang,
							defaultValue: '',
						})

						// Get module slug from fields, fallback to ID if not available
						const moduleSlug = getLocalizedContent<string>({
							resource: {
								id: module.id,
								type: module.type,
								fields: module.fields || {},
							},
							field: 'slug',
							lang: lang,
							defaultValue: module.id,
						})

						return (
							<Card
								key={module.id}
								className="overflow-hidden transition-all hover:shadow-md border border-border/50 group"
							>
								<CardHeader className="pb-3 bg-muted/30">
									<Badge variant="outline" className="w-fit mb-2 bg-background/50 backdrop-blur-sm">
										Module
									</Badge>
									<CardTitle className="text-xl">{title}</CardTitle>
									{description && (
										<CardDescription className="line-clamp-2">{description}</CardDescription>
									)}
								</CardHeader>
								<CardContent className="p-4 pt-6">
									<div className="h-2 w-full bg-muted rounded-full mb-2">
										<div className="h-2 bg-blue-500 rounded-full w-1/4" />
									</div>
									<p className="text-sm text-muted-foreground">Module progress: 25% completed</p>
								</CardContent>
								<CardFooter className="pt-3 border-t bg-card">
									<Link
										href={`/${lang}/${moduleSlug}`}
										className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center group-hover:underline transition-all"
									>
										Start learning
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="size-4 ml-1 transition-transform group-hover:translate-x-1"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											aria-hidden="true"
										>
											<title>Start learning</title>
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
		</div>
	)
}
