import Artist from '../models/artistModel.js';
import UserArtist from '../models/userArtistModel.js';

export const getAllArtists = async (req, res) => {
  try {
    const artists = await Artist.findAll({
      include: [{
        model: Photo,
        where: { entity_type: 'artist' },
        required: false
      }]
    });
    res.status(200).json(artists);
  } catch (error) {
    console.error('Error fetching artists:', error);
    res.status(500).json({ message: 'Error fetching artists' });
  }
};


// Rutas protegidas
export const createArtist = async (req, res) => {
  try {
    const { user_id, bio, contact_info, cv, featured, profile_photo_id, featured_work_photo_id, genre, experience_level } = req.body;

    const newArtist = await Artist.create({ bio, contact_info, cv, featured, profile_photo_id, featured_work_photo_id, genre, experience_level });
    await UserArtist.create({ user_id, artist_id: newArtist.id_artist });

    res.status(201).json(newArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create artist' });
  }
};

export const getArtistsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const userArtists = await UserArtist.findAll({ where: { user_id: userId }, include: [Artist] });

    res.status(200).json(userArtists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch artists' });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const updatedData = req.body;

    const [updated] = await Artist.update(updatedData, { where: { id_artist: artistId } });

    if (!updated) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    const updatedArtist = await Artist.findOne({ where: { id_artist: artistId } });

    res.status(200).json(updatedArtist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update artist' });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    await UserArtist.destroy({ where: { artist_id: artistId } });
    const deleted = await Artist.destroy({ where: { id_artist: artistId } });

    if (!deleted) {
      return res.status(404).json({ error: 'Artist not found' });
    }

    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete artist' });
  }
};
