import Photo from '../models/photoModel.js';

export const getAllPhotos = async (req, res) => {
  try {
    const photos = await Photo.findAll();
    res.json(photos);
  } catch (err) {
    res.status(500).send({ error: 'Error retrieving photos', details: err });
  }
};

export const getPhotosByUser = async (req, res) => {
  const { user_id } = req.params;
  try {
    const photos = await Photo.findAll({ where: { user_id } });
    res.json(photos);
  } catch (err) {
    res.status(500).send({ error: 'Error retrieving photos by user', details: err });
  }
};

export const createPhoto = async (req, res) => {
  const { user_id } = req.body;
  const url = req.file ? req.file.path : null;

  if (!url) {
    return res.status(400).send({ error: 'Photo upload failed' });
  }

  try {
    const newPhoto = await Photo.create({ url, user_id });
    res.status(201).send({ id_photo: newPhoto.id_photo });
  } catch (err) {
    res.status(500).send({ error: 'Error creating photo', details: err });
  }
};

export const deletePhoto = async (req, res) => {
  const { id_photo } = req.params;
  try {
    await Photo.destroy({ where: { id_photo } });
    res.status(200).send({ message: 'Photo deleted successfully' });
  } catch (err) {
    res.status(500).send({ error: 'Error deleting photo', details: err });
  }
};
