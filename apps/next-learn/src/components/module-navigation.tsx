'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModuleNavigation } from '@/components/providers/module-navigation-provider'
import { useModuleProgress } from '@/components/providers/module-progress-provider'
import { getLocalizedContent } from '@/utils/localization'
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
	SidebarMenuSub,
	SidebarMenuSubButton,
} from '@/components/ui/sidebar'

// Import the types we need
interface NavigationLesson {
	id: string
	slug: string
	title: Record<string, string>
	position: number
	type: 'lesson'
}

interface NavigationSection {
	id: string
	slug: string
	title: Record<string, string>
	position: number
	type: 'section'
	lessons: NavigationLesson[]
}

type NavigationResource = NavigationSection | NavigationLesson

interface ModuleNavigation {
	id: string
	slug: string
	title: Record<string, string>
	coverImage?: string | null
	resources: NavigationResource[]
	isSidebarCollapsed: boolean
	setIsSidebarCollapsed: (collapsed: boolean) => void
}

interface CompletedLesson {
	resourceId: string
	completedAt: Date
	userId: string
}

interface ModuleProgress {
	completedLessons: CompletedLesson[]
	nextResource: string | null
	percentCompleted: number
	completedLessonsCount: number
	totalLessonsCount: number
}

export function ModuleNavigation({ lang }: { lang: string }) {
	const pathname = usePathname()
	const navigation = useModuleNavigation()
	const { moduleProgress } = useModuleProgress()

	if (!navigation) {
		return null
	}

	const { isSidebarCollapsed, setIsSidebarCollapsed, resources } = navigation

	// Get the module title
	const moduleTitle = getLocalizedContent<string>({
		resource: {
			id: '',
			type: 'module',
			fields: { title: navigation.title },
		},
		field: 'title',
		lang: lang,
		defaultValue: 'Module',
	})

	return (
		<Sidebar className="bg-white border-r" collapsible={isSidebarCollapsed ? 'icon' : 'offcanvas'}>
			<SidebarHeader className="border-b">
				<div className="flex justify-between items-center px-2">
					<h2 className="font-semibold text-lg truncate">{moduleTitle}</h2>
					<button
						onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
						className="p-1 rounded-full hover:bg-gray-100"
						aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
						type="button"
					>
						{isSidebarCollapsed ? (
							<span className="text-xl">→</span>
						) : (
							<span className="text-xl">←</span>
						)}
					</button>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarMenu>
					{resources.map((resource) => {
						if (resource.type === 'lesson') {
							return renderLesson(resource, navigation, moduleProgress, lang, pathname)
						}

						return renderSection(
							resource as NavigationSection,
							navigation,
							moduleProgress,
							lang,
							pathname,
						)
					})}
				</SidebarMenu>
			</SidebarContent>
		</Sidebar>
	)
}

// Helper function to render a lesson item
function renderLesson(
	resource: NavigationLesson,
	navigation: ModuleNavigation,
	moduleProgress: ModuleProgress | null,
	lang: string,
	pathname: string,
) {
	// Ensure title is properly formatted for getLocalizedContent
	const titleForLocalization =
		typeof resource.title === 'string' ? { en: resource.title } : resource.title

	const title = getLocalizedContent<string>({
		resource: {
			id: resource.id,
			type: resource.type,
			fields: { title: titleForLocalization },
		},
		field: 'title',
		lang: lang,
		defaultValue: 'Lesson',
	})

	const isComplete = moduleProgress?.completedLessons.some(
		(lesson) => lesson.resourceId === resource.id,
	)

	// Use the new URL structure without section slug
	const href = `/${lang}/${navigation.slug}/${resource.slug}`
	const isActive = pathname === href

	return (
		<SidebarMenuItem key={resource.id}>
			<SidebarMenuButton asChild isActive={isActive} tooltip={title}>
				<Link href={href}>
					<span className={`flex items-center ${isComplete ? 'text-green-600' : ''}`}>
						{isComplete ? '✓ ' : ''}
						{title}
					</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

// Helper function to render a section with lessons
function renderSection(
	resource: NavigationSection,
	navigation: ModuleNavigation,
	moduleProgress: ModuleProgress | null,
	lang: string,
	pathname: string,
) {
	// Ensure title is properly formatted for getLocalizedContent
	const titleForLocalization =
		typeof resource.title === 'string' ? { en: resource.title } : resource.title

	const sectionTitle = getLocalizedContent<string>({
		resource: {
			id: resource.id,
			type: resource.type,
			fields: { title: titleForLocalization },
		},
		field: 'title',
		lang: lang,
		defaultValue: 'Section',
	})

	return (
		<SidebarMenuItem key={resource.id} className="mb-3">
			<div className="px-3 py-1 text-sm font-medium text-gray-500 uppercase tracking-wider">
				{sectionTitle}
			</div>

			<SidebarMenuSub>
				{(resource.lessons || []).map((lesson) => {
					const lessonTitle = getLocalizedContent<string>({
						resource: {
							id: lesson.id,
							type: lesson.type,
							fields: { title: lesson.title },
						},
						field: 'title',
						lang: lang,
						defaultValue: `Lesson ${lesson.position + 1}`,
					})

					const isComplete = moduleProgress?.completedLessons.some(
						(completed) => completed.resourceId === lesson.id,
					)

					// Use the new URL structure without section slug
					const href = `/${lang}/${navigation.slug}/${lesson.slug}`
					const isActive = pathname === href

					return (
						<SidebarMenuItem key={lesson.id}>
							<SidebarMenuSubButton asChild isActive={isActive}>
								<Link href={href}>
									<span className={`flex items-center ${isComplete ? 'text-green-600' : ''}`}>
										{isComplete ? '✓ ' : ''}
										{lessonTitle}
									</span>
								</Link>
							</SidebarMenuSubButton>
						</SidebarMenuItem>
					)
				})}
			</SidebarMenuSub>
		</SidebarMenuItem>
	)
}
