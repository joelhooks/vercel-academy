import { pgTableCreator } from 'drizzle-orm/pg-core'

export const pgTable = pgTableCreator((name) => `va_${name}`)
