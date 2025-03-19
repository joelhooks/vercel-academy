'use client'

import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  prefetch?: boolean
  className?: string
}

export function NavLink({ href, children, className }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        'flex items-center justify-between gap-2 w-full relative',
        'transition-colors duration-200',
        isActive && 'border pl-[calc(1rem-2px)] bg-background',
        !isActive && 'pl-4',
        className,
      )}
      prefetch={true}
    >
      {children}
    </Link>
  )
}
