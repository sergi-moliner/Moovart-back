import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Artist from './artistModel.js';

const EventArtist = sequelize.define('EventArtist', {
  id_event_artist: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});


export default EventArtist;