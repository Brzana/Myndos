require('dotenv').config()
import express from 'express'
import cors from 'cors'
import routes from './routes'
import folderRoutes from './routes/folder.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', routes)
app.use('/folders', folderRoutes)

export default app
