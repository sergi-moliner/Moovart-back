import { Router } from 'express';
import { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

// Rutas públicas
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Rutas protegidas
router.post('/', authenticateToken(['user']), createEvent);
router.put('/:id', authenticateToken(['user']), updateEvent);
router.delete('/:id', authenticateToken(['user']), deleteEvent);

export default router;
