import type { Request, Response } from "express"
import { getFleetService } from "../services/fleet.service.ts"



const getFleetController = async (req: Request, res: Response) => {

    try {

        const {fleetId} = req.params

        if(!fleetId) {
            throw new Error("Fleet id not found")
        }

        const fleet = await getFleetService(fleetId.toString())

        res.status(200).json(fleet)

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }

}

export {getFleetController}