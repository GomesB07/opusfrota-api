import type { Request, Response } from "express"
import { getFleetAndVehiclesService } from "../services/fleet.service.ts"



const getFleetAndVehiclesController = async (req: Request, res: Response) => {

    try {

        const userId = req.userId

        if(!userId) {
            throw new Error("User id not found")
        }

        const fleet = await getFleetAndVehiclesService(userId.toString())

        res.status(200).json(fleet)

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }

}

export {getFleetAndVehiclesController}