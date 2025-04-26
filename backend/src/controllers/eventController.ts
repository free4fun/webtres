import { Request, Response } from 'express'
import { promises as fsPromises } from 'fs'
import fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '..', '..', 'data', 'events', 'events.json')

export const getEvents = async (req: Request, res: Response) => {
  try {
    const raw = await fsPromises.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
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
    const raw = await fsPromises.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const exists = events.filter((e: any) => e.slug === slug).length > 0;
    if (exists) {
      res.status(409).json({ error: 'Event Slug Already Exists' })
      return
    }
    events.push(req.body)
    await fsPromises.writeFile(filePath, JSON.stringify(events, null, 2))
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
    const raw = await fsPromises.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const index = events.findIndex((e: any) => e.slug === slug)
    const duplicate = events.find((p: any) => p.slug === updatedEvent.slug && p.slug !== slug);
    if (duplicate) {
      res.status(409).json({ error: 'Event Slug Already Exists' });
    }
    if (index === -1) res.status(404).json({ error: 'Event Not Found' })
    events[index] = updatedEvent
    await fsPromises.writeFile(filePath, JSON.stringify(events, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error Updating Event' })
  }
}

export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
  const lang = req.query.lang || 'es'
  const filePath = path.join(__dirname, '..', '..', 'data', 'events', `events.json`)
  const { slug } = req.params
  try {
    const raw = await fsPromises.readFile(filePath, 'utf8')
    const events = JSON.parse(raw)
    const index = events.findIndex((p: any) => p.slug === slug)
   

    if (index === -1) {
      res.status(404).json({ error: 'Post Not Found' })
      return
    }
    if (events[index].image) {
      const imagePath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', events[index].image)
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath)
      }
    }
    events.splice(index, 1)
    await fsPromises.writeFile(filePath, JSON.stringify(events, null, 2))
    
    
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error Deleting Post' })
  }
}