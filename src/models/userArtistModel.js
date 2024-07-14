import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Artist from './artistModel.js';

const UserArtist = sequelize.define('UserArtist', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  artist_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Artist,
      key: 'id_artist'
    }
  }
}, {
  timestamps: false
});

export default UserArtist;
