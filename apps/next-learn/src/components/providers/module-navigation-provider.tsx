'use client'

import * as React from 'react'

// Define types for module navigation
export interface NavigationLesson {
	id: string
	slug: string
	title: string
	position: number
	type: 'lesson'
}

export interface NavigationSection {
	id: string
	slug: string
	title: string
	position: number
	type: 'section'
	lessons: NavigationLesson[]
}

export type NavigationResource = NavigationSection | NavigationLesson

interface ModuleNavigation {
	id: string
	slug: string
	title: string
	coverImage?: string | null
	resources: NavigationResource[]
	introduction?: {
		title: string
		description: string
	}
}

const ModuleNavigationContext = React.createContext<
	| (ModuleNavigation & {
			isSidebarCollapsed: boolean
			setIsSidebarCollapsed: (isSidebarCollapsed: boolean) => void
	  })
	| null
>(null)

export const ModuleNavigationProvider = ({
	children,
	moduleNavDataLoader,
}: {
	children: React.ReactNode
	moduleNavDataLoader: Promise<ModuleNavigation | null>
}) => {
	const moduleNavigation = React.use(moduleNavDataLoader)
	const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

	return (
		<ModuleNavigationContext.Provider
			value={
				moduleNavigation ? { ...moduleNavigation, isSidebarCollapsed, setIsSidebarCollapsed } : null
			}
		>
			{children}
		</ModuleNavigationContext.Provider>
	)
}

export const useModuleNavigation = () => {
	const context = React.useContext(ModuleNavigationContext)
	if (!context) {
		console.warn('No module navigation data available')
	}
	return context
}

// Helper function to find the section ID for a lesson slug
export function findSectionIdForLessonSlug(
	navigation: ModuleNavigation | null,
	lessonSlug?: string | null,
): string | null {
	if (!navigation || !lessonSlug) return null

	for (const resource of navigation.resources || []) {
		if (resource.type === 'section') {
			const lesson = resource.lessons.find((lesson) => lesson.slug === lessonSlug)
			if (lesson) {
				return resource.id
			}
		} else if (resource.slug === lessonSlug) {
			// If it's a top-level lesson, return null or a special identifier
			return null // or return 'top-level' if you prefer
		}
	}
	return navigation.resources[0]?.id || null // Lesson not found, return first section
}

// Helper function to get the first lesson slug
export function getFirstLessonSlug(navigation: ModuleNavigation | null) {
	if (!navigation) return null

	// Always consider the module root (Introduction) as the first entry
	// Return null/undefined to indicate it's the root page
	// Actual logic for finding resources comes next if needed

	const firstResource = navigation.resources[0]
	if (!firstResource) return null

	if (firstResource.type === 'section') {
		return firstResource.lessons[0]?.slug
	}

	return firstResource.slug
}

// Helper function to check if a path is the module root
export function isModuleRoot(navigation: ModuleNavigation | null, path: string): boolean {
	if (!navigation) return false

	// Check if the path matches pattern /{lang}/{moduleSlug} exactly
	const modulePathPattern = new RegExp(`/[^/]+/${navigation.slug}$`)
	return modulePathPattern.test(path)
}
