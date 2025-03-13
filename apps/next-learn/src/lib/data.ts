// Types for content resources
export interface ContentFields {
	moduleId?: string
	sectionId?: string
	title?: string
	description?: string
	content?: string
	order?: number
	[key: string]: string | number | undefined
}

export interface ContentResource {
	id: string
	type: 'module' | 'section' | 'lesson'
	fields?: ContentFields
}

export interface LocalizedContentResource {
	fields: ContentFields
}

/**
 * Get all modules
 */
export async function getModules(): Promise<ContentResource[]> {
	// This would normally fetch from a CMS or API
	// For now, we'll return mock data
	return mockModules
}

/**
 * Get a content resource by its ID/slug
 */
export async function getContentResourceById(id: string): Promise<ContentResource | null> {
	// For simplicity, search in all content resources
	const allResources = [...mockModules, ...mockSections, ...mockLessons]
	return allResources.find((resource) => resource.id === id) || null
}

/**
 * Get sections belonging to a module
 */
export async function getSectionsByModuleId(moduleId: string): Promise<ContentResource[]> {
	return mockSections.filter((section) => section.fields?.moduleId === moduleId)
}

/**
 * Get lessons belonging to a section
 */
export async function getLessonsBySectionId(sectionId: string): Promise<ContentResource[]> {
	return mockLessons.filter((lesson) => lesson.fields?.sectionId === sectionId)
}

/**
 * Get a localized field value from a content resource
 */
export function getLocalizedField<T>(
	resource: LocalizedContentResource,
	fieldName: string,
	locale: string,
	fallback: T,
): T {
	if (!resource.fields) return fallback

	// Try to get the localized field (e.g., "title_en", "description_fr")
	const localizedKey = `${fieldName}_${locale}`

	if (localizedKey in resource.fields) {
		return resource.fields[localizedKey] as T
	}

	// Fallback to the non-localized field if it exists
	if (fieldName in resource.fields) {
		return resource.fields[fieldName] as T
	}

	// Return the provided fallback
	return fallback
}

// Mock Data
const mockModules: ContentResource[] = [
	{
		id: 'getting-started',
		type: 'module',
		fields: {
			title_en: 'Getting Started',
			description_en: 'An introduction to the platform and basic concepts.',
			order: 1,
		},
	},
	{
		id: 'fundamentals',
		type: 'module',
		fields: {
			title_en: 'Fundamentals',
			description_en: 'Core concepts and fundamentals of the system.',
			order: 2,
		},
	},
	{
		id: 'advanced-topics',
		type: 'module',
		fields: {
			title_en: 'Advanced Topics',
			description_en: 'Deep dive into advanced features and techniques.',
			order: 3,
		},
	},
]

const mockSections: ContentResource[] = [
	{
		id: 'overview',
		type: 'section',
		fields: {
			moduleId: 'getting-started',
			title_en: 'Platform Overview',
			order: 1,
		},
	},
	{
		id: 'setup',
		type: 'section',
		fields: {
			moduleId: 'getting-started',
			title_en: 'Setup & Installation',
			order: 2,
		},
	},
	{
		id: 'core-concepts',
		type: 'section',
		fields: {
			moduleId: 'fundamentals',
			title_en: 'Core Concepts',
			order: 1,
		},
	},
	{
		id: 'basic-usage',
		type: 'section',
		fields: {
			moduleId: 'fundamentals',
			title_en: 'Basic Usage',
			order: 2,
		},
	},
	{
		id: 'optimization',
		type: 'section',
		fields: {
			moduleId: 'advanced-topics',
			title_en: 'Optimization Techniques',
			order: 1,
		},
	},
]

const mockLessons: ContentResource[] = [
	{
		id: 'introduction',
		type: 'lesson',
		fields: {
			sectionId: 'overview',
			title_en: 'Introduction',
			content_en:
				"<p>Welcome to the platform! This lesson will introduce you to the key concepts and features.</p><h2>What You'll Learn</h2><ul><li>Platform basics</li><li>Navigation</li><li>Key features</li></ul>",
			order: 1,
		},
	},
	{
		id: 'platform-benefits',
		type: 'lesson',
		fields: {
			sectionId: 'overview',
			title_en: 'Platform Benefits',
			content_en:
				'<p>Learn about the many benefits our platform provides to users.</p><h2>Key Benefits</h2><ul><li>Improved productivity</li><li>Enhanced collaboration</li><li>Streamlined workflows</li></ul>',
			order: 2,
		},
	},
	{
		id: 'installation',
		type: 'lesson',
		fields: {
			sectionId: 'setup',
			title_en: 'Installation Guide',
			content_en:
				'<p>Follow these steps to install the software on your system.</p><h2>Installation Steps</h2><ol><li>Download the installer</li><li>Run the setup wizard</li><li>Configure settings</li><li>Complete installation</li></ol>',
			order: 1,
		},
	},
	{
		id: 'configuration',
		type: 'lesson',
		fields: {
			sectionId: 'setup',
			title_en: 'Configuration',
			content_en:
				'<p>Learn how to configure the application for your specific needs.</p><h2>Configuration Options</h2><ul><li>User preferences</li><li>System settings</li><li>Integration options</li></ul>',
			order: 2,
		},
	},
	{
		id: 'data-models',
		type: 'lesson',
		fields: {
			sectionId: 'core-concepts',
			title_en: 'Understanding Data Models',
			content_en:
				'<p>This lesson covers the fundamental data models used in the system.</p><h2>Core Data Models</h2><ul><li>Users and profiles</li><li>Content structures</li><li>Relationship models</li></ul>',
			order: 1,
		},
	},
]
