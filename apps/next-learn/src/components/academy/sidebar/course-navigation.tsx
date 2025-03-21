'use client'

import { defaultLocale } from '@/config/locales'
import { useParams } from 'next/navigation'
import { ChevronRight, Info, Trophy } from 'lucide-react'

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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ModuleNavigation } from '@/schemas/module-navigation'

export function CourseNavigation({
	moduleNavigation,
	lang,
	course,
}: {
	moduleNavigation: ModuleNavigation
	lang?: string
	course: ContentResource
}) {
	// const progress = await getProgressForCourse(course.id)

	const totalChapters =
		moduleNavigation?.resources?.reduce((total, resource) => {
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
				<ChapterList lang={lang} navigation={moduleNavigation} />
				{isFullyCompleted && <CompletionLink course={course} lang={lang} />}
			</SidebarMenu>
		</SidebarGroup>
	)
}

function IntroductionLink({ course, lang }: { course: ContentResource; lang?: string }) {
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''
	const params = useParams()
	const isActive = !params.lessonSlug

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={isActive}>
				<NavLink href={`${langPrefix}/${course.fields?.slug}`} isActive={isActive}>
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

function ChapterList({ lang, navigation }: { lang?: string; navigation: ModuleNavigation }) {
	const params = useParams()
	const currentLessonSlug = params.lessonSlug as string | undefined
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
					const isCurrentLesson = resource.slug === currentLessonSlug
					return (
						<SidebarMenuItem key={resource.id}>
							<SidebarMenuButton asChild isActive={isCurrentLesson}>
								<NavLink
									href={`${langPrefix}/${navigation.slug}/${resource.slug}`}
									isActive={isCurrentLesson}
								>
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
					// Check if any lesson in this section is currently active
					const isCurrentSection = resource.lessons.some(
						(lesson) => lesson.slug === currentLessonSlug,
					)

					// Handle sections with nested lessons
					return (
						<SidebarMenuItem key={resource.id}>
							<Collapsible defaultOpen={isCurrentSection} className="group/collapsible w-full">
								<CollapsibleTrigger asChild>
									<button className="flex w-full min-h-[32px] items-center justify-between gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring">
										<span className="text-left line-clamp-2 text-xs uppercase tracking-wide">
											{resource.title}
										</span>
										<ChevronRight className="h-3.5 w-3.5 shrink-0 opacity-50 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
									</button>
								</CollapsibleTrigger>
								<CollapsibleContent>
									<div className="pl-3 pb-1 pt-1">
										<SidebarMenu>
											{resource.lessons.map((lesson) => {
												const currentIndex = ++lessonIndex
												const isCurrentLesson = lesson.slug === currentLessonSlug
												return (
													<SidebarMenuItem key={lesson.id}>
														<SidebarMenuButton asChild isActive={isCurrentLesson}>
															<NavLink
																href={`${langPrefix}/${navigation.slug}/${lesson.slug}`}
																isActive={isCurrentLesson}
															>
																<div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
																	<span>{lesson.title}</span>
																	<StatusIndicator isComplete={false} />
																</div>
																<div
																	className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full"
																	title={lesson.title}
																>
																	<span className="text-xs text-muted-foreground">
																		{currentIndex}
																	</span>
																</div>
															</NavLink>
														</SidebarMenuButton>
													</SidebarMenuItem>
												)
											})}
										</SidebarMenu>
									</div>
								</CollapsibleContent>
							</Collapsible>
						</SidebarMenuItem>
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
