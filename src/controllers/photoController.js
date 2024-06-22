import Photo from '../models/photoModel.js';

const photoController = {
  getAllPhotos: async (req, res) => {
    try {
      const photos = await Photo.findAll();
      res.json(photos);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  getPhotosByEntity: async (req, res) => {
    const { entity_type, entity_id } = req.params;
    try {
      const photos = await Photo.findAll({ where: { entity_type, entity_id } });
      res.json(photos);
    } catch (err) {
      res.status(500).send(err);
    }
  },
  createPhoto: async (req, res) => {
    const { url, entity_type, entity_id, description, tags } = req.body;
    try {
      const newPhoto = await Photo.create({ url, entity_type, entity_id, description, tags });
      res.status(201).send({ id: newPhoto.id });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  updatePhoto: async (req, res) => {
    const { id } = req.params;
    const { url, entity_type, entity_id, description, tags } = req.body;
    try {
      await Photo.update({ url, entity_type, entity_id, description, tags }, { where: { id } });
      res.status(200).send({ message: 'Photo updated successfully' });
    } catch (err) {
      res.status(500).send(err);
    }
  },
  deletePhoto: async (req, res) => {
    const { id } = req.params;
    try {
      await Photo.destroy({ where: { id } });
      res.status(200).send({ message: 'Photo deleted successfully' });
    } catch (err) {
      res.status(500).send(err);
    }
  }
};

export default photoController;
