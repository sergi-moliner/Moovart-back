import { Router } from 'express';
import { getProfile, updateProfile, uploadFile, uploadPhotos } from '../controllers/profileController.js';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Ajusta la ruta según tu estructura de proyecto
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const router = Router();

// Rutas para perfil de usuario
router.get('/:userId', getProfile); // Nota: cambiamos a userId para coincidir con el controlador
router.put('/:userId', upload.single('profile_photo'), updateProfile);
router.put('/:userId/photo', upload.single('profile_photo'), uploadFile);
router.post('/:userId/photos', upload.array('photos', 5), uploadPhotos);

export default router;
