import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Artist = sequelize.define('Artist', {
  id_artist: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  contact_info: {
    type: DataTypes.STRING,
    allowNull: true
  },
  cv: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  featured: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  profile_photo_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  featured_work_photo_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: true
  },
  experience_level: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});


export default Artist;
