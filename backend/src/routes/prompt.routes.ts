import { Router } from 'express'
import * as promptController from '../controllers/promptcontroller'

const router = Router()
router.get('/', promptController.getAll)
router.post('/', promptController.create)

export default router
