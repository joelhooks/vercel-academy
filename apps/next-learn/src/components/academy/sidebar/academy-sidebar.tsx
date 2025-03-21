import { Info } from 'lucide-react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
	SidebarTrigger,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
	SidebarMenuButton,
} from '@/components/ui/sidebar'
import { ContentResource } from '@/schemas/content'
import { CourseNavigation } from './course-navigation'
import { NavUser, NavUserSkeleton } from './nav-user'
import { NavLink } from './nav-link'
import { Suspense } from 'react'
import { ModuleNavigation } from '@/schemas/module-navigation'

export function AcademySidebar({
	course,
	moduleNavigation,
	lang,
}: {
	course: ContentResource
	moduleNavigation: ModuleNavigation
	lang?: string
}) {
	return (
		<>
			<Sidebar collapsible="icon" className="h-[calc(100vh-56px)] mt-14">
				<SidebarHeader className="border-b bg-background/50 h-[65px] flex items-center justify-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
					{/* <CourseSwitcher course={course} brand={brand} /> */}
					<div className="flex text-left justify-start w-full px-3">{moduleNavigation.title}</div>
				</SidebarHeader>
				<SidebarContent>
					<CourseNavigation course={course} moduleNavigation={moduleNavigation} lang={lang} />
				</SidebarContent>
				<SidebarFooter className="border-t grid divide-y bg-background/50 group-has-[[data-collapsible=icon]]/sidebar-wrapper:divide-y-0">
					<Suspense fallback={<NavUserSkeleton />}>
						<NavUser />
					</Suspense>
					<div className="flex items-center justify-between pt-2">
						<div className="flex items-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:mx-auto">
							<SidebarTrigger />
							<p className="text-muted-foreground text-xs group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
								⌘B
							</p>
						</div>
						{/* <ThemeSwitcher className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden" /> */}
					</div>
				</SidebarFooter>
				<SidebarRail />
			</Sidebar>
			<SidebarTrigger className="fixed border bg-background bottom-4 left-4 sm:sr-only z-50" />
		</>
	)
}

export const AcademySidebarSkeleton = ({ course }: { course: ContentResource }) => {
	return (
		<Sidebar collapsible="icon" className="h-[calc(100vh-56px)] mt-14">
			<SidebarHeader className="border-b bg-background/50 h-[65px] flex items-center justify-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
				{/* <CourseSwitcher course={course} brand={brand} /> */}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Chapters</SidebarGroupLabel>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild>
								<NavLink href={`/${course.fields?.slug}`}>
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
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t grid divide-y bg-background/50 group-has-[[data-collapsible=icon]]/sidebar-wrapper:divide-y-0">
				<div className="h-[32px]"></div>
				<div className="flex items-center justify-between pt-2">
					<div className="flex items-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:mx-auto">
						<SidebarTrigger />
						<p className="text-muted-foreground text-xs group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
							⌘B
						</p>
					</div>
					{/* <ThemeSwitcher className="group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden" /> */}
				</div>
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
