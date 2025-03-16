import { getContentResourceBySlug } from '@/server/content/resources'
import { notFound } from 'next/navigation'

/**
 * Represents a content resource with fields
 */
export interface ResourceWithFields {
	id: string
	type: 'module' | 'section' | 'lesson'
	fields?: {
		slug?: string | null
		title?: string | Record<string, string> | null
		description?: string | Record<string, string> | null
		content?: string | Record<string, string> | null
		body?: string | Record<string, string> | null
		[key: string]: unknown
	} | null
	[key: string]: unknown
}

/**
 * Type guard to check if a value is a Record with string keys
 */
function isRecordWithStringKeys(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Options for the getValidatedResource function
 */
export interface ValidateResourceOptions {
	slug: string
	expectedType: string
}

/**
 * Fetches and validates a content resource by slug and expected type
 * @param options - Options object containing slug and expectedType
 * @returns The validated resource
 * @throws Calls notFound() if resource doesn't exist or is of the wrong type
 */
export async function getValidatedResource({ slug, expectedType }: ValidateResourceOptions) {
	const resource = await getContentResourceBySlug(slug)

	if (!resource || resource.type !== expectedType) {
		notFound()
	}

	return resource
}

/**
 * Options for the getLocalizedContent function
 */
export interface LocalizedContentOptions<T> {
	resource: ResourceWithFields
	field: string
	lang: string
	defaultValue: T
}

/**
 * Helper function to safely get localized content with a fallback
 * @param options - Options object containing resource, field, lang, and defaultValue
 * @returns The localized field value or default value
 */
export function getLocalizedContent<T>({
	resource,
	field,
	lang,
	defaultValue,
}: LocalizedContentOptions<T>): T {
	const fieldValue = resource.fields?.[field]

	// If field value is a localized object (has language keys)
	if (fieldValue && isRecordWithStringKeys(fieldValue)) {
		// Return the value for the specific language if it exists
		if (lang in fieldValue) {
			return (fieldValue[lang] as unknown as T) || defaultValue
		}
		// Otherwise return default value for localized objects without the requested language
		return defaultValue
	}

	// If field value exists but is not localized
	if (fieldValue !== undefined && fieldValue !== null) {
		return fieldValue as unknown as T
	}

	return defaultValue
}

/**
 * Resolves and validates params for page components
 * @param params - The raw params object
 * @returns The resolved params object
 */
export async function resolveParams<T>(params: T): Promise<T> {
	return await Promise.resolve(params)
}
