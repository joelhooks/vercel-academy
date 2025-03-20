import type { ReactNode } from 'react'
import { locales } from '@/config/locales'
import { notFound } from 'next/navigation'
import { Navbar } from '@/components/site/navbar'
import { Footer } from '@/components/site/footer'

export function generateStaticParams() {
	return locales.map((locale: string) => ({
		lang: locale,
	}))
}

interface LangLayoutProps {
	children: ReactNode
	params: Promise<{
		lang: string
	}>
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
	// Await params to resolve before destructuring
	const resolvedParams = await Promise.resolve(params)
	const { lang } = resolvedParams

	// Validate locale
	const isValidLocale = locales.some((locale: string) => locale === lang)
	if (!isValidLocale) {
		notFound()
	}

	return (
		<>
			<Navbar />
			{children}
			<Footer />
		</>
	)
}
