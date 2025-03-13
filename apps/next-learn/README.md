# Vercel Academy Next.js Learning Project

This project is built with [Next.js](https://nextjs.org) and includes a PostgreSQL database setup using Drizzle ORM.

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Styling with Tailwind CSS v4

This project uses Tailwind CSS v4 with its new configless approach. Instead of a JavaScript configuration file, we use CSS-native features:

### Theme Configuration (`src/app/(academy)/tailwind.css`)

```css
@theme {
	--font-sans: var(--font-geist-sans);
	--font-mono: var(--font-geist-mono);

	--color-vercel-pink: #ff0080;
	--color-vercel-blue: #0070f3;
	--color-vercel-cyan: #50e3c2;
	--color-vercel-orange: #f5a623;
	--color-vercel-violet: #7928ca;
}

@content './src/**/*.{js,ts,jsx,tsx,mdx}';
```

### Global Styles (`src/app/(academy)/globals.css`)

```css
@import './tailwind.css';
@import 'tailwindcss';
```

Key features of our Tailwind setup:

- **Configless Approach**: Using CSS variables and `@theme` directives instead of JavaScript configuration
- **Custom Vercel Theme**: Includes Vercel's color palette and Geist font family
- **Dark Mode Support**: Uses CSS variables for theme colors with media query switching
- **Font Features**: Custom font-feature settings for optimal typography
- **Sharp Rendering**: Special utility class for the Vercel triangle with optimized rendering

## Environment Configuration

This project uses [`@t3-oss/env-nextjs`](https://github.com/t3-oss/t3-env) for type-safe environment variables. The configuration is located in `src/env.mjs` and includes:

- `POSTGRES_URL`: URL for the PostgreSQL database
- `NODE_ENV`: Environment mode (development, test, production)
- `AUTH_SECRET`: Secret for authentication
- `AUTH_URL`: URL for authentication (automatically uses VERCEL_URL when deployed on Vercel)

To set up your environment, create a `.env` file in the root directory with these variables.

## Database Structure

The project uses [Drizzle ORM](https://orm.drizzle.team/) with [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres). Database configuration includes:

- `src/db/index.ts`: Main database client setup using drizzle with Vercel Postgres
- `src/db/schema.ts`: Database schema definition, including:
  - Content resources management tables
  - User authentication tables (compatible with NextAuth.js)
- `src/db/pg-table.ts`: Table naming utility that prefixes all tables with `va_`

### Database Commands

The project uses a migration-based workflow for database schema changes. Available commands include:

```bash
# Generate SQL migrations based on schema changes
pnpm db:generate

# Apply migrations to the database
pnpm db:migrate

# Open Drizzle Studio to manage and explore data
pnpm db:studio

# Introspect existing database
pnpm db:introspect
```

For PostgreSQL databases, it's recommended to use migrations rather than direct schema pushing to ensure safe, versioned schema changes.

## Authentication

This project uses [NextAuth.js](https://next-auth.js.org/) (v5 Beta) for authentication with the following setup:

- **Authentication Provider**: Vercel OIDC provider for seamless Vercel account integration
- **Database Adapter**: [@auth/drizzle-adapter](https://authjs.dev/reference/adapter/drizzle) for storing auth data in PostgreSQL
- **Schema**: Authentication tables include:
  - `user`: Stores user profile information
  - `account`: Manages OAuth account connections
  - `session`: Handles active user sessions

### Authentication Schema

The authentication schema is defined in `src/db/schema.ts` and includes:

```typescript
// User table with basic profile information
export const users = pgTable('user', {
	id: text('id').primaryKey(),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified'),
	image: text('image'),
})

// OAuth account connections
export const accounts = pgTable('account', {
	userId: text('userId').notNull(),
	type: text('type').notNull(),
	provider: text('provider').notNull(),
	providerAccountId: text('providerAccountId').notNull(),
	// ... OAuth specific fields
})

// Active sessions
export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId').notNull(),
	expires: timestamp('expires').notNull(),
})
```

### Authentication Setup

The authentication configuration is located in `src/auth/index.ts` and uses:

- Vercel OIDC provider for authentication
- Drizzle adapter for database integration
- PKCE (Proof Key for Code Exchange) for enhanced security

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [T3 Env Documentation](https://env.t3.gg/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
