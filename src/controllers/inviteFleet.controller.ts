import * as z from 'zod'
import type { Request, Response } from "express";
import { getInvitesService, inviteFleetService } from "../services/inviteFleet.service.ts";

const InvitedUserEmailValidate = z.object({
    email: z.email().nonempty()
})

const inviteFleetController = async (req: Request, res: Response) => {

    try {
        const ownerId = req.userId
        const {email} = req.body

        const validateEmail = InvitedUserEmailValidate.safeParse({email: email})

        if(validateEmail.error) {
            throw new Error("Email invalid")
        }

        if(!ownerId) {
            throw new Error("Error get owner id")
        }

        const invite = await inviteFleetService({ownerId, emailUserInvited: validateEmail.data.email})

        res.status(201).json(invite)

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
}

const getInviteController = async (req: Request, res: Response) => {

    try {

        const userId = req.userId

        if(!userId) {
            throw new Error('User id not found')
        }

        const invites = await getInvitesService(userId)

        res.status(200).json(invites)

    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
}

export {inviteFleetController, getInviteController}