import { type ReactNode, Suspense } from 'react'
import { getContentResourceBySlug, getModuleNavigationData } from '@/server/content/resources'
import { ModuleProgressProvider } from '@/components/providers/module-progress-provider'
import { ModuleNavigationProvider } from '@/components/providers/module-navigation-provider'
import { ModuleNavigation } from '@/components/module-navigation'
import { auth } from '@/auth'
import { getProgressForModule } from '@/server/progress/user-progress'
import { notFound } from 'next/navigation'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'

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

		// Use the new function to get complete navigation data (standalone lessons + sections)
		const navigationData = await getModuleNavigationData(moduleResource.id)
		console.log(
			`ModuleLayout: Retrieved navigation data with ${navigationData.resources.length} resources`,
		)

		// Get user progress for this module if logged in
		const moduleProgressLoader = userId
			? getProgressForModule(userId, moduleResource.id)
			: Promise.resolve(null)

		// Use the navigation data from our new function
		const moduleNavigationLoader = Promise.resolve({
			id: moduleResource.id,
			slug: moduleSlug,
			title:
				typeof moduleResource.fields?.title === 'string'
					? { en: moduleResource.fields.title }
					: (moduleResource.fields?.title as Record<string, string>) || {
							en: `Module ${moduleResource.id}`,
						},
			resources: navigationData.resources,
		})

		return (
			<SidebarProvider>
				<ModuleNavigationProvider moduleNavDataLoader={moduleNavigationLoader}>
					<ModuleProgressProvider moduleProgressLoader={moduleProgressLoader}>
						{/* Sidebar navigation */}
						<ModuleNavigation lang={lang} />

						{/* Main content */}
						<SidebarInset className="p-6 max-w-5xl mx-auto">
							<Suspense fallback={<div>Loading module content...</div>}>{children}</Suspense>
						</SidebarInset>
					</ModuleProgressProvider>
				</ModuleNavigationProvider>
			</SidebarProvider>
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
