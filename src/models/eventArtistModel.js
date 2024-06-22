import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Event from './eventModel.js';
import Artist from './artistModel.js';

const EventArtist = sequelize.define('EventArtist', {
  id_eventArtist: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id_event'
    }
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artist,
      key: 'id_artist'
    }
  }
}, {
  timestamps: false
});

Event.belongsToMany(Artist, { through: EventArtist, foreignKey: 'event_id' });
Artist.belongsToMany(Event, { through: EventArtist, foreignKey: 'artist_id' });

export default EventArtist;
