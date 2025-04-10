'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import Link from 'next/link'
import { MobileSidebar } from '../site/mobile-sidebar'
import { AcademyNavLinks } from './academy-nav-links'
import { HomeLinks } from '../nav/home-links'

export function AcademyNav() {
	return (
		<header className="sticky top-0 z-50 h-14 w-full border-b bg-background px-4 md:px-5">
			<div className="mx-auto">
				<div className="flex h-14 items-center">
					<HomeLinks />
				</div>
			</div>
		</header>
	)
}
