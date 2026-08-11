import type {NextFunction, Request, Response} from 'express'
import { db } from '../db/client.ts'
import { userTable } from '../db/schema/user.ts'
import { eq } from 'drizzle-orm'


const requireOwner = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.userId

    if(!userId) {
        return res.status(401).json({error: "UserId missing"})
    }

    const [user] = await db.select().from(userTable).where(eq(userTable.id, userId))

    if(!user) {
        return res.status(404).json({error: 'User not found!'})
    }

    if(user?.role !== 'owner') {
        return res.status(403).json({error: 'User not authorized!'})
    }

    next()

}

export {requireOwner}

