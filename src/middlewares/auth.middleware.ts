import type { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

interface JwtPayload {
    userId: string
}

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader) {
        return res.status(401).json({error: 'Token missing!'})
    }

    const token = authHeader.replace('Bearer ', '')

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({error: 'Invalid Token!'})
    }
}

export {requireAuth}