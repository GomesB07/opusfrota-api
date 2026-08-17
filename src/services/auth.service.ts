import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../db/client.js'
import { userTable } from '../db/schema/user.js'
import { eq, type ExtractTablesWithRelations } from 'drizzle-orm'
import type { PgTransaction } from 'drizzle-orm/pg-core'
import type { PostgresJsQueryResultHKT } from 'drizzle-orm/postgres-js'

type UserRoleServiceType = {
    tx: PgTransaction<PostgresJsQueryResultHKT, typeof import("../db/index.ts"), ExtractTablesWithRelations<typeof import("../db/index.ts")>>,
    userId: string,
}

type UserRoleFleetIdServiceType = UserRoleServiceType & {
    fleetId: string
}

type getUserType = {
    userId?: string,
    userEmail?: string
}

const JWT_SECRET = process.env.JWT_SECRET!

const registerService = async (data: {
    name: string,
    email: string,
    password: string
}) => {

    const passwordHash = await bcrypt.hash(data.password, 10)

    const [user] = await db.insert(userTable).values({
        name: data.name,
        email: data.email,
        passwordHash,
    }).returning()

    const token = jwt.sign({userId: user?.id}, JWT_SECRET, {expiresIn: '7d'})

    return {user, token}
    
}

const loginService = async (email: string, password: string) => {

    const [user] = await db.select().from(userTable).where(eq(userTable.email, email))

    if(!user) throw new Error('User not found!')

    const isValid = await bcrypt.compare(password, user.passwordHash)
    if(!isValid) throw new Error('Password invalid!')

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '7d'})

    return {user, token}
}

const getUserService = async ({userId, userEmail}: getUserType) => {

    if (userId) {
        const user = await db.query.userTable.findFirst({
            where: eq(userTable.id, userId)
        })

        return user
    }

    if (userEmail) {
        const user = await db.query.userTable.findFirst({
            where: eq(userTable.email, userEmail)
        })

        return user
    }
}

const getUserRoleAndFleetIdService = async ({tx, userId}: UserRoleServiceType) => {

    const userRole = await tx.query.userTable.findFirst({
        where: eq(userTable.id, userId),
        columns: {
            role: true,
            fleetId: true
        }
    })

    return userRole
}

const updateUserRoleService = async ({tx, userId, fleetId}: UserRoleFleetIdServiceType) => {

    const user = await tx.update(userTable).set({role: 'owner', fleetId}).where(eq(userTable.id, userId))

    return user
}

export {registerService, loginService, getUserService, getUserRoleAndFleetIdService, updateUserRoleService}