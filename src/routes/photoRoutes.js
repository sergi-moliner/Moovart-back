import express from 'express';
import photoController from '../controllers/photoController.js';

const router = express.Router();

router.get('/photos', photoController.getAllPhotos);
router.get('/photos/:entity_type/:entity_id', photoController.getPhotosByEntity);
router.post('/photos', photoController.createPhoto);
router.put('/photos/:id', photoController.updatePhoto);
router.delete('/photos/:id', photoController.deletePhoto);

export default router;
