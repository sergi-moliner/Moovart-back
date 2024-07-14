import { Router } from 'express';
import { createArtist, getArtistsByUser, updateArtist, deleteArtist, getAllArtists } from '../controllers/artistController.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';

const router = Router();


router.get('/', getAllArtists);

router.post('/', authenticateToken(['user']), createArtist);
router.get('/user/:userId', authenticateToken(['user']), getArtistsByUser);
router.put('/:artistId', authenticateToken(['user']), updateArtist);
router.delete('/:artistId', authenticateToken(['user']), deleteArtist);

export default router;
