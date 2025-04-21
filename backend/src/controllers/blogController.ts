import { Request, Response } from 'express'
import { promises as fs } from 'fs'
import path from 'path'

export const addBlogPost = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.body
  const lang = req.params.lang || 'es'
  const blogPath = path.join(__dirname, '..', '..', 'data', 'blog', `${lang}.json`)
  try {
    const raw = await fs.readFile(blogPath, 'utf8')
    const posts = JSON.parse(raw)
    const exists = posts.some((p: any) => p.slug === slug)
    if (exists) {
      res.status(409).json({ error: 'Ya existe un post con ese slug' })
      return
    }
    posts.push(req.body)
    await fs.writeFile(blogPath, JSON.stringify(posts, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al guardar el post' })
  }
}


export const getPostsByLang = async (req: Request, res: Response): Promise<void> => {
  const { lang } = req.params
  const blogPath = path.join(__dirname, '..', '..', 'data', 'blog', `${lang}.json`)
  try {
    const content = await fs.readFile(blogPath, 'utf8')
    const posts = JSON.parse(content)
    res.status(200).json(posts)
  } catch {
    res.status(500).json({ error: 'No se pudo leer el archivo de blog' })
  }
}

export const updatePost = async (req: Request, res: Response): Promise<void> => {
  const { slug } = req.params
  const updatedPost = req.body
  const filePath = path.join(__dirname, '..', '..', 'data', 'blog', 'es.json')
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const posts = JSON.parse(raw)
    const index = posts.findIndex((p: any) => p.slug === slug)
    if (index === -1) res.status(404).json({ error: 'Post no encontrado' })
    posts[index] = updatedPost
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al actualizar el post' })
  }
}

export const deletePost = async (req: Request, res: Response): Promise<void> => {
  const lang = req.query.lang || 'es'
  const filePath = path.join(__dirname, '..', '..', 'data', 'blog', `${lang}.json`)
  const { slug } = req.params
  try {
    const raw = await fs.readFile(filePath, 'utf8')
    const posts = JSON.parse(raw)
    const index = posts.findIndex((p: any) => p.slug === slug)
    if (index === -1) {
      res.status(404).json({ error: 'Post no encontrado' })
      return
    }
    posts.splice(index, 1)
    await fs.writeFile(filePath, JSON.stringify(posts, null, 2))
    res.status(200).json({ success: true })
  } catch {
    res.status(500).json({ error: 'Error al eliminar el post' })
  }
}