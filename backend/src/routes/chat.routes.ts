import { Router } from 'express'
import { proxyToOpenAI } from '../controllers/chatcontroller'

const router = Router()
router.post('/', proxyToOpenAI)

export default router
