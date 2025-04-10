import Link from 'next/link'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { MobileSidebar } from './mobile-sidebar'

export function Navbar() {
  return (
    <header className="sticky h-14 top-0 z-50 w-full border-b bg-background px-4 md:px-6">
      <div className={cn('mx-auto max-w-6xl')}>
        <div className="flex h-14 items-center">
          <Link href="/" className="flex items-center gap-3 font-bold">
            <div className="flex items-center">
              <svg
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
              <svg
                height="32"
                viewBox="0 0 32 32"
                width="32"
                className="text-muted"
                aria-label="Logo"
                role="img"
              >
                <path
                  d="M22 5L9 28"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <svg
                width="98"
                height="20"
                viewBox="0 0 394 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Logo"
                role="img"
              >
                <path
                  d="M261.919 0.0330722H330.547V12.7H303.323V79.339H289.71V12.7H261.919V0.0330722Z"
                  fill="currentColor"
                />
                <path
                  d="M149.052 0.0330722V12.7H94.0421V33.0772H138.281V45.7441H94.0421V66.6721H149.052V79.339H80.43V12.7H80.4243V0.0330722H149.052Z"
                  fill="currentColor"
                />
                <path
                  d="M183.32 0.0661486H165.506L229.312 79.3721H247.178L215.271 39.7464L247.127 0.126654L229.312 0.154184L206.352 28.6697L183.32 0.0661486Z"
                  fill="currentColor"
                />
                <path
                  d="M201.6 56.7148L192.679 45.6229L165.455 79.4326H183.32L201.6 56.7148Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M80.907 79.339L17.0151 0H0V79.3059H13.6121V16.9516L63.8067 79.339H80.907Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>

          <nav className="mx-6 hidden items-center gap-5 md:flex">
            <Link
              href="/learn"
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
          </nav>

          <div className="ml-auto flex items-center gap-4">
            <div className="relative hidden w-[250px] max-w-sm md:block">
              <Input
                type="search"
                placeholder="Search documentation..."
                className="w-full border-none bg-muted pl-3 pr-12 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <kbd className="pointer-events-none absolute right-1.5 top-[7px] hidden h-6 select-none items-center gap-1 rounded-[6px] border bg-background px-1.5 font-mono text-[13px] font-medium opacity-100 sm:flex">
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
