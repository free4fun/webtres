import express, { Request, Response } from "express"
import multer from "multer"
import path from "path"
import fs from "fs"

const router = express.Router()


const createStorage = (folder: 'blog' | 'events') => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', '..', '..', 'frontend', 'public', 'images', folder)
    fs.mkdirSync(uploadPath, { recursive: true })
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "-").toLowerCase()
    const unique = `${base}-${Date.now()}${ext}`
    cb(null, unique)
  }
})


const uploadPost = multer({ storage: createStorage('blog') })


const uploadEvent = multer({ storage: createStorage('events') })


router.post("/post", uploadPost.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No se recibió ningún archivo" })
    return
  }
  res.status(200).json({ path: `/images/blog/${req.file.filename}` })
  return
})


router.post("/event", uploadEvent.single("image"), (req: Request, res: Response) => {
  if (!req.file) {
    res.status(400).json({ error: "No se recibió ningún archivo" })
    return 
  }
  res.status(200).json({ path: `/images/events/${req.file.filename}` })
  return 
})

export default router
