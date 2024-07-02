// src/routes/authRoutes.js
import { Router } from 'express';
import { register, login, logout, forgotPassword, changePassword, getUserProfile } from '../controllers/authController.js';
import { registerValidator, loginValidator, forgotPasswordValidator, changePasswordValidator } from '../validations/auth.Validation.js'
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();

// Rutas para registrarse e iniciar sesión
router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPasswordValidator, forgotPassword);
router.post('/change-password', changePasswordValidator, changePassword);
router.get('/profile', authenticateToken, getUserProfile);
router.get('/logout', logout);

export default router;
