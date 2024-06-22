import express from 'express';
import notificationController from '../controllers/notificationController.js';

const router = express.Router();

router.get('/notifications', notificationController.getAllNotifications);
router.get('/notifications/user/:user_id', notificationController.getNotificationsByUserId);
router.post('/notifications', notificationController.createNotification);
router.put('/notifications/:id/read', notificationController.markAsRead);
router.delete('/notifications/:id', notificationController.deleteNotification);

export default router;