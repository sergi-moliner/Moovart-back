import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Portfolio = sequelize.define('Portfolio', {
  id_portfolio: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  artist_id: {
    type: DataTypes.INTEGER,
    allowNull: false
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

export default Portfolio;