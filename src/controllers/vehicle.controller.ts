import type { Request, Response } from "express"
import { registerVehicleService } from "../services/vehicle.service.ts"


const registerVehicleController = async (req: Request, res: Response) => {
    
    try {
        const ownerId = req.userId
        const {name, model, manufacturer, year, plate, color, status} = req.body

        if(!ownerId) {
            return res.status(401).json("Token missing!")
        }

        const vehicle = await registerVehicleService({name, model, manufacturer, year, plate, color, status, ownerId})

        res.status(201).json(vehicle)
    } catch (error) {
        res.status(401).json({error: (error as Error).message})
    }
}

export {registerVehicleController}