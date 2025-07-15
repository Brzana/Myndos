import express from 'express'
import routes from './routes'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api', routes)

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello from backend' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
