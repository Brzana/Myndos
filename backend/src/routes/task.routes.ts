import { Router } from 'express'
import * as taskController from '../controllers/taskcontroller'

const router = Router()
router.get('/', taskController.getAll)
router.post('/', taskController.create)
router.get('/:id', taskController.getById)
router.post('/:id/response', taskController.submitResponse)

export default router
