import {
	getModules,
	getSectionsByModuleId,
	getLessonsBySectionId,
	getLessonsByModuleId,
} from '@/server/content/resources'
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

		const sections = await getSectionsByModuleId(moduleResource.id)

		for (const sectionResource of sections) {
			if (!sectionResource.fields?.slug) continue

			for (const locale of locales) {
				params.push({
					lang: locale,
					moduleSlug: moduleResource.fields.slug,
					sectionSlug: sectionResource.fields.slug,
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

		const sections = await getSectionsByModuleId(moduleResource.id)

		for (const sectionResource of sections) {
			if (!sectionResource.fields?.slug) continue

			const lessons = await getLessonsBySectionId(sectionResource.id)

			for (const lessonResource of lessons) {
				if (!lessonResource.fields?.slug) continue

				for (const locale of locales) {
					params.push({
						lang: locale,
						moduleSlug: moduleResource.fields.slug,
						sectionSlug: sectionResource.fields.slug,
						lessonSlug: lessonResource.fields.slug,
					})
				}
			}
		}
	}

	return params
}

/**
 * Generates static parameters for lesson pages with the new URL structure (without sectionSlug)
 * @returns Array of { lang, moduleSlug, lessonSlug } combinations
 */
export async function generateNewLessonParams() {
	const modules = await getModules()
	const params = []

	for (const moduleResource of modules) {
		if (!moduleResource.fields?.slug) continue

		const lessonsWithSections = await getLessonsByModuleId(moduleResource.id)

		for (const lessonResource of lessonsWithSections) {
			if (!lessonResource.fields?.slug) continue

			for (const locale of locales) {
				params.push({
					lang: locale,
					moduleSlug: moduleResource.fields.slug,
					lessonSlug: lessonResource.fields.slug,
				})
			}
		}
	}

	return params
}
