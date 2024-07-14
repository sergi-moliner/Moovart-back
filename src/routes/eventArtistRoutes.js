import express from 'express';
import { getAllEventArtists, getArtistsByEventId, createEventArtist, deleteEventArtist } from '../controllers/eventArtistController.js';

const router = express.Router();

router.get('/event-artists', getAllEventArtists);
router.get('/event-artists/event/:event_id', getArtistsByEventId);
router.post('/event-artists', createEventArtist);
router.delete('/event-artists/:id', deleteEventArtist);

export default router;
