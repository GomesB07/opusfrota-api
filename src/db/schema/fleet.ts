import { pgTable, timestamp, uuid, varchar, type AnyPgColumn } from "drizzle-orm/pg-core";
import { userTable } from "./user.ts";


export const fleetTable = pgTable("fleet", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name").notNull(),
    ownerId: uuid("owner_id").references((): AnyPgColumn => userTable.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})