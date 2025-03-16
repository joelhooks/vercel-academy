# Next Learn App Structure

This application follows a modern, well-organized directory structure that clearly separates concerns and makes the codebase easier to navigate and maintain.

## Directory Structure

```
/src
├── /app                # Next.js App Router pages
├── /components         # UI components
│
├── /server             # Server-side code (all with 'use server')
│   ├── /content        # Content resource operations
│   │   └── resources.ts       # Content fetching functions
│   ├── /progress       # Progress tracking
│   │   └── user-progress.ts   # User progress operations
│   └── /auth           # Auth-related (future)
│
├── /utils              # Pure utility functions (client-safe)
│   └── localization.ts        # Localization helpers
│
├── /hooks              # React hooks (client-side)
│
├── /schemas            # Zod schemas and type definitions
│   ├── content.ts             # Content-related schemas
│   └── progress.ts            # Progress-related schemas
│
└── /lib                # Legacy directory (for backward compatibility)
```

## Key Concepts

### Server Components vs. Client Components

- Files in `/server` are server-side only and include the 'use server' directive
- Files in `/utils` are pure functions safe for client-side use
- Components should be clearly marked with 'use client' when they contain client-side logic

### Type Safety

- We use Zod for runtime validation
- Type definitions are centralized in the `/schemas` directory
- These schemas serve both as validation and TypeScript interfaces

### Backward Compatibility

The `/lib` directory contains compatibility re-exports for backward compatibility but is deprecated.
New code should import directly from the appropriate directories.

## Migration

To help with the migration process, we've created an automated script that will:

1. Update all import paths in the codebase to use the new structure
2. Create compatibility barrel files for backward compatibility
3. Run type checks to ensure everything works

Run the migration script from the apps/next-learn directory:

```bash
./scripts/run-migration.sh
```

Or for a dry run that doesn't make changes:

```bash
node scripts/migrate-imports.js --dry-run
```

See the `scripts/MIGRATION.md` file for more details.

## Best Practices

1. Keep server and client code separate
2. Organize by domain, not by technical function
3. Centralize type definitions in schemas
4. For server functions that modify data, use 'use server'
5. Prefer small, focused components and utilities
