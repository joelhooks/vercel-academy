import { getModules } from '@/server/content/resources'

// Import shadcn UI components
import { Container, Section } from '@/components/layout'
import { SignInCta } from '@/components/sign-in-cta'
import { CourseCard } from '@/components/academy/courses/course-card'

interface HomePageProps {
	params: Promise<{
		lang: string
	}>
}

export default async function HomePage({ params }: HomePageProps) {
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang } = resolvedParams

	// get modules uses `use cache`
	const modules = await getModules()

	// previously the login and module cards below where wrapped in Suspense
	// but they aren't dynamic and server rendering prevents any loading jank
	// so we're just going to render them directly

	return (
		<main>
			<Section className="!bg-grid border-b bg-accent/30">
				<Container className="space-y-4 relative">
					<div className="flex items-baseline gap-2 text-5xl tracking-tight font-semibold ds spaced">
						<svg
							className="-mb-1"
							width="40"
							height="35"
							viewBox="0 0 1155 1000"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							aria-label="Logo"
							role="img"
						>
							<path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
						</svg>
						<p>Vercel Academy</p>
					</div>
					<h1 className="sr-only">Welcome to Vercel Academy</h1>
					<p className="max-w-prose">
						Go from beginner to expert by learning the foundations of Vercel and Next.js and
						building a fully functional demo website that uses all the latest features.
					</p>
				</Container>
			</Section>

			<Section>
				<Container className="gap-4 flex flex-col md:grid md:grid-cols-2">
					<SignInCta />
					{modules.map((module) => (
						<CourseCard key={module.id} module={module} lang={lang} />
					))}
				</Container>
			</Section>
		</main>
	)
}
