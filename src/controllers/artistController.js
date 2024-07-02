import Artist from '../models/artistModel.js';
import User from '../models/userModel.js';
import Photo from '../models/photoModel.js';

export const createArtist = async (req, res) => {
  try {
    const { user_id, bio, contact_info, cv, featured, profile_photo_id } = req.body;
    const artist = await Artist.create({ user_id, bio, contact_info, cv, featured, profile_photo_id });
    res.status(201).json({
      code: 1,
      message: 'Artist created successfully',
      data: artist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while creating the artist',
      error: error.message
    });
  }
};

export const getArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id, {
      include: User
    });
    if (!artist) {
      return res.status(404).json({
        code: -10,
        message: 'Artist not found'
      });
    }
    res.status(200).json({
      code: 1,
      message: 'Artist Detail',
      data: artist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while obtaining the artist'
    });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const { bio, contact_info, cv, featured, profile_photo_id } = req.body;
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({
        code: -10,
        message: 'Artist not found'
      });
    }
    artist.bio = bio || artist.bio;
    artist.contact_info = contact_info || artist.contact_info;
    artist.cv = cv || artist.cv;
    artist.featured = featured || artist.featured;
    artist.profile_photo_id = profile_photo_id || artist.profile_photo_id;
    await artist.save();
    res.status(200).json({
      code: 1,
      message: 'Artist updated successfully',
      data: artist
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while updating the artist',
      error: error.message
    });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) {
      return res.status(404).json({
        code: -10,
        message: 'Artist not found'
      });
    }
    await artist.destroy();
    res.status(200).json({
      code: 1,
      message: 'Artist deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'An error occurred while deleting the artist',
      error: error.message
    });
  }
};

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: [User, { model: Photo, as: 'profilePhoto' }, { model: Photo, as: 'featuredWorkPhoto' }]
    });
    res.status(200).json(artists);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'Error al obtener los artistas',
      error: error.message
    });
  }
};
