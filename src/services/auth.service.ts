import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {db} from '../db/client.js'
import { userTable } from '../db/schema/user.js'
import { eq } from 'drizzle-orm'

const JWT_SECRET = process.env.JWT_SECRET!

const registerService = async (data: {
    name: string,
    email: string,
    password: string
    role: 'owner' | 'collaborator'
}) => {

    const passwordHash = await bcrypt.hash(data.password, 10)

    const [user] = await db.insert(userTable).values({
        name: data.name,
        email: data.email,
        passwordHash,
        role: data.role
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

export {registerService, loginService}