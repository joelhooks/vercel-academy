import type { ReactNode } from 'react'
import { locales } from '@/config/locales'
import { getModules, getLocalizedField } from '@/lib/content-resources'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
	return locales.map((locale: string) => ({
		lang: locale,
	}))
}

interface LangLayoutProps {
	children: ReactNode
	params: {
		lang: string
	}
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

	// Fetch all modules for the sidebar
	const modules = await getModules()

	return (
		<html lang={lang}>
			<body>
				<div className="flex min-h-screen">
					{/* Sidebar */}
					<aside className="w-64 bg-gray-100 border-r p-6">
						<div className="mb-8">
							<Link href={`/${lang}`} className="text-xl font-semibold">
								Academy
							</Link>
						</div>

						<nav className="space-y-1">
							{modules.map((module) => {
								const title = getLocalizedField<string>(
									{ fields: module.fields || {} },
									'title',
									lang,
									`Module ${module.id}`,
								)

								return (
									<Link
										key={module.id}
										href={`/${lang}/${module.id}`}
										className="block py-2 px-3 rounded hover:bg-gray-200 transition-colors"
									>
										{title}
									</Link>
								)
							})}
						</nav>
					</aside>

					{/* Main content */}
					<main className="flex-1 p-8">{children}</main>
				</div>
			</body>
		</html>
	)
}
