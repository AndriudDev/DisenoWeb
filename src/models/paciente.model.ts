export interface Paciente {
  id: number
  firstName: string
  lastName: string
  email: string
  membershipType: string
}

const Pacientes: Paciente[] = [
  { id: 1, firstName: 'Juan', lastName: 'Perez', email: 'juan.perez@example.com', membershipType: 'Premium' },
  { id: 2, firstName: 'Maria', lastName: 'Gomez', email: 'maria.gomez@example.com', membershipType: 'Basic' },
  { id: 3, firstName: 'Carlos', lastName: 'Rodriguez', email: 'carlos.rodriguez@example.com', membershipType: 'Premium' },
  { id: 4, firstName: 'Ana', lastName: 'Martinez', email: 'ana.martinez@example.com', membershipType: 'Basic' },
  { id: 5, firstName: 'Luis', lastName: 'Hernandez', email: 'luis.hernandez@example.com', membershipType: 'Premium' },
]

export const getAll = (): Paciente[] => {
  return Pacientes
}

export const getById = (id: number): Paciente | undefined => {
  return Pacientes.find(product => product.id === id)
}

export const create = (product: Omit<Paciente, 'id'>): Paciente => {
  const newPaciente: Paciente = {
    id: Pacientes.length + 1,
    firstName: product.firstName,
    lastName: product.lastName,
    email: product.email,
    membershipType: product.membershipType
  }
  Pacientes.push(newPaciente)
  return newPaciente
}

export const update = (id: number, updatedPaciente: Omit<Paciente, 'id'>): Paciente | undefined => {
  const index = Pacientes.findIndex(paciente => paciente.id === id)
  if (index !== -1) {
    Pacientes[index] = { id, ...updatedPaciente }
    return Pacientes[index]
  }
  return undefined
}

export const remove = (id: number): boolean => {
  const index = Pacientes.findIndex(paciente => paciente.id === id)
  if (index !== -1) {
    Pacientes.splice(index, 1)
    return true
  }
  return false
}
