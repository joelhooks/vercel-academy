'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function AcademyNavLinks() {
	const pathname = usePathname()
	return (
		<nav className="mx-6 hidden items-center gap-5 md:flex">
			<Link
				href="/"
				className={cn(
					'text-sm font-normal text-muted-foreground hover:text-foreground',
					pathname === '/' && 'text-foreground',
				)}
			>
				All Courses
			</Link>
			<Link
				href="/docs"
				className={cn(
					'text-sm font-normal text-muted-foreground hover:text-foreground',
					pathname === '/docs' && 'text-foreground',
				)}
			>
				Docs
			</Link>
		</nav>
	)
}

export function AcademyNavLinksSkeleton() {
	return (
		<nav className="mx-6 hidden items-center gap-5 md:flex">
			<div className="h-4 w-20 rounded-full bg-muted-foreground" />
			<div className="h-4 w-20 rounded-full bg-muted-foreground" />
		</nav>
	)
}
