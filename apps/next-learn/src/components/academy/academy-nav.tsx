'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Link from 'next/link'
import { MobileSidebar } from '../site/mobile-sidebar'
import { AcademyNavLinks } from './academy-nav-links'

export function AcademyNav() {
	return (
		<header className="h-14 w-full border-b bg-background px-4 md:px-5">
			<div className="mx-auto">
				<div className="flex h-14 items-center">
					<Link href="/" className="flex items-center gap-3 font-bold">
						<div className="flex items-center gap-1 text-lg tracking-tight">
							<svg
								className="-mt-px"
								width="20"
								height="17.5"
								viewBox="0 0 1155 1000"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								aria-label="Logo"
								role="img"
							>
								<path d="M577.344 0L1154.69 1000H0L577.344 0Z" fill="currentColor" />
							</svg>
							<p>Vercel Academy</p>
						</div>
					</Link>

					<AcademyNavLinks />

					<div className="ml-auto flex items-center gap-2">
						<div className="relative hidden w-[250px] max-w-sm md:block">
							<Input
								type="search"
								placeholder="Search documentation..."
								className="w-full h-8 border-none bg-muted pl-3 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
							/>
							<kbd className="pointer-events-none absolute right-1 top-[5px] hidden h-6 select-none items-center gap-1 rounded-[6px] border bg-background px-1.5 font-mono text-[13px] font-medium opacity-100 sm:flex !tracking-wider">
								⌘K
							</kbd>
						</div>
						<Button variant="outline" size="sm" className="hidden md:inline-flex">
							Feedback
						</Button>
						<Button size="sm" className="hidden md:inline-flex">
							Deploy
						</Button>
						<div className="md:hidden">
							<MobileSidebar />
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
