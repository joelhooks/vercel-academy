# Import Path Migration Guide

## Migration Status: ✅ COMPLETED

The codebase has been successfully migrated to the new directory structure as described in the src/README.md file.

## Overview of Changes

We've moved from a flat structure to a more organized one:

**Old Structure:**

```
/src
└── /lib                  # All logic mixed together
    ├── content-resources.ts
    ├── resource-progress.ts
    ├── resource-helpers.ts
    └── /schemas
        ├── content-resource.ts
        └── resource-progress.ts
```

**New Structure:**

```
/src
├── /server             # Server-side code
│   ├── /content        # Content resource operations
│   ├── /progress       # Progress tracking
│   └── /params         # Static params generation
├── /utils              # Pure utility functions
├── /schemas            # Zod schemas and type definitions
└── /hooks              # React hooks
```

## What Was Done

The migration process:

1. Created new directories for better organization of concerns
2. Moved business logic to appropriate locations
3. Updated all imports across the codebase to use the new paths
4. Moved test files to accompany their implementations
5. Added documentation in src/README.md
6. **REMOVED** the legacy `/lib` directory completely

## Future Development

For new code, follow these guidelines:

1. Server-side code goes in `/server/*`
2. Client-side utilities in `/utils/*`
3. Schemas and type definitions in `/schemas/*`
4. React hooks in `/hooks/*`
