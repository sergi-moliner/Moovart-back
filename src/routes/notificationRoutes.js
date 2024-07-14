import express from 'express';
import { getAllNotifications, getNotificationsByUserId, createNotification, markAsRead, deleteNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', getAllNotifications);
router.get('/notifications/user/:user_id', getNotificationsByUserId);
router.post('/notifications', createNotification);
router.put('/notifications/:id/read', markAsRead);
router.delete('/notifications/:id', deleteNotification);

export default router;