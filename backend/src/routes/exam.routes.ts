import { Router } from 'express'
import { generateExam } from '../controllers/exam.controller'

const router = Router()

router.post('/generate', generateExam)

export default router
