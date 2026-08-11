import { db } from "../db/client.ts"
import { vehicleStatusEnum, vehicleTable } from "../db/schema/vehicle.ts"

type vehicleStatus = typeof vehicleStatusEnum.enumValues[number]

const registerVehicleService = async (data: {
    name: string, 
    model: string, 
    manufacturer: string, 
    year: number, 
    plate: string, 
    color: string, 
    status: vehicleStatus, 
    ownerId: string
}) => {

    const [vehicle] = await db.insert(vehicleTable).values({
        name: data.name,
        model: data.model,
        manufacturer: data.manufacturer,
        year: data.year,
        plate: data.plate,
        color: data.color,
        status: data.status,
        ownerId: data.ownerId
    }).returning()

    return vehicle
}

export {registerVehicleService}