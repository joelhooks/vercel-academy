'use client'

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
import { NavUser } from './nav-user'
import { NavLink } from './nav-link'
import { useModuleNavigation } from '@/components/providers/module-navigation-provider'
import { useSession } from 'next-auth/react'

export function AcademySidebar({ course, lang }: { course: ContentResource; lang?: string }) {
	const navigation = useModuleNavigation()
	const { data: session, status } = useSession()

	const user = session?.user

	if (!navigation || status === 'loading') {
		return <AcademySidebarSkeleton course={course} />
	}

	return (
		<>
			<Sidebar collapsible="icon" className="h-[calc(100vh-56px)] mt-14">
				<SidebarHeader className="border-b bg-background/50 h-[65px] flex items-center justify-center group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
					{/* <CourseSwitcher course={course} brand={brand} /> */}
					<div className="flex text-left justify-start w-full px-3">{navigation.title}</div>
				</SidebarHeader>
				<SidebarContent>
					<CourseNavigation course={course} lang={lang} />
				</SidebarContent>
				<SidebarFooter className="border-t grid divide-y bg-background/50 group-has-[[data-collapsible=icon]]/sidebar-wrapper:divide-y-0">
					<NavUser user={user} />
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
						{/* {course?.chapters?.map((chapterRef, index) => {
              const chapter = chapterRef.chapter as Chapter
              return (
                <SidebarMenuItem key={chapter.id}>
                  <SidebarMenuButton asChild>
                    <NavLink href={`/${course.fields?.slug}/${chapter.fields?.slug}`}>
                      <div className="group-data-[collapsible=icon]:hidden inline-flex justify-between items-center w-full">
                        <span>{chapter.title}</span>
                        <StatusIndicator isComplete={false} />
                      </div>
                      <div className="hidden group-data-[collapsible=icon]:flex items-center justify-center w-full">
                        <span className="text-xs text-muted-foreground">{index + 1}</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })} */}
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
