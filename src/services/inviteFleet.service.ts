import { and, eq } from "drizzle-orm"
import { db } from "../db/client.ts"
import { inviteFleetTable } from "../db/schema/invite-fleet.ts"
import { getUserService, updateUserFleetIdService } from "./auth.service.ts"
import type { ParamsDictionary } from 'express-serve-static-core';
import { userTable } from "../db/index.ts";

type InviteFleetType = {
    ownerId: string,
    emailUserInvited: string
}

type InviteFleetAlreadyExistsType = {
    invitedUserId: string,
    fleetId: string
}

type AcceptInviteFleetType = {
    userId: string,
    inviteId: string
}


const inviteFleetService = async ({ownerId, emailUserInvited}: InviteFleetType) => {

    const invitedUser = await getUserService({userEmail: emailUserInvited})

    if(!invitedUser) {
        throw new Error('Error get user invited to fleet')
    }

    if(invitedUser.fleetId !== null) {
        throw new Error('The user already has a fleet')
    }

    const owner = await getUserService({userId: ownerId})

    if(!owner || !owner.fleetId) {
        throw new Error('Error get owner fleet')
    }

    const inviteFleetAlreadyExists = await getInviteFleetAlreadyExists({invitedUserId: invitedUser.id, fleetId: owner.fleetId})

    if(inviteFleetAlreadyExists) {
        throw new Error("User already invited")
    }

    const invite = await db.insert(inviteFleetTable).values({
        fleetId: owner.fleetId,
        invitedUserId: invitedUser.id
    }).returning()

    return invite
}

const getInviteFleetAlreadyExists = async ({invitedUserId, fleetId}: InviteFleetAlreadyExistsType) => {

    const invite = await db.query.inviteFleetTable.findFirst({
        where: and(eq(inviteFleetTable.invitedUserId, invitedUserId), eq(inviteFleetTable.fleetId, fleetId))
    })

    return invite
}

const getInvitesService = async (userId: string) => {

    const invites = db.query.inviteFleetTable.findMany({
        where: eq(inviteFleetTable.invitedUserId, userId)
    })

    return invites
}


const acceptInviteService = async ({userId, inviteId}: AcceptInviteFleetType) => {

    

    const acceptedInvite = await db.transaction(async (tx) => {
        const userHasAFleet = await getUserService({tx, userId})

        if(userHasAFleet?.fleetId !== null) {
            throw new Error('User has a fleet')
        }

        const [invite] = await tx.select().from(inviteFleetTable).where(eq(inviteFleetTable.id, inviteId))

        if(invite?.status !== 'pending') {
            throw new Error('Invite invalid')
        }

        await tx.update(inviteFleetTable).set({status: 'accepted'}).where(eq(inviteFleetTable.id, inviteId))
        await updateUserFleetIdService({tx, userId, fleetId: invite.fleetId})
    })

    return acceptedInvite
}

export {inviteFleetService, getInviteFleetAlreadyExists, getInvitesService, acceptInviteService}