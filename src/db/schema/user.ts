import { pgTable, varchar, uuid, timestamp, pgEnum, type AnyPgColumn } from "drizzle-orm/pg-core";
import { fleetTable } from "./fleet.ts";

export const userRoleEnum = pgEnum('user_role', ['owner', 'collaborator'])

export const userTable = pgTable("users", {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('collaborator'),
  fleetId: uuid("fleet_id").references((): AnyPgColumn => fleetTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('update_at').$onUpdate(() => new Date())
});
