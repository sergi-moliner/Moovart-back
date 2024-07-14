import express from 'express';
import { getAllPhotos, getPhotosByUser, createPhoto, deletePhoto } from '../controllers/photoController.js';
import { uploadFileMiddleware } from '../middlewares/upload.js'; 

const router = express.Router();

router.get('/', getAllPhotos);
router.get('/user/:user_id', getPhotosByUser);
router.post('/', async (req, res, next) => {
  try {
    await uploadFileMiddleware(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: `Could not upload the file: ${err}`,
    });
  }
}, createPhoto);
router.delete('/:id_photo', deletePhoto);

export default router;
