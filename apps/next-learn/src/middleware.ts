import { NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/config/locales'

import type { NextRequest } from 'next/server'

// Paths that should be excluded from locale handling
const EXCLUDED_PATHS = /^(\/api\/|\/_next\/|\/favicon\.ico|.*\.(jpg|png|gif|svg|ico|css|js|json)$)/

export function middleware(request: NextRequest) {
	const pathname = request.nextUrl.pathname

	console.log('pathname', pathname)

	// Skip processing for excluded paths
	if (EXCLUDED_PATHS.test(pathname)) {
		console.log('excluded path')
		return NextResponse.next()
	}

	// Case 1: /en/* routes - redirect to /* (root paths)
	if (pathname.startsWith(`/${defaultLocale}/`)) {
		console.log('case 1')
		const newUrl = new URL(request.url)
		// Remove the /en/ prefix and clean up the path
		newUrl.pathname = pathname.replace(`/${defaultLocale}/`, '/').replace('//', '/')
		if (newUrl.pathname === '') newUrl.pathname = '/'
		return NextResponse.redirect(newUrl, 308) // 308 is Permanent Redirect
	}

	// Case 2: /* routes (not starting with any locale) - rewrite to /en/*
	const startsWithLocale = locales.some(
		(locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
	)

	if (!startsWithLocale) {
		const newUrl = new URL(request.url)
		newUrl.pathname = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
		return NextResponse.rewrite(newUrl)
	}

	// Case 3: Other locale routes (/ja/*, etc.) - pass through
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.).*)', '/admin/:path*'],
}
