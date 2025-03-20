import { type ReactNode } from 'react'
import { getContentResourceBySlug, getModuleNavigationData } from '@/server/content/resources'
import { ModuleNavigationProvider } from '@/components/providers/module-navigation-provider'
import { notFound } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
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
	// Properly resolve the params using the provided utility function
	const { lang, moduleSlug } = await params

	// Get the module resource by slug
	const moduleResource = await getContentResourceBySlug(moduleSlug)

	if (!moduleResource || moduleResource.type !== 'module') {
		return notFound()
	}

	// Use the function to get complete navigation data
	const navigationData = await getModuleNavigationData(moduleResource.id)

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
					{children}
				</ModuleNavigationProvider>
			</SidebarProvider>
		</main>
	)
}
