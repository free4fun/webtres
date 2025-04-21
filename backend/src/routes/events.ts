import express from 'express'
import { addEvent, getEvents, deleteEvent, updateEvent } from '../controllers/eventController'
import { verifyToken } from '../utils/auth'

const router = express.Router()

router.post('/', verifyToken, addEvent)
router.get('/', verifyToken, getEvents)
router.put('/:slug', verifyToken, updateEvent)
router.delete('/:slug', verifyToken, deleteEvent)

export default router
