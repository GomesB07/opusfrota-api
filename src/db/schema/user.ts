import { pgTable, varchar, uuid, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['owner', 'collaborator'])

export const userTable = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', ({ length: 255 })).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').notNull().default('collaborator'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('update_at').$onUpdate(() => new Date())
});
