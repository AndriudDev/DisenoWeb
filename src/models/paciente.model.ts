import prisma from '../lib/prisma'
import type { Prisma } from '../generated/prisma/client'

export const getAll = async (userId: number) => {
  return await prisma.paciente.findMany({ where: { userId } })
}

export const getById = async (id: number, userId: number) => {
  return await prisma.paciente.findUnique({ where: { id, userId } })
}

export const create = async (data: Prisma.PacienteCreateInput) => {
  return await prisma.paciente.create({ data })
}

export const update = async (id: number, userId: number, data: Omit<Prisma.PacienteUpdateInput, 'userId'>) => {
  return await prisma.paciente.update({ where: { id,userId }, data })
}

export const remove = async (id: number, userId: number) => {
  return await prisma.paciente.delete({ where: { id, userId } })
}
