import Subscription from '../models/subscriptionModel.js';

const subscriptionController = {
  getAllSubscriptions: async (req, res) => {
    try {
      const subscriptions = await Subscription.findAll();
      res.json(subscriptions);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getSubscriptionsByUserId: async (req, res) => {
    const { user_id } = req.params;
    try {
      const subscriptions = await Subscription.findAll({ where: { user_id } });
      res.json(subscriptions);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createSubscription: async (req, res) => {
    const { user_id, event_id } = req.body;
    try {
      const newSubscription = await Subscription.create({ user_id, event_id });
      res.status(201).send({ id: newSubscription.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteSubscription: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Subscription.destroy({ where: { id } });
      if (result === 0) {
        res.status(404).send({ message: 'Subscription not found' });
      } else {
        res.status(200).send({ message: 'Subscription deleted successfully' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

export default subscriptionController;
