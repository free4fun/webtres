import express, { Request, Response } from 'express'
import { generateToken, verifyToken } from '../utils/auth'
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router()
router.get('/validate', verifyToken, (req, res) => {
  res.status(200).json({ valid: true })
})
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body

  const adminEmail = process.env.ADMIN_EMAIL
  const adminPassword = process.env.ADMIN_PASSWORD

  if (email === adminEmail && password === adminPassword) {
    const token = generateToken({ email })
    res.status(200).json({ token })
  } else {
    res.status(401).json({ error: "Credenciales inválidas" })
  }
})

export default router
