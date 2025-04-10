import { getModules } from '@/server/content/resources'

// Import shadcn UI components
import { Container, Section } from '@/components/layout'
import { SignInCta } from '@/components/auth/sign-in-cta'
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
