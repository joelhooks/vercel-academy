import { env } from '@/env.mjs'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './src/db/generated',
	dialect: 'postgresql',
	dbCredentials: {
		url: env.POSTGRES_URL,
	},
	tablesFilter: ['va_*'],
})
