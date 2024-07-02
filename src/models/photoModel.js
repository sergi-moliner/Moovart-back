import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Photo = sequelize.define('Photo', {
  id_photo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entity_type: {
    type: DataTypes.ENUM('event', 'artist', 'local'),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  tags: {
    type: DataTypes.STRING,
    defaultValue: null
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default Photo;