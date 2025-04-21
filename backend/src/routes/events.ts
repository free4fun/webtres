import express from 'express'
import { addEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventController'
import { verifyToken } from '../utils/auth'

const router = express.Router()
// RUTA PÚBLICA: obtener eventos
router.get('/', getEvents)
// RUTAS PROTEGIDAS (requieren JWT)
router.post('/', verifyToken, addEvent)
router.put('/:slug', verifyToken, updateEvent)
router.delete('/:slug', verifyToken, deleteEvent)

export default router
