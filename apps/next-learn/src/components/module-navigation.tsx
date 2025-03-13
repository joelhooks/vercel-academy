'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useModuleNavigation } from '@/components/providers/module-navigation-provider'
import { useModuleProgress } from '@/components/providers/module-progress-provider'
import { getLocalizedField } from '@/lib/content-resources'

export function ModuleNavigation({ lang }: { lang: string }) {
	const pathname = usePathname()
	const navigation = useModuleNavigation()
	const { moduleProgress } = useModuleProgress()

	if (!navigation) {
		return null
	}

	const { isSidebarCollapsed, setIsSidebarCollapsed, resources } = navigation

	// Get the module title
	const moduleTitle = getLocalizedField<string>(
		{ fields: { title: navigation.title } },
		'title',
		lang,
		'Module',
	)

	return (
		<aside
			className={`module-sidebar bg-white border-r transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
		>
			<div className="p-4 border-b flex justify-between items-center">
				{!isSidebarCollapsed && <h2 className="font-semibold text-lg truncate">{moduleTitle}</h2>}
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

			<nav className="p-2">
				{resources.map((resource) => {
					// Render resource based on its type
					return resource.type === 'lesson'
						? renderLesson(resource, navigation, moduleProgress, lang, pathname, isSidebarCollapsed)
						: renderSection(
								resource,
								navigation,
								moduleProgress,
								lang,
								pathname,
								isSidebarCollapsed,
							)
				})}
			</nav>
		</aside>
	)
}

// Helper function to render a lesson item
function renderLesson(
	resource: any,
	navigation: any,
	moduleProgress: any,
	lang: string,
	pathname: string,
	isSidebarCollapsed: boolean,
) {
	const title = getLocalizedField<string>(
		{ fields: { title: resource.title } },
		'title',
		lang,
		'Lesson',
	)

	const isComplete = moduleProgress?.completedLessons.some(
		(lesson: any) => lesson.resourceId === resource.id,
	)

	const href = `/${lang}/${navigation.slug}/${resource.slug}`
	const isActive = pathname === href

	return (
		<Link
			key={resource.id}
			href={href}
			className={`block px-3 py-2 rounded mb-1 ${
				isActive ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
			} ${isComplete ? 'text-green-600' : ''}`}
		>
			{!isSidebarCollapsed && (
				<span className="flex items-center">
					{isComplete ? '✓ ' : ''}
					{title}
				</span>
			)}
			{isSidebarCollapsed && <span className="flex justify-center">{isComplete ? '✓' : '•'}</span>}
		</Link>
	)
}

// Helper function to render a section with lessons
function renderSection(
	resource: any,
	navigation: any,
	moduleProgress: any,
	lang: string,
	pathname: string,
	isSidebarCollapsed: boolean,
) {
	const sectionTitle = getLocalizedField<string>(
		{ fields: { title: resource.title } },
		'title',
		lang,
		'Section',
	)

	return (
		<div key={resource.id} className="mb-3">
			{!isSidebarCollapsed && (
				<div className="px-3 py-1 text-sm font-medium text-gray-500 uppercase tracking-wider">
					{sectionTitle}
				</div>
			)}

			{resource.lessons.map((lesson: any) => {
				const lessonTitle = getLocalizedField<string>(
					{ fields: { title: lesson.title } },
					'title',
					lang,
					`Lesson ${lesson.position + 1}`,
				)

				const isComplete = moduleProgress?.completedLessons.some(
					(completed: any) => completed.resourceId === lesson.id,
				)

				const href = `/${lang}/${navigation.slug}/${resource.slug}/${lesson.slug}`
				const isActive = pathname === href

				return (
					<Link
						key={lesson.id}
						href={href}
						className={`block px-3 py-2 rounded mb-1 ${
							isActive ? 'bg-blue-100 text-blue-800' : 'hover:bg-gray-100'
						} ${isComplete ? 'text-green-600' : ''}`}
					>
						{!isSidebarCollapsed && (
							<span className="flex items-center">
								{isComplete ? '✓ ' : ''}
								{lessonTitle}
							</span>
						)}
						{isSidebarCollapsed && (
							<span className="flex justify-center">{isComplete ? '✓' : '•'}</span>
						)}
					</Link>
				)
			})}
		</div>
	)
}
