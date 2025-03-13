# Vercel Academy Learning Project

This monorepo contains a collection of Next.js applications and shared packages focused on learning and implementing Vercel's best practices and modern web development techniques.

## Project Structure

### Apps

- `apps/next-learn`: The main Next.js application for the Vercel Academy learning project
  - Features modern Next.js App Router
  - Integrates with Vercel Postgres using Drizzle ORM
  - Uses Tailwind CSS v4's new configless approach
  - Implements Vercel's design system with Geist fonts
  - Type-safe environment configuration with @t3-oss/env-nextjs

### Packages

- `@repo/ui`: Shared React component library
- `@repo/eslint-config`: Shared ESLint configurations
- `@repo/typescript-config`: Shared TypeScript configurations

## Development

This project uses [Turborepo](https://turbo.build/repo) for monorepo management and [pnpm](https://pnpm.io) as the package manager.

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm
- PostgreSQL database (or Vercel Postgres)

### Getting Started

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Set up environment variables:

   ```bash
   cp apps/next-learn/.env.example apps/next-learn/.env
   ```

   Then edit `.env` with your database and authentication settings.

3. Start development servers:
   ```bash
   pnpm dev
   ```

### Database Management

The project uses Drizzle ORM with Vercel Postgres. From the `apps/next-learn` directory:

```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:migrate

# Launch Drizzle Studio
pnpm db:studio
```

## Build

Build all apps and packages:

```bash
pnpm build
```

## Remote Caching

This project supports Turborepo's [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) feature. To enable it:

1. [Create a Vercel account](https://vercel.com/signup) if you don't have one
2. Link your Turborepo:
   ```bash
   npx turbo login
   npx turbo link
   ```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
