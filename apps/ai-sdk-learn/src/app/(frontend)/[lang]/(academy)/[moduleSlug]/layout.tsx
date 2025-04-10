import { type ReactNode } from 'react'
import { getContentResourceBySlug, getModuleNavigationData } from '@/server/content/resources'

import { notFound } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { getLocalizedContent } from '@/utils/localization'
import { AcademyNav } from '@/components/academy/academy-nav'
import { AcademySidebar } from '@/components/academy/sidebar/academy-sidebar'
import { moduleNavigationSchema } from '@/schemas/module-navigation'

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

	const moduleNavigation = moduleNavigationSchema.parse({
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
		<SidebarProvider>
			<div className="flex min-h-screen flex-col w-full">
				<AcademyNav />
				<div className="flex flex-1 overflow-hidden w-full">
					<div className="hidden md:block">
						<AcademySidebar
							course={moduleResource}
							moduleNavigation={moduleNavigation}
							lang={lang}
						/>
					</div>
					<div className="flex flex-col flex-1 w-full">
						<main className="flex-1 overflow-y-auto bg-background w-full">{children}</main>
					</div>
				</div>
			</div>

			<main className="h-screen max-h-screen overflow-hidden">
				<div className="w-full h-1 bg-red-500" />
			</main>
		</SidebarProvider>
	)
}
