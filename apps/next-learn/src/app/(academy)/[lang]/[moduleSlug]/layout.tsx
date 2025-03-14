import { ReactNode, Suspense } from 'react'
import {
	getContentResourceBySlug,
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
	try {
		// Await params to resolve before destructuring
		const resolvedParams = await Promise.resolve(params)
		const { lang, moduleSlug } = resolvedParams

		console.log(`ModuleLayout: Fetching module with slug "${moduleSlug}"`)

		// Get the module resource by slug instead of ID
		const moduleResource = await getContentResourceBySlug(moduleSlug)

		console.log(
			`ModuleLayout: Fetch result:`,
			moduleResource ? { id: moduleResource.id, type: moduleResource.type } : 'NULL (Not Found)',
		)

		if (!moduleResource || moduleResource.type !== 'module') {
			console.log(
				`ModuleLayout: Module not found or invalid type. Found: ${moduleResource?.type || 'null'}`,
			)
			return notFound()
		}

		// Get user session
		const session = await auth()
		const userId = session?.user?.id

		// Get module navigation data
		const sections = await getSectionsByModuleId(moduleResource.id)
		console.log(`ModuleLayout: Found ${sections.length} sections for module ${moduleResource.id}`)

		// Prepare module sections with lessons
		const sectionPromises = sections.map(async (section) => {
			const lessons = await getLessonsBySectionId(section.id)
			return {
				id: section.id,
				slug: section.fields?.slug || section.id, // Use slug from fields if available
				title: section.fields?.title || { en: `Section ${section.id}` },
				type: 'section' as const,
				position: 0, // You may need to add position to your schema
				lessons: lessons.map((lesson, index) => ({
					id: lesson.id,
					slug: lesson.fields?.slug || lesson.id, // Use slug from fields if available
					title: lesson.fields?.title || { en: `Lesson ${index + 1}` },
					type: 'lesson' as const,
					position: index,
				})),
			}
		})

		const sectionWithLessons = await Promise.all(sectionPromises)

		// Get user progress for this module if logged in
		const moduleProgressLoader = userId
			? getProgressForModule(userId, moduleResource.id) // Use module.id, not moduleSlug
			: Promise.resolve(null)

		// Prepare navigation data with sections and lessons
		const moduleNavigationLoader = Promise.resolve({
			id: moduleResource.id,
			slug: moduleSlug,
			title: moduleResource.fields?.title || { en: `Module ${moduleResource.id}` },
			resources: sectionWithLessons,
		})

		console.log(`ModuleLayout: About to render component`)

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
	} catch (error) {
		console.error('ModuleLayout: Error rendering module layout:', error)
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
