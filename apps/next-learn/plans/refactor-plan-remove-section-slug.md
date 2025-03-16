# Refactor Plan: Removing sectionSlug from URL Structure

## Current Structure

```
/[lang]/[moduleSlug]/[sectionSlug]/[lessonSlug]
```

## Target Structure

```
/[lang]/[moduleSlug]/[lessonSlug]
```

## Overview

This refactor will eliminate the section URL segment from our academy routes while preserving the hierarchical content structure (modules → sections → lessons) in the database. Lessons will remain organized in sections conceptually, but in the URL structure, they will appear directly under modules.

## Key Changes Required

### 1. Content Structure & Data Access

- **Update Data Access Layer**:
  - Create a new `getLessonsByModuleId` function that fetches all lessons belonging to sections within a module
  - This will require a more complex join query to traverse the relationship chain (module → section → lesson)
  - The section information should still be preserved and accessible for each lesson

### 2. URL Structure and Routes

- **Update Route Structure**:

  - Remove the `[sectionSlug]` dynamic segment from URL paths
  - Move the lesson page component from `/[lang]/[moduleSlug]/[sectionSlug]/[lessonSlug]/page.tsx` to `/[lang]/[moduleSlug]/[lessonSlug]/page.tsx`

- **Update Static Parameter Generation**:
  - Simplify `generateLessonParams` to only include `lang`, `moduleSlug`, and `lessonSlug`
  - Remove `generateSectionParams` or repurpose it for other uses

### 3. UI Components

- **Module Page**:

  - Update module page to list lessons grouped by section, but lesson links should point directly to `/[lang]/[moduleSlug]/[lessonSlug]`
  - Still show section titles as organizational headers

- **Lesson Page**:

  - Update breadcrumbs to show module → lesson (removing section)
  - Consider adding section info as metadata, tag, or subtitle on the lesson page for context

- **Pagination/Navigation**:
  - Update previous/next navigation to work across section boundaries seamlessly
  - Ensure lesson ordering remains clear despite flattened URL structure

### 4. Components to Update

- **Breadcrumbs**: Remove section from breadcrumb navigation
- **Lesson Links**: Update all lesson links to point to new URL structure
- **Lesson Navigation**: Ensure next/previous buttons work across section boundaries

### 5. Technical Implementation Approach

1. First create the new `getLessonsByModuleId` function and test it thoroughly
2. Create a parallel folder structure for the new routes, without removing existing routes
3. Implement the new module and lesson page components
4. Update static param generators
5. Test thoroughly to ensure all content is accessible via new routes
6. Once confident, remove old route structure and components

### 6. Potential Issues and Solutions

- **Lesson Slug Collisions**: There's a risk of lesson slug collisions when flattening the structure

  - Solution: Check for and handle lesson slug uniqueness within a module
  - Consider adding section prefix to lesson slugs if needed

- **SEO and Redirects**: Need to handle redirects from old URLs to new URLs

  - Solution: Implement redirect logic from `/[lang]/[moduleSlug]/[sectionSlug]/[lessonSlug]` to `/[lang]/[moduleSlug]/[lessonSlug]`

- **Navigation Context**: Users might lose section context in new structure
  - Solution: Add visual cues like section tags on lesson pages

## Data Structure and Database Considerations

### Impact on Existing Data Structure

The current data structure has a clear hierarchical relationship:

- Modules contain Sections (contentResourceResource links module to sections)
- Sections contain Lessons (contentResourceResource links section to lessons)

This refactor doesn't change the underlying data structure. We're maintaining the module → section → lesson hierarchy in the database, but flattening it for URL/navigation purposes.

### Implementation of getLessonsByModuleId

Here's a suggested implementation for the new function in `resources.ts`:

```typescript
/**
 * Fetches all lessons that belong to sections within a specific module
 * Returns lessons with their associated section information
 */
export async function getLessonsByModuleId(
	moduleId: string,
): Promise<Array<ContentResource & { sectionId: string; sectionTitle: string }>> {
	try {
		// First get all sections belonging to this module
		const sections = await getSectionsByModuleId(moduleId)

		if (!sections.length) {
			console.log(`No sections found for module "${moduleId}"`)
			return []
		}

		// Create a map to store section ID to section data for quick lookup
		const sectionMap = new Map(
			sections.map((section) => [
				section.id,
				{
					id: section.id,
					title: section.fields?.title || 'Untitled Section',
					position: section.position || 0,
				},
			]),
		)

		// Get all section IDs
		const sectionIds = sections.map((section) => section.id)

		// Query to get all lessons from these sections along with their relationships
		const result = await db
			.select({
				lesson: contentResource,
				relationship: contentResourceResource,
				sectionId: contentResourceResource.resourceOfId,
			})
			.from(contentResource)
			.innerJoin(
				contentResourceResource,
				and(
					eq(contentResourceResource.resourceId, contentResource.id),
					// Use an "in" clause for multiple section IDs
					sql`${contentResourceResource.resourceOfId} IN (${sectionIds.join(',')})`,
				),
			)
			.where(eq(contentResource.type, 'lesson'))
			.orderBy(contentResourceResource.position)

		// Process and return the results with section information attached
		return result
			.map((r) => {
				const lesson = safelyParseResource(r.lesson)
				if (!lesson) return null

				const sectionId = r.sectionId
				const sectionInfo = sectionMap.get(sectionId)

				return {
					...lesson,
					sectionId,
					sectionTitle: sectionInfo?.title || 'Unknown Section',
					sectionPosition: sectionInfo?.position || 0,
				}
			})
			.filter(
				(
					result,
				): result is ContentResource & {
					sectionId: string
					sectionTitle: string
					sectionPosition: number
				} => result !== null,
			)
	} catch (error) {
		console.error(`Error fetching lessons for module "${moduleId}":`, error)
		return []
	}
}
```

This approach:

1. First fetches all sections for the module
2. Creates a lookup map of section data
3. Gets all lessons that belong to any of those sections
4. Attaches the section information to each lesson
5. Returns the enhanced lesson objects that include their parent section context

### Migration Considerations

This change doesn't require a database migration since we're maintaining the same data structure. However, if lesson slugs aren't unique within a module across different sections, we may need to update them to ensure uniqueness.

A utility script could be created to:

1. Identify lessons with duplicate slugs within the same module
2. Update those slugs to include a section prefix or other distinguishing element
3. Log all changes for review

## Affected Files

1. `/src/server/content/resources.ts` - Add `getLessonsByModuleId` function
2. `/src/server/params/static-params.ts` - Update parameter generation functions
3. `/src/app/(academy)/[lang]/[moduleSlug]/page.tsx` - Update to link directly to lessons
4. Create `/src/app/(academy)/[lang]/[moduleSlug]/[lessonSlug]/page.tsx`
5. Various UI components that handle navigation or reference sections

## Timeline and Approach

1. **Data Access Layer Changes** (1 day)
2. **Route Structure Updates** (1 day)
3. **UI Component Updates** (2 days)
4. **Testing and Validation** (1-2 days)
5. **Cleanup and Redirects** (1 day)

## Testing Plan

- Verify all lessons are accessible at new URLs
- Test navigation between lessons
- Check breadcrumbs and UI elements for correct information
- Verify lesson order is maintained within conceptual sections
- Test redirect logic from old URLs

## Rollback Plan

Keep the old component structure in a temporary branch until confident the new structure works properly. If issues arise, we can quickly revert to the previous implementation.
