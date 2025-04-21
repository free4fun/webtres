import express from 'express'
import { addBlogPost, getPostsByLang, updatePost, deletePost  } from '../controllers/blogController'
import { verifyToken } from '../utils/auth'

const router = express.Router()
// RUTA PÚBLICA: obtener posts por idioma
router.get('/:lang', getPostsByLang)
// RUTAS PROTEGIDAS (requieren JWT)
router.post('/:lang', verifyToken, addBlogPost)
router.delete('/:slug', verifyToken, deletePost)
router.put('/:slug', verifyToken, updatePost)

export default router
