import { sql } from 'drizzle-orm'
import { integer, pgTable, timestamp, uniqueIndex, varchar } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  createdAt: timestamp('created_at', { mode: 'date', precision: 3 }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date', precision: 3 }).notNull().defaultNow().$onUpdate(() => new Date()),
}, table => [
  uniqueIndex('emailUniqueIndex').on(sql`lower(${table.email})`),
])
