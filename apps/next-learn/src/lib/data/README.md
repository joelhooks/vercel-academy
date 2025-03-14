# Content Resources and Slugs

## Overview

The content resources system is designed to store educational content in a flexible, nested structure. Each resource (module, section, or lesson) has a unique ID and can also have a slug for more user-friendly URLs.

## Slug Usage

- Slugs are stored in the `fields.slug` property of each content resource
- Slugs should be used in URLs rather than IDs whenever possible
- The system will fall back to using IDs if slugs are not available

## Fetching Content

There are two main ways to fetch content:

1. `getContentResourceById(id)` - Use for internal references
2. `getContentResourceBySlug(slug)` - Use for URL paths and user-facing identifiers

Example:

```typescript
// Fetch by slug for URLs
const module = await getContentResourceBySlug('nextjs-foundations')

// Fetch by ID for internal relationships
const sections = await getSectionsByModuleId(module.id)
```

## Content Structure

Content resources are organized in a hierarchical structure:

- Modules contain Sections
- Sections contain Lessons

These relationships are stored in the `contentResourceResource` table, which maps parent resources to child resources with position information.

## Localization

Content can be localized using the `fields` object:

```typescript
fields: {
  title: {
    en: "English Title",
    ja: "日本語のタイトル"
  }
}
```

Use the `getLocalizedField` helper to extract localized content based on the user's language preference.
