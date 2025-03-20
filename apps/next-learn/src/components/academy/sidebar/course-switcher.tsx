'use client'

import * as React from 'react'

import { BrandLogo } from '@/components/university/brands/brand-logo'
import { ChevronsUpDown } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

import type { Brand, Course } from '@/payload-types'

export function CourseSwitcher({ course, brand }: { course: Course; brand: Brand }) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-full"
              aria-label={`Switch course. Current course: ${course.title}`}
            >
              <BrandLogo
                className="size-8 group-has-[[data-collapsible=icon]]/sidebar-wrapper:my-auto"
                brand={brand}
              />
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{course.title}</span>
                <span className="truncate text-xs text-muted-foreground">{brand.name}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" aria-hidden="true" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Available Courses
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
