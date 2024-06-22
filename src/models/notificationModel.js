import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Subscription from './subscriptionModel.js';

const Notification = sequelize.define('Notification', {
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
      key: 'id_user'
    }
  },
  subscription_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Subscription,
      key: 'id_subscription'
    }
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

User.hasMany(Notification, { foreignKey: 'user_id' });
Subscription.hasMany(Notification, { foreignKey: 'subscription_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });
Notification.belongsTo(Subscription, { foreignKey: 'subscription_id' });

export default Notification;
