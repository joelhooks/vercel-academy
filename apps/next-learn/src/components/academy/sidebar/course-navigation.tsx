'use client'

import { defaultLocale } from '@/config/locales'

import { Info, Trophy } from 'lucide-react'

import {
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
} from '@/components/ui/sidebar'
import { NavLink } from './nav-link'
import { StatusIndicator } from './nav-status-indicator'
import { ContentResource } from '@/schemas/content'
import { useModuleNavigation } from '@/components/providers/module-navigation-provider'

export function CourseNavigation({ course, lang }: { course: ContentResource; lang?: string }) {
	const navigation = useModuleNavigation()

	// const progress = await getProgressForCourse(course.id)

	const totalChapters =
		navigation?.resources?.reduce((total, resource) => {
			if (resource.type === 'lesson') {
				return total + 1
			}
			if (resource.type === 'section' && Array.isArray(resource.lessons)) {
				return total + resource.lessons.length
			}
			return total
		}, 0) || 0

	const completedChapters = 0
	// progress?.filter((p) => {
	// 	const progressChapterId = typeof p.chapter === 'number' ? p.chapter : p.chapter?.id
	// 	return course.chapters?.some((chapterRef) => {
	// 		const chapter = chapterRef.chapter as Chapter
	// 		return chapter.id === progressChapterId
	// 	})
	// }).length || 0

	const isFullyCompleted = totalChapters > 0 && completedChapters >= totalChapters

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Chapters</SidebarGroupLabel>
			<SidebarMenu>
				<IntroductionLink course={course} lang={lang} />
				<ChapterList lang={lang} />
				{isFullyCompleted && <CompletionLink course={course} lang={lang} />}
			</SidebarMenu>
		</SidebarGroup>
	)
}

function IntroductionLink({ course, lang }: { course: ContentResource; lang?: string }) {
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild>
				<NavLink href={`${langPrefix}/${course.fields?.slug}`}>
					<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
						<span>Introduction</span>
						<Info size={12} className="text-muted-foreground" />
					</div>
					<div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
						<Info size={12} className="text-muted-foreground" />
					</div>
				</NavLink>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}

function ChapterList({ lang }: { lang?: string }) {
	const navigation = useModuleNavigation()
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''

	if (!navigation?.resources) {
		return null
	}

	let lessonIndex = 0

	return (
		<>
			{navigation.resources.map((resource) => {
				if (resource.type === 'lesson') {
					// Handle top-level lessons
					const currentIndex = ++lessonIndex
					return (
						<SidebarMenuItem key={resource.id}>
							<SidebarMenuButton asChild>
								<NavLink href={`${langPrefix}/${navigation.slug}/${resource.slug}`}>
									<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
										<span>{resource.title}</span>
										<StatusIndicator isComplete={false} />
									</div>
									<div
										className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
										title={resource.title}
									>
										<span className="text-xs text-muted-foreground">{currentIndex}</span>
									</div>
								</NavLink>
							</SidebarMenuButton>
						</SidebarMenuItem>
					)
				}

				if (resource.type === 'section' && Array.isArray(resource.lessons)) {
					// Handle sections with nested lessons
					return (
						<div key={resource.id} className="space-y-1">
							<SidebarMenuItem>
								<div className="py-2">
									<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
										<h4 className="text-md font-medium text-muted-foreground">{resource.title}</h4>
									</div>
									<div
										className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
										title={resource.title}
									>
										<div className="h-px w-4 bg-border" />
									</div>
								</div>
							</SidebarMenuItem>
							{resource.lessons.map((lesson) => {
								const currentIndex = ++lessonIndex
								return (
									<SidebarMenuItem key={lesson.id}>
										<SidebarMenuButton asChild>
											<NavLink href={`${langPrefix}/${navigation.slug}/${lesson.slug}`}>
												<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
													<span>{lesson.title}</span>
													<StatusIndicator isComplete={false} />
												</div>
												<div
													className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
													title={lesson.title}
												>
													<span className="text-xs text-muted-foreground">{currentIndex}</span>
												</div>
											</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</div>
					)
				}

				return null
			})}
		</>
	)
}

function CompletionLink({ course, lang }: { course: ContentResource; lang?: string }) {
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild>
				<NavLink href={`${langPrefix}/${course.fields?.slug}/completion`}>
					<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
						<span>Completion</span>
						<Trophy size={12} className="text-muted-foreground" />
					</div>
					<div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
						<Trophy size={12} className="text-muted-foreground" />
					</div>
				</NavLink>
			</SidebarMenuButton>
		</SidebarMenuItem>
	)
}
