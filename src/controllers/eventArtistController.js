import EventArtist from '../models/eventArtistModel.js';
import Event from '../models/eventModel.js';
import Artist from '../models/artistModel.js';

export const getAllEventArtists = async (req, res) => {
  try {
    const eventArtists = await EventArtist.findAll();
    res.json(eventArtists);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getArtistsByEventId = async (req, res) => {
  const { event_id } = req.params;
  try {
    const event = await Event.findByPk(event_id, {
      include: Artist
    });
    if (event) {
      res.json(event.Artists);
    } else {
      res.status(404).send({ message: 'Event not found' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

export const createEventArtist = async (req, res) => {
  const { event_id, artist_id } = req.body;
  try {
    const newEventArtist = await EventArtist.create({ event_id, artist_id });
    res.status(201).send({ id: newEventArtist.id });
  } catch (err) {
    res.status(500).send(err);
  }
};

export const deleteEventArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await EventArtist.destroy({ where: { id } });
    if (result === 0) {
      res.status(404).send({ message: 'EventArtist not found' });
    } else {
      res.status(200).send({ message: 'EventArtist deleted successfully' });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};
