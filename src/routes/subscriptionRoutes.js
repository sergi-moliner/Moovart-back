import express from 'express';
import { getAllSubscriptions, getSubscriptionsByUserId, createSubscription, deleteSubscription } from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/subscriptions', getAllSubscriptions);
router.get('/subscriptions/user/:user_id', getSubscriptionsByUserId);
router.post('/subscriptions', createSubscription);
router.delete('/subscriptions/:id', deleteSubscription);

export default router;
