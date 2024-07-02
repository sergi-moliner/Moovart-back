import User from '../models/userModel.js';
import Artist from '../models/artistModel.js';
import Local from '../models/localModel.js';
import Event from '../models/eventModel.js';
import Notification from '../models/notificationModel.js';

export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id_user;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profile = {
      ...user.toJSON(),
      events: await Event.findAll({ where: { user_id: userId } }),
      notifications: await Notification.findAll({ where: { user_id: userId } })
    };

    if (user.user_type === 'artist') {
      profile.artist = await Artist.findOne({ where: { user_id: userId } });
    } else if (user.user_type === 'local') {
      profile.local = await Local.findOne({ where: { user_id: userId } });
    }

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id_user;
    const { name, city, bio, contact, cv, featuredWorks, address, exhibition_space, accepted_sizes } = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ name, city });

    if (user.user_type === 'artist') {
      const artist = await Artist.findOne({ where: { user_id: userId } });
      await artist.update({ bio, contact_info: contact, cv, featured: featuredWorks });
    } else if (user.user_type === 'local') {
      const local = await Local.findOne({ where: { user_id: userId } });
      await local.update({ bio, contact_info: contact, address, exhibition_space, accepted_sizes });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

export const uploadFile = (req, res) => {
  upload.single('file')(req, res, (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload failed', error: err });
    }
    res.json({ message: 'File uploaded successfully', url: `/uploads/${req.file.filename}` });
  });
};
