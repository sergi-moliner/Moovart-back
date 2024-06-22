import Event from '../models/eventModel.js';

const eventController = {
  getAllEvents: async (req, res) => {
    try {
      const events = await Event.findAll();
      res.json(events);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getEventById: async (req, res) => {
    const { id } = req.params;
    try {
      const event = await Event.findByPk(id);
      if (event) {
        res.json(event);
      } else {
        res.status(404).send({ message: 'Event not found' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createEvent: async (req, res) => {
    const eventData = req.body;
    try {
      const newEvent = await Event.create(eventData);
      res.status(201).send({ id: newEvent.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updateEvent: async (req, res) => {
    const { id } = req.params;
    const eventData = req.body;
    try {
      const result = await Event.update(eventData, { where: { id } });
      if (result[0] === 0) {
        res.status(404).send({ message: 'Event not found' });
      } else {
        res.status(200).send({ message: 'Event updated successfully' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deleteEvent: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Event.destroy({ where: { id } });
      if (result === 0) {
        res.status(404).send({ message: 'Event not found' });
      } else {
        res.status(200).send({ message: 'Event deleted successfully' });
      }
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

export default eventController;
