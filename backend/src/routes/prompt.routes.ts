import { Router } from 'express'
import * as promptController from '../controllers/prompt.controller'

const router = Router()
router.get('/', promptController.getAll)
router.post('/', promptController.create)

export default router
