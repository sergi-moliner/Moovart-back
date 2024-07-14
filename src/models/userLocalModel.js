import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Local from './localModel.js';

const UserLocal = sequelize.define('UserLocal', {
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id_user'
    }
  },
  local_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Local,
      key: 'id_local'
    }
  }
}, {
  timestamps: false
});

export default UserLocal;
