import prisma from '../lib/prisma'
import type { Prisma } from '../generated/prisma/client'

export const getAll = async () => {
  return await prisma.paciente.findMany()
}

export const getById = async (id: number) => {
  return await prisma.paciente.findUnique({ where: { id } })
}

export const create = async (data: Prisma.PacienteCreateInput) => {
  return await prisma.paciente.create({ data })
}

export const update = async (id: number, data: Prisma.PacienteUpdateInput) => {
  return await prisma.paciente.update({ where: { id }, data })
}

export const remove = async (id: number) => {
  return await prisma.paciente.delete({ where: { id } })
}
