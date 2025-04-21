import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
  const { email } = req.body

  if (!email || !email.includes('@')) {
    res.status(400).json({ error: "Email válido requerido" })
    return
  }

  console.log("Nuevo suscriptor:", email)
  res.status(200).json({ success: true, message: "¡Gracias por suscribirte!" })
})

export default router
