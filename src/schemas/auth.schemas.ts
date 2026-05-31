import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('Email es requerido'),
    password: z.string().min(1, 'Contraseña es requerida'),
})

export const registerSchema = z.object({
    email: z.email('Email es requerido'),
    password: z.string().min(8, 'Minimo 8 caracteres'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
