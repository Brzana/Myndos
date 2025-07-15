import { Router } from 'express'
import { getAllFolders, createFolder } from '../controllers/folder.controller'

const router = Router()

router.get('/', getAllFolders)
router.post('/', createFolder)

export default router
