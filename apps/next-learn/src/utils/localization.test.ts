import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getValidatedResource, getLocalizedContent, resolveParams } from './localization'
import * as contentResourcesModule from '@/server/content/resources'
import * as nextNavigation from 'next/navigation'

// Mock external dependencies
vi.mock('@/server/content/resources', () => ({
	getContentResourceBySlug: vi.fn(),
}))

vi.mock('next/navigation', () => ({
	notFound: vi.fn(),
}))

describe('getValidatedResource', () => {
	const mockResource = {
		id: 'test-id',
		type: 'module' as const,
		fields: {
			slug: 'test-slug',
			title: 'Test Title',
		},
	}

	beforeEach(() => {
		vi.resetAllMocks()
	})

	it('should return the resource when type matches', async () => {
		vi.mocked(contentResourcesModule.getContentResourceBySlug).mockResolvedValue(mockResource)

		const result = await getValidatedResource({
			slug: 'test-slug',
			expectedType: 'module',
		})

		expect(contentResourcesModule.getContentResourceBySlug).toHaveBeenCalledWith('test-slug')
		expect(result).toEqual(mockResource)
		expect(nextNavigation.notFound).not.toHaveBeenCalled()
	})

	it('should call notFound when resource does not exist', async () => {
		vi.mocked(contentResourcesModule.getContentResourceBySlug).mockResolvedValue(null)

		await getValidatedResource({
			slug: 'non-existent-slug',
			expectedType: 'module',
		})

		expect(contentResourcesModule.getContentResourceBySlug).toHaveBeenCalledWith(
			'non-existent-slug',
		)
		expect(nextNavigation.notFound).toHaveBeenCalled()
	})

	it('should call notFound when resource type does not match', async () => {
		const wrongTypeResource = { ...mockResource, type: 'section' as const }
		vi.mocked(contentResourcesModule.getContentResourceBySlug).mockResolvedValue(wrongTypeResource)

		await getValidatedResource({
			slug: 'test-slug',
			expectedType: 'module',
		})

		expect(contentResourcesModule.getContentResourceBySlug).toHaveBeenCalledWith('test-slug')
		expect(nextNavigation.notFound).toHaveBeenCalled()
	})
})

describe('getLocalizedContent', () => {
	const resource = {
		id: 'test-id',
		type: 'module' as const,
		fields: {
			slug: 'test-slug',
			title: {
				en: 'English Title',
				es: 'Spanish Title',
			},
			description: 'Non-localized description',
		},
	}

	it('should return localized content for a specific language', () => {
		const result = getLocalizedContent({
			resource,
			field: 'title',
			lang: 'es',
			defaultValue: 'Default Title',
		})

		expect(result).toBe('Spanish Title')
	})

	it('should return default value if language not found', () => {
		const result = getLocalizedContent({
			resource,
			field: 'title',
			lang: 'fr', // Not in the resource
			defaultValue: 'Default Title',
		})

		expect(result).toBe('Default Title')
	})

	it('should return non-localized field value if not a record', () => {
		const result = getLocalizedContent({
			resource,
			field: 'description',
			lang: 'en',
			defaultValue: 'Default Description',
		})

		expect(result).toBe('Non-localized description')
	})

	it('should return default value for non-existent fields', () => {
		const result = getLocalizedContent({
			resource,
			field: 'nonExistentField',
			lang: 'en',
			defaultValue: 'Default Value',
		})

		expect(result).toBe('Default Value')
	})
})

describe('resolveParams', () => {
	it('should resolve and return params', async () => {
		const params = { lang: 'en', slug: 'test-slug' }
		const result = await resolveParams(params)
		expect(result).toEqual(params)
	})
})
