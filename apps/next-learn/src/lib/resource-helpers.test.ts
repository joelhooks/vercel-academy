import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getValidatedResource, getLocalizedContent, resolveParams } from './resource-helpers'
import * as contentResourcesModule from './content-resources'
import * as nextNavigation from 'next/navigation'

// Mock external dependencies
vi.mock('./content-resources', () => ({
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
	const mockResource = {
		id: 'test-id',
		type: 'module' as const,
		fields: {
			title: {
				en: 'English Title',
				es: 'Spanish Title',
			},
			description: 'Non-localized Description',
			emptyField: null,
		},
	}

	it('should return localized content when available', () => {
		const result = getLocalizedContent({
			resource: mockResource,
			field: 'title',
			lang: 'es',
			defaultValue: 'Default Title',
		})

		expect(result).toBe('Spanish Title')
	})

	it('should return default value when localized content is not available', () => {
		const result = getLocalizedContent({
			resource: mockResource,
			field: 'title',
			lang: 'fr', // French not available
			defaultValue: 'Default Title',
		})

		expect(result).toBe('Default Title')
	})

	it('should return non-localized content when field is not a record', () => {
		const result = getLocalizedContent({
			resource: mockResource,
			field: 'description',
			lang: 'en',
			defaultValue: 'Default Description',
		})

		expect(result).toBe('Non-localized Description')
	})

	it('should return default value when field does not exist', () => {
		const result = getLocalizedContent({
			resource: mockResource,
			field: 'nonExistentField',
			lang: 'en',
			defaultValue: 'Default Value',
		})

		expect(result).toBe('Default Value')
	})

	it('should return default value when field is null', () => {
		const result = getLocalizedContent({
			resource: mockResource,
			field: 'emptyField',
			lang: 'en',
			defaultValue: 'Default for Empty',
		})

		expect(result).toBe('Default for Empty')
	})
})

describe('resolveParams', () => {
	it('should resolve and return the passed params', async () => {
		const params = { slug: 'test-slug', locale: 'en' }
		const result = await resolveParams(params)

		expect(result).toEqual(params)
	})
})
