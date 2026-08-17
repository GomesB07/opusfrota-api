import type { Request, Response } from "express";
import { loginService, registerService} from '../services/auth.service.ts'
import { UserLoginValidation, UserRegisterValidation } from "../validations/auth/auth.validation.ts";


const register = async (req: Request, res: Response) => {

    try {
        const {name, email, password} = req.body

        const validationUser = UserRegisterValidation.safeParse({name, email, password})

        if(validationUser.error) {
            return res.status(400).json({error: 'Validation user invalid'})
        }            

        const {user, token} = await registerService(validationUser.data)

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

        const validationUser = UserLoginValidation.safeParse({email, password})

        if(validationUser.error) {
            return res.status(400).json({error: 'Validation user invalid'})
        }

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