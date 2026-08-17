import { Many, relations } from 'drizzle-orm';
import { userTable } from '../schema/user.ts';
import { fleetTable } from '../schema/fleet.ts';
import { vehicleTable } from '../schema/vehicle.ts';

const userFleetRelations = relations(userTable, ({ one }) => ({
  fleet: one(fleetTable, {
    fields: [userTable.fleetId],
    references: [fleetTable.ownerId]
  }),
}));


const fleetUserRelations = relations(fleetTable, ({ one, many }) => ({
    user: one(userTable, {
        fields: [fleetTable.ownerId],
        references: [userTable.id]
    })
}))

const fleetVehicleRelations = relations(fleetTable, ({ many }) => ({
  vehicles: many(vehicleTable)
}));

const vehicleFleetRelations = relations(vehicleTable, ({one}) => ({
    fleet: one(fleetTable, {
        fields: [vehicleTable.fleetId],
        references: [fleetTable.id]
    })
}))

export { userFleetRelations, fleetUserRelations, fleetVehicleRelations, vehicleFleetRelations };