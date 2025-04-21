import express from 'express'
import { Request, Response } from 'express'

const router = express.Router()

router.post('/', (req: Request, res: Response) => {
  const { name, email, message } = req.body

  if (!name || !email || !message) {
    res.status(400).json({
      error: "Todos los campos (nombre, email y mensaje) son obligatorios."
    })
    return
  }

  console.log("Nuevo mensaje de contacto:", { name, email, message })

  res.status(200).json({
    success: true,
    message: "Mensaje enviado correctamente."
  })
})

export default router
