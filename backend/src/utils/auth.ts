import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const secret = process.env.JWT_SECRET || "fallback_secret"

export const generateToken = (payload: object): string =>
  jwt.sign(payload, secret, { expiresIn: '2h' })

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    res.status(401).json({ error: "Token no proporcionado" })
    return
  }

  const token = authHeader.split(" ")[1]

  try {
    const decoded = jwt.verify(token, secret)
    ;(req as any).user = decoded
    next()
  } catch (err) {
    res.status(403).json({ error: "Token inválido o expirado" })
  }
}
