import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Photo = sequelize.define('Photo', {
  id_photo: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: { // Relación con el usuario que subió la foto
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  entity_type: {
    type: DataTypes.ENUM('event', 'artist', 'local'),
    allowNull: false
  },
  entity_id: {
    type: DataTypes.INTEGER,
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

User.hasMany(Photo, { foreignKey: 'user_id' });
Photo.belongsTo(User, { foreignKey: 'user_id' });

export default Photo;
