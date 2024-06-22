import { Router } from 'express';
import { createLocal, getLocal, updateLocal, deleteLocal, getAllLocals } from '../controllers/localController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.post('/', authenticateToken(['user']), createLocal);
router.get('/:id', authenticateToken(['user']), getLocal);
router.get('/', authenticateToken(['user']), getAllLocals);
router.put('/:id', authenticateToken(['user']), updateLocal);
router.delete('/:id', authenticateToken(['user']), deleteLocal);

export default router;