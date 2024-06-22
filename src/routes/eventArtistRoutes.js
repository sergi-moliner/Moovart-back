import express from 'express';
import eventArtistController from '../controllers/eventArtistController.js';

const router = express.Router();

router.get('/event-artists', eventArtistController.getAllEventArtists);
router.get('/event-artists/event/:event_id', eventArtistController.getArtistsByEventId);
router.post('/event-artists', eventArtistController.createEventArtist);
router.delete('/event-artists/:id', eventArtistController.deleteEventArtist);

export default router;
