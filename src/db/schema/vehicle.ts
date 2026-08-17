import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { fleetTable } from "./fleet.ts";


export const vehicleStatusEnum = pgEnum('vehicle_status', ['active', 'disabled', 'maintenance'])

export const vehicleTable = pgTable("vehicles", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    manufacturer: varchar('manufacturer', { length: 255 }).notNull(),
    year: varchar('year').notNull(),
    plate: varchar('plate', { length: 10 }).notNull().unique(),
    color: varchar('color', {length: 7}),
    status: vehicleStatusEnum('status').default('active'),
    fleetId: uuid("fleet_id").references(() => fleetTable.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})