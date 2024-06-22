import express from 'express';
import subscriptionController from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscriptions', subscriptionController.getAllSubscriptions);
router.get('/subscriptions/user/:user_id', subscriptionController.getSubscriptionsByUserId);
router.post('/subscriptions', subscriptionController.createSubscription);
router.delete('/subscriptions/:id', subscriptionController.deleteSubscription);

export default router;
