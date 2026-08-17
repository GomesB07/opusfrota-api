import { eq } from "drizzle-orm"
import { db } from "../db/client.ts"
import { vehicleStatusEnum, vehicleTable } from "../db/schema/vehicle.ts"
import { fleetTable } from "../db/schema/fleet.ts"
import { fleetRegisterService } from "./fleet.service.ts"
import { getUserRoleAndFleetIdService, updateUserRoleService } from "./auth.service.ts"

type vehicleStatus = typeof vehicleStatusEnum.enumValues[number]

const registerVehicleService = async (data: {
    name: string, 
    model: string, 
    manufacturer: string, 
    year: string,
    plate: string, 
    color: string, 
    status: vehicleStatus, 
    userId: string
}) => {


    const vehicleAndFleet = await db.transaction(async (tx) => {

        const userData = await getUserRoleAndFleetIdService({tx, userId: data.userId})

        if(!userData) return;

        let fleetId = userData?.fleetId ?? null

        if (fleetId === null) {
            
            const createFleet = await fleetRegisterService({tx, userId: data.userId})

            if (!createFleet) {
                throw new Error('Falha ao criar fleet')
            }
            
            await updateUserRoleService({tx, userId: data.userId, fleetId: createFleet.id})

            fleetId = createFleet.id
            
        }

        const createVehicle = await tx.insert(vehicleTable).values({
            name: data.name,
            model: data.model,
            manufacturer: data.manufacturer,
            year: data.year,
            plate: data.plate,
            color: data.color,
            status: data.status,
            fleetId
        }).returning()

        return createVehicle
        
    })

    return vehicleAndFleet
}

const getAllVehiclesService = async (userId: string | undefined) => {

    if (!userId) {
        return []
    }

    const allVehicles = await db.query.vehicleTable.findMany({
        where: eq(fleetTable.ownerId, userId),
        columns: {
            createdAt: false,
            updatedAt: false
        }
    })

    return allVehicles
}

export {registerVehicleService, getAllVehiclesService}