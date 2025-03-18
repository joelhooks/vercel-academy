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
import { Container, Section } from '@/components/layout'
import { SignInCtaSkeleton } from '@/components/sign-in-cta'
import { Suspense } from 'react'
import { SignInCta } from '@/components/sign-in-cta'
import { CourseCardSkeleton } from '@/components/academy/courses/course-card'
import { CourseCard } from '@/components/academy/courses/course-card'

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
						<p>Academy</p>
					</div>
					<h1 className="sr-only">Welcome to Vercel University</h1>
					<p className="max-w-prose">
						Go from beginner to expert by learning the foundations of Vercel and Next.js and
						building a fully functional demo website that uses all the latest features.
					</p>
				</Container>
			</Section>

			<Section>
				<Container className="gap-4 flex flex-col md:grid md:grid-cols-2">
					<Suspense fallback={<SignInCtaSkeleton />}>
						<SignInCta />
					</Suspense>
					{modules.map((module) => (
						<Suspense key={module.id} fallback={<CourseCardSkeleton />}>
							<CourseCard module={module} lang={lang} />
						</Suspense>
					))}
				</Container>
			</Section>
		</main>
	)
}
