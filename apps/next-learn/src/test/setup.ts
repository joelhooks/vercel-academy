import { vi } from 'vitest'

// Mock environment variables
vi.mock('@/env.mjs', () => ({
	env: {
		POSTGRES_URL: 'sqlite://test.db',
	},
}))
