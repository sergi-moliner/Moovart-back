import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

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
      model: 'Users',
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
    defaultValue: null,
    references: {
      model: 'Photos',
      key: 'id_photo'
    }
  },
  featured_work_photo_id: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  genre: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  experience_level: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default Artist;
