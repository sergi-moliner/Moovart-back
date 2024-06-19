import Local from '../models/localModel.js'; // Asegúrate de importar el modelo correcto
import User from '../models/userModel.js';

export const createLocal = async (req, res) => {
  try {
    const { user_id, name, address, city, bio, exhibition_space, accepted_sizes, contact_info, latitude, longitude, profile_photo_id } = req.body;
    
    // Asegúrate de que todos los datos necesarios están presentes
    if (!user_id || !name) {
      return res.status(400).json({
        code: -1,
        message: 'user_id and name are required'
      });
    }

    // Crea el local
    const local = await Local.create({ user_id, name, address, city, bio, exhibition_space, accepted_sizes, contact_info, latitude, longitude, profile_photo_id });

    res.status(201).json({
      code: 1,
      message: 'Local created successfully',
      data: local
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while creating the local',
      error: error.message
    });
  }
};

export const getLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id, {
      include: User
    });
    if (!local) {
      return res.status(404).json({
        code: -10,
        message: 'Local not found'
      });
    }
    res.status(200).json({
      code: 1,
      message: 'Local Detail',
      data: local
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the local'
    });
  }
};

export const updateLocal = async (req, res) => {
  try {
    const { name, address, city, bio, exhibition_space, accepted_sizes, contact_info, latitude, longitude, profile_photo_id } = req.body;
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({
        code: -10,
        message: 'Local not found'
      });
    }
    local.name = name || local.name;
    local.address = address || local.address;
    local.city = city || local.city;
    local.bio = bio || local.bio;
    local.exhibition_space = exhibition_space || local.exhibition_space;
    local.accepted_sizes = accepted_sizes || local.accepted_sizes;
    local.contact_info = contact_info || local.contact_info;
    local.latitude = latitude || local.latitude;
    local.longitude = longitude || local.longitude;
    local.profile_photo_id = profile_photo_id || local.profile_photo_id;
    await local.save();
    res.status(200).json({
      code: 1,
      message: 'Local updated successfully',
      data: local
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while updating the local',
      error: error.message
    });
  }
};

export const deleteLocal = async (req, res) => {
  try {
    const local = await Local.findByPk(req.params.id);
    if (!local) {
      return res.status(404).json({
        code: -10,
        message: 'Local not found'
      });
    }
    await local.destroy();
    res.status(200).json({
      code: 1,
      message: 'Local deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while deleting the local',
      error: error.message
    });
  }
};
