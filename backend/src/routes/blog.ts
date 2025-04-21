import express from 'express'
import { addBlogPost, getPostsByLang, updatePost, deletePost  } from '../controllers/blogController'
import { verifyToken } from '../utils/auth'
import { addEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventController'
const router = express.Router()
router.post('/:lang', verifyToken, addBlogPost)
router.get('/:lang', verifyToken, getPostsByLang)
router.delete('/:slug', verifyToken, deletePost)
router.put('/:slug', verifyToken, updatePost)

export default router
