import type { PgTransaction } from "drizzle-orm/pg-core"
import { fleetTable } from "../db/schema/fleet.ts"
import type { PostgresJsQueryResultHKT } from "drizzle-orm/postgres-js"
import { eq, type ExtractTablesWithRelations } from "drizzle-orm"
import { db } from "../db/client.ts"

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

const getFleetService = async (fleetId: string) => {

    const fleet = await db.query.fleetTable.findFirst({
        where: eq(fleetTable.id, fleetId),
        with: {
            user: true,
            vehicles: true
        }
    })

    return fleet
}

export {fleetRegisterService, getFleetService}