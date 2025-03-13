import { ReactNode, Suspense } from 'react'
import {
	getContentResourceById,
	getLessonsBySectionId,
	getSectionsByModuleId,
} from '@/lib/content-resources'
import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { ModuleNavigationProvider } from '@/components/providers/module-navigation-provider'
import { ModuleNavigation } from '@/components/module-navigation'
import { auth } from '@/auth'
import { getProgressForModule } from '@/lib/resource-progress'
import { notFound } from 'next/navigation'

interface ModuleLayoutProps {
	children: ReactNode
	params: {
		lang: string
		moduleSlug: string
	}
}

export default async function ModuleLayout({ children, params }: ModuleLayoutProps) {
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang, moduleSlug } = resolvedParams

	// Get the module resource
	const moduleResource = await getContentResourceById(moduleSlug)
	if (!moduleResource || moduleResource.type !== 'module') {
		notFound()
	}

	// Get user session
	const session = await auth()
	const userId = session?.user?.id

	// Get module navigation data
	const sections = await getSectionsByModuleId(moduleResource.id)

	// Prepare module sections with lessons
	const sectionPromises = sections.map(async (section) => {
		const lessons = await getLessonsBySectionId(section.id)
		return {
			id: section.id,
			slug: section.id,
			title: section.fields?.title || { en: `Section ${section.id}` },
			type: 'section' as const,
			position: 0, // You may need to add position to your schema
			lessons: lessons.map((lesson, index) => ({
				id: lesson.id,
				slug: lesson.id,
				title: lesson.fields?.title || { en: `Lesson ${index + 1}` },
				type: 'lesson' as const,
				position: index,
			})),
		}
	})

	const sectionWithLessons = await Promise.all(sectionPromises)

	// Get user progress for this module if logged in
	const moduleProgressLoader = userId
		? getProgressForModule(userId, moduleSlug)
		: Promise.resolve(null)

	// Prepare navigation data with sections and lessons
	const moduleNavigationLoader = Promise.resolve({
		id: moduleResource.id,
		slug: moduleSlug,
		title: moduleResource.fields?.title || { en: `Module ${moduleSlug}` },
		resources: sectionWithLessons,
	})

	return (
		<div className="flex min-h-screen">
			<ModuleNavigationProvider moduleNavDataLoader={moduleNavigationLoader}>
				<ModuleProgressProvider moduleProgressLoader={moduleProgressLoader}>
					{/* Sidebar navigation */}
					<ModuleNavigation lang={lang} />

					{/* Main content */}
					<main className="flex-1 p-6 max-w-5xl mx-auto">
						<Suspense fallback={<div>Loading module content...</div>}>{children}</Suspense>
					</main>
				</ModuleProgressProvider>
			</ModuleNavigationProvider>
		</div>
	)
}
