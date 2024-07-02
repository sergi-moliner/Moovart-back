import { Router } from 'express';
import { getProfile, updateProfile, uploadFile } from '../controllers/profileController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

// Rutas para perfil de usuario
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.post('/profile/upload', authenticateToken, uploadFile);

export default router;
