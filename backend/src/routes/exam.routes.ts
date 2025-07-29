import { Router } from 'express'
import { generateExam } from '../controllers/exam.controller'

const router = Router()

import { generateTeacherExam } from '../controllers/exam.controller'

router.post('/generate', generateExam)
router.post('/generate-teacher', generateTeacherExam)

export default router
