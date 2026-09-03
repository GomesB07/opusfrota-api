import type { Request, Response } from "express"
import { getAllVehiclesService, registerVehicleService } from "../services/vehicle.service.ts"
import { vehicleRegisterValidation } from "../validations/vehicle/vehicle.validation.ts"


const registerVehicleController = async (req: Request, res: Response) => {
    
    try {
        const userId = req.userId
        const {name, model, manufacturer, year, plate, color, status} = req.body

        if(!userId) {
            return res.status(401).json("Token missing!")
        }

        const validationVehicle = vehicleRegisterValidation.safeParse({name, model, manufacturer, year, plate, color, status})

        if(validationVehicle.error) {
            return res.status(400).json({error: 'Validate vehicle invalid'})
        }

        const vehicle = await registerVehicleService({name, model, manufacturer, year, plate, color, status, userId})

        res.status(201).json(vehicle)
    } catch (error) {
        res.status(401).json({error: (error as Error).message})
    }
}

const getAllVehiclesController = async (req: Request, res: Response) => {

    try {
        const userId = req.userId

        if(!userId) {
            throw new Error("User id missing")
        }
        
        const vehicles = await getAllVehiclesService(userId)

        console.log('VEHICLES CONTROLLER: ', vehicles)

        res.status(200).json(vehicles)

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
}

export {registerVehicleController, getAllVehiclesController}