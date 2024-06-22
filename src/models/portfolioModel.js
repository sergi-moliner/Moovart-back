import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import Artist from './artistModel.js'; 

const Portfolio = sequelize.define('Portfolio', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Artist,
      key: 'id_artist'
    }
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('image', 'document', 'video'),
    allowNull: false
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

Artist.hasMany(Portfolio, { foreignKey: 'artist_id' });
Portfolio.belongsTo(Artist, { foreignKey: 'artist_id' });

export default Portfolio;
