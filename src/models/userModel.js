import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_type: {
    type: DataTypes.ENUM('artist', 'local'),
    allowNull: false,
  },
}, {
  indexes: [{ unique: true, fields: ['email'] }],
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default User;
