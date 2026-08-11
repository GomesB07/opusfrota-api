import { integer, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user.js";


export const vehicleStatusEnum = pgEnum('vehicle_status', ['active', 'disabled', 'maintenance'])

export const vehicleTable = pgTable("vehicles", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    model: varchar('model', { length: 255 }).notNull(),
    manufacturer: varchar('manufacturer', { length: 255 }).notNull(),
    year: integer('year').notNull(),
    plate: varchar('plate', { length: 10 }).notNull().unique(),
    color: varchar('color', {length: 7}),
    status: vehicleStatusEnum('status').default('active'),
    ownerId: uuid('owner_id').references(() => userTable.id).notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})