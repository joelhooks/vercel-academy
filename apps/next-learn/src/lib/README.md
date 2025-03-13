# Next Learn Data Layer

This directory contains the data access layer for the educational content platform. It provides a structured approach to working with content resources and user progress.

## Architecture

The data layer is organized into these main components:

1. **Schemas** - Type definitions and validation using Zod
2. **Data Access Functions** - Functions to retrieve and manipulate data
3. **Helper Functions** - Utilities for working with the data

## Key Files

- `content-resources.ts` - Functions for accessing content resources (modules, sections, lessons)
- `resource-progress.ts` - Functions for tracking and updating user progress
- `schemas/content-resource.ts` - Zod schemas and types for content resources
- `schemas/resource-progress.ts` - Zod schemas and types for resource progress

## Content Resources Structure

Content resources are stored in the `contentResource` table with relationships defined in the `contentResourceResource` join table.

### Resource Types

- **Module** - Top-level educational units (courses, chapters)
- **Section** - Groups of lessons within a module
- **Lesson** - Individual learning units with content

### Relationships

Resources are linked through the `contentResourceResource` table, which defines parent-child relationships:

- Module → Sections
- Section → Lessons

The relationship is defined by:

- `resourceOfId` - Parent resource ID (e.g., module ID)
- `resourceId` - Child resource ID (e.g., section ID)
- `position` - Order of the child within its parent

## Localization

Content fields support localization through either:

1. **Direct fields with locale suffix**:

   ```
   {
     title_en: "English Title",
     title_fr: "French Title"
   }
   ```

2. **Nested locale objects**:
   ```
   {
     title: {
       en: "English Title",
       fr: "French Title"
     }
   }
   ```

The `getLocalizedField` helper function supports both formats.

## Progress Tracking

User progress is stored in the `resourceProgress` table with:

- `userId` - User ID
- `resourceId` - Content resource ID
- `isComplete` - Whether the resource is completed
- `progressPercent` - Percentage of completion (0-100)

## Usage Examples

### Getting modules:

```typescript
import { getModules } from '@/lib/content-resources'

const modules = await getModules()
```

### Getting a resource by ID:

```typescript
import { getContentResourceById } from '@/lib/content-resources'

const resource = await getContentResourceById('resource-id')
```

### Getting localized content:

```typescript
import { getLocalizedField } from '@/lib/content-resources'

const title = getLocalizedField(resource, 'title', 'en', 'Untitled')
```

### Working with progress:

```typescript
import { markResourceComplete } from '@/lib/resource-progress'

await markResourceComplete(userId, resourceId)
```
