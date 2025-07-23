import { Router } from 'express'
import {
  getAllFolders,
  createFolder,
  addQuestionToFolder,
  deleteQuestionFromFolder,
} from '../controllers/folder.controller'

const router = Router()

router.get('/', getAllFolders)
router.post('/', createFolder)
router.post('/:name/questions', addQuestionToFolder)
router.delete(
  '/:name',
  require('../controllers/folder.controller').deleteFolder
)

// Delete a question from a folder
router.delete('/:name/questions', deleteQuestionFromFolder)

export default router
