import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Photo from './photoModel.js';

const Local = sequelize.define('Local', {
  id_local: {
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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  bio: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  exhibition_space: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  accepted_sizes: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  contact_info: {
    type: DataTypes.JSON,
    defaultValue: null
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    defaultValue: null
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
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

User.hasOne(Local, { foreignKey: 'user_id' });
Local.belongsTo(User, { foreignKey: 'user_id' });

export default Local;
