import fs from 'fs/promises'
import path from 'path'
import { Request, Response } from 'express'

const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')

export const getEvents = async (req: Request, res: Response) => {
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)

    // Ordenar por fecha descendente
    events.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())

    res.status(200).json(events)
  } catch {
    res.status(500).json({ error: 'Error Reading Events File' })
  }
}

export const addEvent = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.body
  const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const exists = events.filter((e: any) => e.slug === slug).length > 0;
    if (exists) {
      res.status(409).json({ error: 'Event Slug Already Exists' })
      return
    }
    events.push(req.body)
    await fs.writeFile(filePath, JSON.stringify(events, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error Saving Event' })
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
    const duplicate = events.find((p: any) => p.slug === updatedEvent.slug && p.slug !== slug);
    if (duplicate) {
      res.status(409).json({ error: 'Event Slug Already Exists' });
    }
    if (index === -1) res.status(404).json({ error: 'Event Not Found' })
    events[index] = updatedEvent
    await fs.writeFile(filePath, JSON.stringify(events, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error Updating Event' })
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
    res.status(500).json({ error: 'Error Deleting Event' })
  }
}