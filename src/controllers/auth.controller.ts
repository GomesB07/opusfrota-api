import type { Request, Response } from "express";
import {registerService, loginService} from '../services/auth.service.ts'


const register = async (req: Request, res: Response) => {

    try {
        const {name, email, password, role} = req.body
        const {user, token} = await registerService({name, email, password, role})

        res.status(201).json({
            user: {id: user?.id, name: user?.name, email: user?.email, role: user?.role},
            token
        })
    } catch (error) {
        res.status(400).json({error: (error as Error).message})
    }
}


const login = async (req: Request, res: Response) => {

    try {
        const {email, password} = req.body

        const {user, token} = await loginService(email, password)

        res.status(200).json({
            user: {id: user.id, name: user.name, email: user.email, role: user.role},
            token
        })
    } catch (error) {
        res.status(401).json({error: (error as Error).message})
    }
}

export {register, login}