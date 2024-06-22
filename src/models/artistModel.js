import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Photo from './photoModel.js';

const Artist = sequelize.define('Artist', {
  id_artist: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  contact_info: {
    type: DataTypes.JSON,
    defaultValue: null
  },
  cv: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  featured: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  profile_photo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Photo,
      key: 'id_photo'
    }
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

User.hasOne(Artist, { foreignKey: 'user_id' });
Artist.belongsTo(User, { foreignKey: 'user_id' });
Photo.hasMany(Artist, { foreignKey: 'profile_photo_id' });
Artist.belongsTo(Photo, { foreignKey: 'profile_photo_id' });

export default Artist;
