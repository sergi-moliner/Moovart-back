import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';

const Artist = sequelize.define('Artist', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
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
    defaultValue: null
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

User.hasOne(Artist, { foreignKey: 'user_id' });
Artist.belongsTo(User, { foreignKey: 'user_id' });

export default Artist;
