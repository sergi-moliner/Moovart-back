import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Event from './eventModel.js';

const Subscription = sequelize.define('Subscription', {
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
  event_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event,
      key: 'id_event'
    }
  },
  subscription_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false
});

User.hasMany(Subscription, { foreignKey: 'user_id' });
Event.hasMany(Subscription, { foreignKey: 'event_id' });
Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.belongsTo(Event, { foreignKey: 'event_id' });

export default Subscription;
