import { Router } from 'express'
import {
  getAllFolders,
  createFolder,
  addQuestionToFolder,
} from '../controllers/folder.controller'

const router = Router()

router.get('/', getAllFolders)
router.post('/', createFolder)
router.post('/:name/questions', addQuestionToFolder)
router.delete(
  '/:name',
  require('../controllers/folder.controller').deleteFolder
)

export default router
