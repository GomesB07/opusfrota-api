import type { PgTransaction } from "drizzle-orm/pg-core"
import { fleetTable } from "../db/schema/fleet.ts"
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js"
import { eq, type ExtractTablesWithRelations } from "drizzle-orm"
import { db } from "../db/client.ts"
import { getUserService } from "./auth.service.ts"

type FleetRegisterServiceType = {
    tx: PgTransaction<PostgresJsQueryResultHKT, typeof import("../db/index.ts"), ExtractTablesWithRelations<typeof import("../db/index.ts")>>,
    userId: string
}

const fleetRegisterService = async ({tx, userId}: FleetRegisterServiceType) => {

    const [fleet] = await tx.insert(fleetTable).values({
        name: 'Grupo 1',
        ownerId: userId
    }).returning({id: fleetTable.id})

    return fleet
}

const getFleetAndVehiclesService = async (userId: string) => {

    const fleet = await db.transaction(async (tx) => {
        const user = await getUserService({tx, userId})

        if(!user) {
            throw new Error("User not found")
        }

        if(user.fleetId === null) {
            throw new Error("User does not have a fleet")
        }

        const fleet = await tx.query.fleetTable.findFirst({
            where: eq(fleetTable.id, user.fleetId),
            with: {
                vehicles: true
            }
        })

        return fleet

    })

    return fleet
}

export {fleetRegisterService, getFleetAndVehiclesService}