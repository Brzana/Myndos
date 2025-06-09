import { Router } from 'express'
import * as userController from '../controllers/user.controller'

const router = Router()
router.get('/me', userController.getProfile)

export default router
