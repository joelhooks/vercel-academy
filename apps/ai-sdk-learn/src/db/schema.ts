import { relations } from 'drizzle-orm'
import {
	index,
	jsonb,
	primaryKey,
	doublePrecision,
	timestamp,
	varchar,
	text,
	integer,
	boolean,
	serial,
} from 'drizzle-orm/pg-core'
import { pgTable } from './pg-table'

export const contentResourceResource = pgTable(
	'content_resource_resource',
	{
		resourceOfId: varchar('resource_of_id', { length: 255 }).notNull(),
		resourceId: varchar('resource_id', { length: 255 }).notNull(),
		position: doublePrecision('position').notNull().default(0),
		metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
		createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
		deletedAt: timestamp('deleted_at', { mode: 'date' }),
	},
	(table) => [
		primaryKey({ columns: [table.resourceOfId, table.resourceId] }),
		index('content_resource_id_idx').on(table.resourceOfId),
		index('resource_id_idx').on(table.resourceId),
	],
)

export const contentResource = pgTable(
	'content_resource',
	{
		id: varchar('id', { length: 255 }).notNull().primaryKey(),
		type: varchar('type', { length: 255 }).notNull(),
		fields: jsonb('fields').$type<Record<string, unknown>>().default({}),
		createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
		updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
		deletedAt: timestamp('deleted_at', { mode: 'date' }),
	},
	(table) => [index('type_idx').on(table.type), index('created_at_idx').on(table.createdAt)],
)

export const contentResourceResourceRelations = relations(contentResourceResource, ({ one }) => ({
	resourceOf: one(contentResource, {
		fields: [contentResourceResource.resourceOfId],
		references: [contentResource.id],
		relationName: 'resourceOf',
	}),
	resource: one(contentResource, {
		fields: [contentResourceResource.resourceId],
		references: [contentResource.id],
		relationName: 'resource',
	}),
}))

export const contentResourceRelations = relations(contentResource, ({ many }) => ({
	resources: many(contentResourceResource, { relationName: 'resourceOf' }),
	progress: many(resourceProgress),
}))

export type AdapterAccountType = 'oauth' | 'email' | 'credentials'

export const users = pgTable('user', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text('name'),
	email: text('email').unique(),
	emailVerified: timestamp('emailVerified', { mode: 'date' }),
	image: text('image'),
})

export const accounts = pgTable(
	'account',
	{
		userId: text('userId')
			.notNull()
			.references(() => users.id, { onDelete: 'cascade' }),
		type: text('type').$type<AdapterAccountType>().notNull(),
		provider: text('provider').notNull(),
		providerAccountId: text('providerAccountId').notNull(),
		refresh_token: text('refresh_token'),
		access_token: text('access_token'),
		expires_at: integer('expires_at'),
		token_type: text('token_type'),
		scope: text('scope'),
		id_token: text('id_token'),
		session_state: text('session_state'),
	},
	(account) => [
		primaryKey({ columns: [account.provider, account.providerAccountId] }),
		index('account_userId_idx').on(account.userId),
	],
)

export const usersRelations = relations(users, ({ many }) => ({
	accounts: many(accounts),
	progress: many(resourceProgress),
}))

export const accountsRelations = relations(accounts, ({ one }) => ({
	user: one(users, {
		fields: [accounts.userId],
		references: [users.id],
	}),
}))

export const sessions = pgTable('session', {
	sessionToken: text('sessionToken').primaryKey(),
	userId: text('userId')
		.notNull()
		.references(() => users.id, { onDelete: 'cascade' }),
	expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id],
	}),
}))

export const resourceProgress = pgTable(
	'resource_progress',
	{
		id: serial('id').primaryKey(),
		userId: text('user_id')
			.notNull()
			.references(() => users.id),
		resourceId: varchar('resource_id', { length: 255 })
			.notNull()
			.references(() => contentResource.id),
		isComplete: boolean('is_complete').default(false),
		progressPercent: doublePrecision('progress_percent').default(0),
		updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
	},
	(table) => [
		index('rp_user_id_idx').on(table.userId),
		index('rp_resource_id_idx').on(table.resourceId),
	],
)

export const resourceProgressRelations = relations(resourceProgress, ({ one }) => ({
	user: one(users, {
		fields: [resourceProgress.userId],
		references: [users.id],
	}),
	resource: one(contentResource, {
		fields: [resourceProgress.resourceId],
		references: [contentResource.id],
	}),
}))
