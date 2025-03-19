import { type ReactNode } from 'react'
import { getContentResourceBySlug, getModuleNavigationData } from '@/server/content/resources'
import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { ModuleNavigationProvider } from '@/components/providers/module-navigation-provider'
import { auth } from '@/auth'
import { getProgressForModule } from '@/server/progress/user-progress'
import { notFound } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { resolveParams } from '@/utils/localization'
import { getLocalizedContent } from '@/utils/localization'
import { AcademyNav } from '@/components/academy/academy-nav'

interface ModuleLayoutProps {
	children: ReactNode
	params: {
		lang: string
		moduleSlug: string
	}
}

/**
 * Server component layout that sets up navigation and module progress context.
 * It fetches all necessary data on the server and passes it to client components.
 */
export default async function ModuleLayout({ children, params }: ModuleLayoutProps) {
	try {
		// Properly resolve the params using the provided utility function
		const resolvedParams = await resolveParams(params)
		const { lang, moduleSlug } = resolvedParams

		// Get the module resource by slug
		const moduleResource = await getContentResourceBySlug(moduleSlug)

		if (!moduleResource || moduleResource.type !== 'module') {
			return notFound()
		}

		// Get user session
		const session = await auth()
		const userId = session?.user?.id

		// Use the function to get complete navigation data
		const navigationData = await getModuleNavigationData(moduleResource.id)

		// Get user progress for this module if logged in
		const moduleProgressLoader = userId
			? getProgressForModule(userId, moduleResource.id)
			: Promise.resolve(null)

		// Use the navigation data
		const moduleNavigationLoader = Promise.resolve({
			id: moduleResource.id,
			slug: moduleSlug,
			title: getLocalizedContent({
				resource: moduleResource,
				field: 'title',
				lang,
				defaultValue: `Module ${moduleResource.id}`,
			}),
			resources: navigationData.resources,
			// Include any introduction specific content
			introduction: {
				title: getLocalizedContent({
					resource: moduleResource,
					field: 'title',
					lang,
					defaultValue: 'Introduction',
				}),
				description: getLocalizedContent({
					resource: moduleResource,
					field: 'description',
					lang,
					defaultValue: '',
				}),
			},
		})

		return (
			<main className="h-screen max-h-screen overflow-hidden">
				<AcademyNav />
				<SidebarProvider className="h-[calc(100vh-56px)]">
					<ModuleNavigationProvider moduleNavDataLoader={moduleNavigationLoader}>
						<ModuleProgressProvider moduleProgressLoader={moduleProgressLoader}>
							{children}
						</ModuleProgressProvider>
					</ModuleNavigationProvider>
				</SidebarProvider>
			</main>
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
