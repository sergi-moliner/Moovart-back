import Notification from '../models/notificationModel.js';

export const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.findAll();
    res.json(notifications);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getNotificationsByUserId = async (req, res) => {
  const { user_id } = req.params;
  try {
    const notifications = await Notification.findAll({ where: { user_id } });
    res.json(notifications);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createNotification = async (req, res) => {
  const { user_id, subscription_id, message } = req.body;
  try {
    const newNotification = await Notification.create({ user_id, subscription_id, message });
    res.status(201).send({ id: newNotification.id });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Notification.update({ read: true }, { where: { id } });
    if (result[0] === 0) {
      res.status(404).send({ message: 'Notification not found' });
    } else {
      res.status(200).send({ message: 'Notification marked as read' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Notification.destroy({ where: { id } });
    if (result === 0) {
      res.status(404).send({ message: 'Notification not found' });
    } else {
      res.status(200).send({ message: 'Notification deleted successfully' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
