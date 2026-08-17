import * as z from 'zod'


export const vehicleRegisterValidation = z.object({
    name: z.string().nonempty(),
    model: z.string().nonempty(),
    manufacturer: z.string().nonempty(),
    year: z.string().regex(/^[1-2]\d{3}$/).nonempty(),
    plate: z.string().regex(/^[A-Z]{3}-?[0-9][A-Z0-9][0-9]{2}$/).nonempty(),
    color: z.string().regex(/^#?([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).max(7).nonempty(),
    status: z.enum(['active', 'disabled', 'maintenance'])
})