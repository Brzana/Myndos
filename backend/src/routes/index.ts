import { Router } from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import promptRoutes from './prompt.routes'
import chatRoutes from './chat.routes'
import taskRoutes from './task.routes'
import folderRoutes from './folder.routes'
import teacherFolderRoutes from './teacherFolder.routes'
import examRoutes from './exam.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/user', userRoutes)
router.use('/prompts', promptRoutes)
router.use('/chat', chatRoutes)
router.use('/tasks', taskRoutes)
router.use('/folders', folderRoutes)
router.use('/teacher-folders', teacherFolderRoutes)
router.use('/exam', examRoutes)

export default router
