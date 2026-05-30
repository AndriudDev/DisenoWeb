import { z } from 'zod';

export const pacienteSchema = z.object({
    firstName: z.string().min(1, 'Nombre es requerido'),
    lastName: z.string().min(1, 'Apellido es requerido'),
    email: z.string().email('Email es requerido'),
    membershipType: z.enum(['Gold', 'Silver', 'Platinum'], 'Membresía es requerida'),
});

export const simuladorSchema = z.object({
    montoTratamiento: z.coerce.string()
        .refine((val) => val.trim().length > 0 && !isNaN(Number(val)), 'Ingrese un número válido')
        .transform(Number)
        .refine((val) => val >= 0, 'El valor no puede ser negativo'),
});

export type Paciente = z.infer<typeof pacienteSchema>;