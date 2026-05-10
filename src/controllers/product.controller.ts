import { Request, Response } from 'express'
import * as PacienteModel from '../models/paciente.model'

export const index = async (_req: Request, res: Response): Promise<void> => {
  const pacientes = await PacienteModel.getAll()
  res.render('pacientes/index', { pacientes })
}

export const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  const paciente = await PacienteModel.getById(id)
  if (!paciente) {
    res.status(404).render('404', { message: 'Paciente no encontrado' })
    return
  }
  res.render('pacientes/show', { paciente })
}

export const createForm = (_req: Request, res: Response): void => {
  res.render('pacientes/create')
}

export const createAction = async (req: Request, res: Response): Promise<void> => {
  const { firstName, lastName, email, membershipType, precio } = req.body
  const newPaciente = await PacienteModel.create({ firstName, lastName, email, membershipType, precio: parseInt(precio) })
  res.redirect(`/pacientes/${newPaciente.id}`)
}

export const editForm = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  const paciente = await PacienteModel.getById(id)
  if (!paciente) {
    res.status(404).render('404', { message: 'Paciente no encontrado' })
    return
  }
  res.render('pacientes/edit', { paciente })
}

export const editAction = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  const { firstName, lastName, email, membershipType, precio } = req.body
  try {
    await PacienteModel.update(id, { firstName, lastName, email, membershipType, precio: parseInt(precio) })
    res.redirect(`/pacientes/${id}`)
  } catch {
    res.status(404).render('404', { message: 'Paciente no encontrado' })
  }
}

export const deleteAction = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  try {
    await PacienteModel.remove(id)
    res.redirect('/pacientes')
  } catch {
    res.status(404).render('404', { message: 'Paciente no encontrado' })
  }
}
