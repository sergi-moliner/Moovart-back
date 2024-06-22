import util from 'util';
import multer from 'multer';
import path from 'path';

const maxSize = 10 * 1024 * 1024; // Aumentar el tamaño máximo del archivo a 10MB

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/uploads/');
  },
  filename: (req, file, cb) => {
    console.log("file.originalname: " + file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|pdf|mp4|avi|mov/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no soportado'));
  }
};

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: fileFilter
}).single("file");

export const uploadFileMiddleware = util.promisify(uploadFile);
