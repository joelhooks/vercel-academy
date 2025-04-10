'use client'

import { Menu, Search } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

export function MobileSidebar() {
	return (
		<div className="flex items-center gap-2 md:hidden">
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="right">
					<SheetHeader>
						<SheetTitle className="sr-only">Navigation</SheetTitle>
					</SheetHeader>
					<div className="flex flex-col gap-4 py-4">
						<Link
							href="/"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Learn
						</Link>
						<Link
							href="/docs"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Docs
						</Link>
						<Link
							href="/showcase"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Showcase
						</Link>
						<Link
							href="/templates"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Templates
						</Link>
						<Link
							href="/enterprise"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Enterprise
						</Link>
						<Link
							href="/blog"
							className="text-sm font-normal text-muted-foreground hover:text-foreground"
						>
							Blog
						</Link>
					</div>
				</SheetContent>
			</Sheet>
			<Button variant="ghost" size="icon" className="md:hidden">
				<Search className="h-5 w-5" />
				<span className="sr-only">Search documentation</span>
			</Button>
		</div>
	)
}
