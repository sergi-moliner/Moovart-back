import Local from '../models/localModel.js';
import UserLocal from '../models/userLocalModel.js';
import Photo from '../models/photoModel.js';

// Rutas públicas
export const getAllLocals = async (req, res) => {
  try {
    const locals = await Local.findAll({
      include: [{
        model: Photo,
        as: 'photos'
      }]
    });
    res.json(locals);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching locals.' });
  }
};

// Rutas protegidas
export const createLocal = async (req, res) => {
  try {
    const { user_id, name, address, city, bio, exhibition_space, accepted_sizes, contact_info, latitude, longitude, profile_photo_id } = req.body;

    const newLocal = await Local.create({ name, address, city, bio, exhibition_space, accepted_sizes, contact_info, latitude, longitude, profile_photo_id });
    await UserLocal.create({ user_id, local_id: newLocal.id_local });

    res.status(201).json(newLocal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create local' });
  }
};

export const getLocalsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userLocals = await UserLocal.findAll({ where: { user_id: userId }, include: [Local] });

    res.status(200).json(userLocals);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch locals' });
  }
};

export const updateLocal = async (req, res) => {
  try {
    const { localId } = req.params;
    const updatedData = req.body;

    const [updated] = await Local.update(updatedData, { where: { id_local: localId } });

    if (!updated) {
      return res.status(404).json({ error: 'Local not found' });
    }

    const updatedLocal = await Local.findOne({ where: { id_local: localId } });

    res.status(200).json(updatedLocal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update local' });
  }
};

export const deleteLocal = async (req, res) => {
  try {
    const { localId } = req.params;

    await UserLocal.destroy({ where: { local_id: localId } });
    const deleted = await Local.destroy({ where: { id_local: localId } });

    if (!deleted) {
      return res.status(404).json({ error: 'Local not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete local' });
  }
};
