import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'

import contactRoutes from './routes/contact'
import newsletterRoutes from './routes/newsletter'
import blogRoutes from './routes/blog'
import eventRoutes from './routes/events'
import authRoutes from './routes/auth'
import uploadRoutes from './routes/upload'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())


app.use('/images', express.static(path.join(__dirname, '..', 'frontend', 'public', 'images')))

app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/newsletter', newsletterRoutes)
app.use('/api/blog', blogRoutes)
app.use('/api/events', eventRoutes)
app.use('/api/upload-image', uploadRoutes)

app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`)
})
