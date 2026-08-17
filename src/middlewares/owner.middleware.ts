import type { NextFunction, Request, Response } from "express";
import { getUserService } from "../services/auth.service.ts";



const requireOwner = async (req: Request, res: Response, next: NextFunction) => {

    try {

        const userId = req.userId

        if(!userId) {
            throw new Error("UserId missing on middleware")
        }

        const user = await getUserService({userId})

        if(user?.role !== 'owner') {
            throw new Error
        }

        next()

    } catch (error) {
        res.status(400).json({error: 'User unauthorized'})
    }

}

export default requireOwner