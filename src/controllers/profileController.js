import User from '../models/userModel.js';
import Profile from '../models/profileModel.js';
import Artist from '../models/artistModel.js';
import Local from '../models/localModel.js';
import Event from '../models/eventModel.js';
import Notification from '../models/notificationModel.js';
import Photo from '../models/photoModel.js';


// Obtener perfil del usuario
export const getProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findByPk(userId, { include: [Profile] });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const photos = await Photo.findAll({ where: { user_id: userId } });
    const photoUrls = photos.map(photo => photo.url);

    const profileData = {
      id_user: user.id_user,
      name: user.name,
      email: user.email,
      city: user.city,
      user_type: user.user_type,
      profile_photo_url: user.Profile ? `/uploads/${user.Profile.profile_photo_url}` : '',
      bio: user.Profile ? user.Profile.bio : '',
      website: user.Profile ? user.Profile.website : '',
      events: await Event.findAll({ where: { user_id: userId } }),
      notifications: await Notification.findAll({ where: { user_id: userId } }),
      photos: photoUrls
    };

    if (user.user_type === 'artist') {
      profileData.artist = await Artist.findOne({ where: { user_id: userId } });
    } else if (user.user_type === 'local') {
      profileData.local = await Local.findOne({ where: { user_id: userId } });
    }

    res.json(profileData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, city, bio, website, user_type } = req.body;
    const profilePhoto = req.file ? req.file.filename : null;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    await user.update({ name, city, user_type });

    const profile = await Profile.findOne({ where: { user_id: userId } });
    if (profile) {
      await profile.update({ bio, website, profile_photo_url: profilePhoto || profile.profile_photo_url });
    }

    if (user.user_type === 'artist') {
      const artist = await Artist.findOne({ where: { user_id: userId } });
      if (artist) {
        await artist.update({ bio, website });
      }
    } else if (user.user_type === 'local') {
      const local = await Local.findOne({ where: { user_id: userId } });
      if (local) {
        await local.update({ bio, website });
      }
    }

    res.json({ message: 'Perfil actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// Subir archivo
export const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }
    res.json({ message: 'File uploaded successfully', url: `/uploads/${req.file.filename}` });
  });
};

export const uploadPhotos = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const photoUrls = req.files.map(file => `/uploads/${file.filename}`);

    await Photo.bulkCreate(photoUrls.map(url => ({ user_id: userId, url })));

    res.json({ message: 'Photos uploaded successfully', photoUrls });
  } catch (error) {
    console.error('Error uploading photos:', error);
    res.status(500).json({ message: 'Server error' });
  }
};