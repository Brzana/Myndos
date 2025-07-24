import { Router } from 'express'
import {
  getAllTeacherFolders,
  createTeacherFolder,
  addQuestionToTeacherFolder,
  deleteTeacherFolder,
  deleteTeacherQuestion,
} from '../controllers/teacherFolder.controller'

const router = Router()

router.get('/', getAllTeacherFolders)
router.post('/', createTeacherFolder)
router.post('/:name/questions', addQuestionToTeacherFolder)
router.delete('/:name', deleteTeacherFolder)
router.delete('/:name/questions', deleteTeacherQuestion)

export default router
