import fs from 'fs/promises'
import path from 'path'
import { Request, Response } from 'express'

const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')
export const getEvents = async (req: Request, res: Response) => {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    res.status(200).json(events)
  } catch {
    res.status(500).json({ error: 'Error al leer eventos' })
  }
}

export const addEvent = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.body
  const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const exists = events.some((e: any) => e.slug === slug)
    if (exists) {
      res.status(409).json({ error: 'Ya existe un evento con ese slug' })
      return
    }
    events.push(req.body)
    await fs.writeFile(filePath, JSON.stringify(events, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al guardar el evento' })
  }
}

export const updateEvent = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params
  const updatedEvent = req.body
  const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const index = events.findIndex((e: any) => e.slug === slug)
    if (index === -1) res.status(404).json({ error: 'Evento no encontrado' })
    events[index] = updatedEvent
    await fs.writeFile(filePath, JSON.stringify(events, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al actualizar el evento' })
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  const { slug } = req.params
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const updated = events.filter((e: any) => e.slug !== slug)
    await fs.writeFile(filePath, JSON.stringify(updated, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al eliminar evento' })
  }
}