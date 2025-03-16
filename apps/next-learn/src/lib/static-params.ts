import { getModules, getSectionsByModuleId, getLessonsBySectionId } from '@/lib/content-resources'
import { locales } from '@/config/locales'

/**
 * Generates static parameters for module pages
 * @returns Array of { lang, moduleSlug } combinations
 */
export async function generateModuleParams() {
	const modules = await getModules()
	const params = []

	for (const moduleResource of modules) {
		if (!moduleResource.fields?.slug) continue

		for (const locale of locales) {
			params.push({
				lang: locale,
				moduleSlug: moduleResource.fields.slug,
			})
		}
	}

	return params
}

/**
 * Generates static parameters for section pages
 * @returns Array of { lang, moduleSlug, sectionSlug } combinations
 */
export async function generateSectionParams() {
	const modules = await getModules()
	const params = []

	for (const moduleResource of modules) {
		if (!moduleResource.fields?.slug) continue

		const moduleSlug = moduleResource.fields.slug
		const sections = await getSectionsByModuleId(moduleResource.id)

		for (const section of sections) {
			if (!section.fields?.slug) continue

			const sectionSlug = section.fields.slug || section.id

			for (const locale of locales) {
				params.push({
					lang: locale,
					moduleSlug: moduleSlug,
					sectionSlug: sectionSlug,
				})
			}
		}
	}

	return params
}

/**
 * Generates static parameters for lesson pages
 * @returns Array of { lang, moduleSlug, sectionSlug, lessonSlug } combinations
 */
export async function generateLessonParams() {
	const modules = await getModules()
	const params = []

	for (const moduleResource of modules) {
		if (!moduleResource.fields?.slug) continue

		const moduleSlug = moduleResource.fields.slug
		const sections = await getSectionsByModuleId(moduleResource.id)

		for (const section of sections) {
			if (!section.fields?.slug) continue

			const sectionSlug = section.fields.slug || section.id
			const lessons = await getLessonsBySectionId(section.id)

			for (const lesson of lessons) {
				if (!lesson.fields?.slug) continue

				const lessonSlug = lesson.fields.slug || lesson.id

				for (const locale of locales) {
					params.push({
						lang: locale,
						moduleSlug: moduleSlug,
						sectionSlug: sectionSlug,
						lessonSlug: lessonSlug,
					})
				}
			}
		}
	}

	return params
}
