import { describe, it, expect, vi, beforeEach } from 'vitest'
import { generateModuleParams, generateSectionParams, generateLessonParams } from './static-params'
import * as contentResources from '@/server/content/resources'
import type { ContentResource } from '@/schemas/content'

vi.mock('@/server/content/resources', () => ({
	getModules: vi.fn(),
	getSectionsByModuleId: vi.fn(),
	getLessonsBySectionId: vi.fn(),
}))

// Mock config
vi.mock('@/config/locales', () => ({
	locales: ['en', 'es'],
}))

describe('generateModuleParams', () => {
	beforeEach(() => {
		vi.resetAllMocks()
	})

	it('should generate params for modules with slugs', async () => {
		const mockModules: ContentResource[] = [
			{
				id: 'module-1',
				type: 'module',
				fields: { slug: 'getting-started' },
			},
			{
				id: 'module-2',
				type: 'module',
				fields: { slug: 'advanced-topics' },
			},
			{
				id: 'module-3',
				type: 'module',
				fields: null, // Should be skipped
			},
		]

		vi.mocked(contentResources.getModules).mockResolvedValue(mockModules)

		const params = await generateModuleParams()

		expect(params).toHaveLength(4) // 2 locales * 2 modules with slugs
		expect(params).toContainEqual({ lang: 'en', moduleSlug: 'getting-started' })
		expect(params).toContainEqual({ lang: 'es', moduleSlug: 'getting-started' })
		expect(params).toContainEqual({ lang: 'en', moduleSlug: 'advanced-topics' })
		expect(params).toContainEqual({ lang: 'es', moduleSlug: 'advanced-topics' })
	})
})

describe('generateSectionParams', () => {
	beforeEach(() => {
		vi.resetAllMocks()
	})

	it('should generate params for sections with slugs', async () => {
		const mockModules: ContentResource[] = [
			{
				id: 'module-1',
				type: 'module',
				fields: { slug: 'getting-started' },
			},
		]

		const mockSections: ContentResource[] = [
			{
				id: 'section-1',
				type: 'section',
				fields: { slug: 'intro' },
			},
			{
				id: 'section-2',
				type: 'section',
				fields: { slug: 'setup' },
			},
			{
				id: 'section-3',
				type: 'section',
				fields: null, // Should be skipped
			},
		]

		vi.mocked(contentResources.getModules).mockResolvedValue(mockModules)
		vi.mocked(contentResources.getSectionsByModuleId).mockResolvedValue(mockSections)

		const params = await generateSectionParams()

		expect(params).toHaveLength(4) // 2 locales * 2 sections with slugs
		expect(params).toContainEqual({
			lang: 'en',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
		})
		expect(params).toContainEqual({
			lang: 'es',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
		})
		expect(params).toContainEqual({
			lang: 'en',
			moduleSlug: 'getting-started',
			sectionSlug: 'setup',
		})
		expect(params).toContainEqual({
			lang: 'es',
			moduleSlug: 'getting-started',
			sectionSlug: 'setup',
		})
	})
})

describe('generateLessonParams', () => {
	beforeEach(() => {
		vi.resetAllMocks()
	})

	it('should generate params for lessons with slugs', async () => {
		const mockModules: ContentResource[] = [
			{
				id: 'module-1',
				type: 'module',
				fields: { slug: 'getting-started' },
			},
		]

		const mockSections: ContentResource[] = [
			{
				id: 'section-1',
				type: 'section',
				fields: { slug: 'intro' },
			},
		]

		const mockLessons: ContentResource[] = [
			{
				id: 'lesson-1',
				type: 'lesson',
				fields: { slug: 'welcome' },
			},
			{
				id: 'lesson-2',
				type: 'lesson',
				fields: { slug: 'tools' },
			},
			{
				id: 'lesson-3',
				type: 'lesson',
				fields: null, // Should be skipped
			},
		]

		vi.mocked(contentResources.getModules).mockResolvedValue(mockModules)
		vi.mocked(contentResources.getSectionsByModuleId).mockResolvedValue(mockSections)
		vi.mocked(contentResources.getLessonsBySectionId).mockResolvedValue(mockLessons)

		const params = await generateLessonParams()

		expect(params).toHaveLength(4) // 2 locales * 2 lessons with slugs
		expect(params).toContainEqual({
			lang: 'en',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
			lessonSlug: 'welcome',
		})
		expect(params).toContainEqual({
			lang: 'es',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
			lessonSlug: 'welcome',
		})
		expect(params).toContainEqual({
			lang: 'en',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
			lessonSlug: 'tools',
		})
		expect(params).toContainEqual({
			lang: 'es',
			moduleSlug: 'getting-started',
			sectionSlug: 'intro',
			lessonSlug: 'tools',
		})
	})
})
