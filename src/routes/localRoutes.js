import { Router } from 'express';
import { createLocal, getLocalsByUser, updateLocal, deleteLocal, getAllLocals } from '../controllers/localController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

router.get('/', getAllLocals);

router.post('/', authenticateToken(['user']), createLocal);
router.get('/user/:userId', authenticateToken(['user']), getLocalsByUser);
router.put('/:localId', authenticateToken(['user']), updateLocal);
router.delete('/:localId', authenticateToken(['user']), deleteLocal);

export default router;
