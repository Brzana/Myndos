import { Router } from 'express'
import { proxyToOpenAI } from '../controllers/chat.controller'

const router = Router()
router.post('/', proxyToOpenAI)

export default router
