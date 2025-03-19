import { Config, defaultLocale } from '@/config/locales'

import { ArrowUpRight } from 'lucide-react'
// import { CourseCount } from '@/components/academy/courses/course-count'
// import { CourseBook } from '@/components/academy/courses/course-book'
import { Suspense } from 'react'
import { Badge } from '@/components/ui/badge'
import { getLessonsByModuleId } from '@/server/content/resources'

import Link from 'next/link'

import { ContentResource } from '@/schemas/content'

type Props = {
	module: ContentResource
	lang?: Config['locale']
}

// Helper to extract string content from potentially localized fields
const getLocalizedString = (
	value: string | Record<string, string> | null | undefined,
	lang?: string,
): string => {
	if (!value) return ''
	if (typeof value === 'string') return value
	return value[lang || defaultLocale] || value.en || Object.values(value)[0] || ''
}

export const CourseCard = async ({ module, lang }: Props) => {
	const moduleLessons = await getLessonsByModuleId(module.id)

	// Create path with or without language prefix
	const langPrefix = lang && lang !== defaultLocale ? `/${lang}` : ''

	return (
		<div className="border grid grid-cols-[auto_1fr] bg-background rounded-md transition-all group relative h-[150px]">
			<Link
				href={`${langPrefix}/${module?.fields?.slug}`}
				className="contents"
				prefetch={true}
				aria-label={`View ${getLocalizedString(module?.fields?.title, lang)} course`}
			>
				{/* <div className="p-4 md:p-6 border-r bg-accent/50 bg-grid transition-all duration-300 ease-out flex items-center justify-center">
					<CourseBook brand={brand} className="group-hover:-mt-1 group-hover:mb-1" />
				</div> */}
				<div className="flex flex-col p-4 text-left gap-3 relative">
					<div className="grid gap-1">
						{module?.fields?.title && (
							<div className="flex items-start justify-between gap-1">
								<h3 className="text-2xl font-semibold">
									{getLocalizedString(module?.fields?.title, lang)}
								</h3>
							</div>
						)}
						<p className="text-muted-foreground text-sm line-clamp-2">
							{getLocalizedString(module?.fields?.description, lang)}
						</p>
					</div>
					<div className="space-y-2">
						<div className="text-sm flex flex-wrap gap-1">
							<Badge variant="secondary">
								{moduleLessons.length > 0 ? `${moduleLessons.length} lessons` : 'Coming soon'}
							</Badge>
							<Suspense
								fallback={
									<Badge variant="secondary" aria-label="Loading student count">
										0 Students
									</Badge>
								}
							>
								{/* <CourseCount courseId={course?.id} /> */}
							</Suspense>
						</div>
					</div>
					<ArrowUpRight
						className="h-4 w-4 text-muted-foreground absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"
						aria-hidden="true"
					/>
				</div>
			</Link>
		</div>
	)
}

export const CourseCardSkeleton = () => {
	return (
		<div className="border grid grid-cols-[auto_1fr] rounded-md transition-all group relative animate-pulse h-[150px]">
			<div className="p-4 md:p-6 border-r bg-accent/50 bg-grid transition-all duration-300 ease-out flex items-center justify-center w-[128px]">
				{/* <CourseBook /> */}
			</div>
			<div className="flex flex-col p-4 text-left gap-3 relative">
				<div className="grid gap-1">
					<div className="h-7 bg-accent/20 rounded w-3/4" />
					<div className="h-10 bg-accent/20 rounded w-full" />
				</div>
				<div className="flex gap-2">
					<div className="h-5 w-24 bg-accent/20 rounded" />
					<div className="h-5 w-32 bg-accent/20 rounded" />
				</div>
			</div>
		</div>
	)
}
