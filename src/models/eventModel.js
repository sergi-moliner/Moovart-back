import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Event = sequelize.define('Event', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  venue_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  opening_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  closing_date: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  address: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  city: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  event_type: {
    type: DataTypes.ENUM('local', 'collaboration'),
    allowNull: false
  },
  sought_artists: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  contact_details: {
    type: DataTypes.JSON,
    defaultValue: null
  },
  optional_details: {
    type: DataTypes.TEXT,
    defaultValue: null
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: null
  },
  all_day: {
    type: DataTypes.BOOLEAN,
    defaultValue: null
  },
  profile_photo_id: {
    type: DataTypes.INTEGER,
    defaultValue: null
  },
  confirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  confirmation_date: {
    type: DataTypes.DATE,
    defaultValue: null
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default Event;
