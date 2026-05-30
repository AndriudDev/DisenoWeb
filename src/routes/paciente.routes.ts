import { Router } from 'express'
import * as PacienteController from '../controllers/product.controller'

const router = Router()

router.get('/', PacienteController.index)
router.get('/create', PacienteController.createForm)
router.get('/:id', PacienteController.show)
router.post('/:id/simular', PacienteController.simulateAction)
router.post('/', PacienteController.createAction)
router.get('/:id/edit', PacienteController.editForm)
router.post('/:id/edit', PacienteController.editAction)
router.post('/:id/delete', PacienteController.deleteAction)

export default router
