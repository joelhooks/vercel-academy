import { Suspense } from 'react'
import { getModules } from '@/lib/data/content-resources'
import { getLocalizedField } from '@/lib/data'
import Link from 'next/link'

interface LearnLayoutProps {
	children: React.ReactNode
	params: {
		lang: string
	}
}

export default async function LearnLayout({ children, params }: LearnLayoutProps) {
	const modules = await getModules()

	return (
		<div className="flex min-h-screen">
			{/* Sidebar Navigation */}
			<aside className="w-64 bg-gray-100 p-6 hidden md:block">
				<h2 className="text-xl font-bold mb-4">Learn Next.js</h2>
				<nav>
					<ul className="space-y-4">
						{modules.map((module) => {
							const title = getLocalizedField<string>(
								{ fields: module.fields || {} },
								'title',
								params.lang,
								'Untitled Module',
							)

							return (
								<li key={module.id} className="mb-3">
									<Link
										href={`/${params.lang}/learn/${module.id}`}
										className="font-medium text-blue-600 hover:text-blue-800"
									>
										{title}
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</aside>

			{/* Main Content */}
			<main className="flex-1 p-6">
				<Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
			</main>
		</div>
	)
}
