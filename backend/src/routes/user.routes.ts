import { Router } from 'express'
import * as userController from '../controllers/usercontroller'

const router = Router()
router.get('/me', userController.getProfile)

export default router
