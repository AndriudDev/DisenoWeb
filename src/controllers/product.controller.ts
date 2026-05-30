import { Request, Response } from "express";
import * as PacienteModel from "../models/paciente.model";
import { pacienteSchema, simuladorSchema } from "../schemas/paciente.schemas";
import { formatZodErrors } from "../lib/parseError";

export const index = async (_req: Request, res: Response): Promise<void> => {
  const pacientes = await PacienteModel.getAll();
  res.render("pacientes/index", { pacientes });
};

/* export const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string)
  const paciente = await PacienteModel.getById(id)
  if (!paciente) {
    res.status(404).render('404', { message: 'Paciente no encontrado' })
    return
  }
  res.render('pacientes/show', { paciente })
} */

export const createForm = (_req: Request, res: Response): void => {
  res.render("pacientes/create");
};

export const createAction = async (req: Request, res: Response) => {
  const result = pacienteSchema.safeParse(req.body);
  if (!result.success) {
    return res.render("pacientes/create", {
      errors: formatZodErrors(result.error),
      paciente: req.body,
    });
  }
  const newPaciente = await PacienteModel.create(result.data);
  res.redirect(`/pacientes/${newPaciente.id}`);
};

export const editForm = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const paciente = await PacienteModel.getById(id);
  if (!paciente) {
    res.status(404).render("404", { message: "Paciente no encontrado" });
    return;
  }
  res.render("pacientes/edit", { paciente });
};

export const editAction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const result = pacienteSchema.safeParse(req.body);

  if (!result.success) {
    return res.render("pacientes/edit", {
      paciente: {
        id,
        ...req.body
      },
      errors: formatZodErrors(result.error),
    });
  }

  try {
    await PacienteModel.update(id, result.data);
    res.redirect(`/pacientes/${id}`);
  } catch {
    res.status(404).render("404", { message: "Paciente no encontrado" });
  }
};

export const simulateAction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const paciente = await PacienteModel.getById(id);

  if (!paciente) {
    res.status(404).render("404", { message: "Paciente no encontrado" });
    return;
  }

  const result = simuladorSchema.safeParse(req.body);
  const porcentajesMembresia: Record<string, number> = {
    Silver: 5,
    Gold: 10,
    Platinum: 20,
  };
  const descuento = porcentajesMembresia[paciente.membershipType] || 0;

  if (!result.success) {
    return res.render("pacientes/show", {
      paciente: {
        ...paciente,
        descuento,
      },
      errors: formatZodErrors(result.error),
      montoTratamiento: req.body.montoTratamiento,
      totalCalculado: '$0',
    });
  }

  const calculo = result.data.montoTratamiento - (result.data.montoTratamiento * (descuento / 100));

  res.render("pacientes/show", {
    paciente: {
      ...paciente,
      descuento,
    },
    montoTratamiento: req.body.montoTratamiento,
    totalCalculado: new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(calculo),
  });
};

export const deleteAction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const id = parseInt(req.params.id as string);
  try {
    await PacienteModel.remove(id);
    res.redirect("/pacientes");
  } catch {
    res.status(404).render("404", { message: "Paciente no encontrado" });
  }
};

export const show = async (req: Request, res: Response): Promise<void> => {
  const id = parseInt(req.params.id as string);
  const paciente = await PacienteModel.getById(id);

  if (!paciente) {
    res.status(404).render("404", { message: "Paciente no encontrado" });
    return;
  }

  const porcentajesMembresia: Record<string, number> = {
    Silver: 5,
    Gold: 10,
    Platinum: 20,
  };

  const descuento = porcentajesMembresia[paciente.membershipType] || 0;

  res.render("pacientes/show", {
    paciente: {
      ...paciente,
      descuento,
    },
  });
};
