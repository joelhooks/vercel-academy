import NextAuth from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import db from '@/db'
import { accounts, sessions, users } from '@/db/schema'

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
	}),
	providers: [
		() => ({
			id: 'vercel',
			name: 'Vercel',
			issuer: 'https://vercel.com',
			type: 'oidc',
			checks: ['pkce', 'state', 'nonce'],
		}),
	],
})
