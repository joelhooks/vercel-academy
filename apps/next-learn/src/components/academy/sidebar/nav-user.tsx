'use client'

import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from '@/components/ui/sidebar'

import { SignInButton } from '@/components/auth/sign-in-button'
import { User } from 'next-auth'

export function NavUser({ user }: { user?: User | null }) {
	const { isMobile } = useSidebar()

	if (!user) {
		return (
			<SidebarMenu>
				<SidebarMenuItem>
					<SignInButton className="w-full" />
				</SidebarMenuItem>
			</SidebarMenu>
		)
	}

	return (
		<SidebarMenu>
			<SidebarMenuItem className="px-0">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<SidebarMenuButton className="w-full justify-between px-3">
							<span className="flex items-center gap-2">
								<Avatar className="h-6 w-6">
									{user.image ? (
										<img
											src={user.image}
											alt={user.name ?? 'User avatar'}
											className="h-full w-full rounded-full object-cover"
										/>
									) : (
										<AvatarFallback>{user.name?.[0]?.toUpperCase() ?? 'U'}</AvatarFallback>
									)}
								</Avatar>
								{!isMobile && (
									<span className="line-clamp-1 flex-1 text-left">{user.name ?? user.email}</span>
								)}
							</span>
							{!isMobile && <ChevronsUpDown className="h-4 w-4 shrink-0" />}
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="start" className="w-[180px]">
						<DropdownMenuLabel>
							Signed in as <span className="line-clamp-1 break-all font-normal">{user.email}</span>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem disabled>
								<BadgeCheck className="mr-2 h-4 w-4" />
								Achievements
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOut className="mr-2 h-4 w-4" />
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
export const NavUserSkeleton = () => {
	return (
		<SidebarMenu>
			<SidebarMenuItem>
				<div className="h-9 w-full animate-pulse rounded-md bg-muted" />
			</SidebarMenuItem>
		</SidebarMenu>
	)
}
