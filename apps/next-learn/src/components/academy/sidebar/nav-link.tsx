'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'

interface NavLinkProps {
	href: string
	children: React.ReactNode
	prefetch?: boolean
	className?: string
	isActive?: boolean
}

export function NavLink({ href, children, className, isActive = false }: NavLinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				'flex items-center justify-between gap-2 w-full relative transition-colors duration-200',
				isActive && 'bg-sidebar-accent text-sidebar-accent-foreground font-medium',
				className,
			)}
			prefetch={true}
		>
			{children}
		</Link>
	)
}
