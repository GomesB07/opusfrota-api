import { pgEnum, pgTable, timestamp, uuid } from "drizzle-orm/pg-core";
import { fleetTable } from "./fleet.ts";
import { userTable } from "./user.ts";

export const inviteStatusEnum = pgEnum("invite_status", ["pending", "accepted", "rejected"])


export const inviteFleetTable = pgTable("inviteFleet", {
    id: uuid("id").primaryKey().defaultRandom(),
    fleetId: uuid("fleet_id").notNull().references(() => fleetTable.id, {onDelete: 'cascade'}),
    invitedUserId: uuid("invited_user_id").notNull().references(() => userTable.id, {onDelete: 'cascade'}),
    status: inviteStatusEnum().default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").$onUpdate(() => new Date())
})