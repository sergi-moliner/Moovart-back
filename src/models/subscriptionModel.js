import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const Subscription = sequelize.define('Subscription', {
  id_subscription: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  subscription_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  updatedAt: 'updated_at',
  createdAt: 'created_at'
});

export default Subscription;