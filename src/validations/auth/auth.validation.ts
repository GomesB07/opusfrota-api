import * as z from 'zod'


export const UserRegisterValidation = z.object({
    name: z.string().nonempty(),
    email: z.email().nonempty(),
    password: z.string().max(6).nonempty(),
})

export const UserLoginValidation = z.object({
    email: z.email().nonempty(),
    password: z.string().nonempty()
})