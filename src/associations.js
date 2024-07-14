// src/associations.js
import User from './models/userModel.js';
import Artist from './models/artistModel.js';
import Local from './models/localModel.js';
import Event from './models/eventModel.js';
import EventArtist from './models/eventArtistModel.js';
import Portfolio from './models/portfolioModel.js';
import Subscription from './models/subscriptionModel.js';
import Notification from './models/notificationModel.js';
import Photo from './models/photoModel.js';
import Profile from './models/profileModel.js';

User.belongsToMany(Artist, { through: 'UserArtists', foreignKey: 'user_id' });
Artist.belongsToMany(User, { through: 'UserArtists', foreignKey: 'artist_id' });

User.belongsToMany(Local, { through: 'UserLocals', foreignKey: 'user_id' });
Local.belongsToMany(User, { through: 'UserLocals', foreignKey: 'local_id' });

Artist.hasMany(Photo, { foreignKey: 'entity_id', constraints: false, scope: { entity_type: 'artist' } });
Photo.belongsTo(Artist, { foreignKey: 'artist_id' });

Local.hasMany(Photo, { foreignKey: 'local_id' });
Photo.belongsTo(Local, { foreignKey: 'local_id' });

User.hasMany(Event, { foreignKey: 'user_id' });
Event.belongsTo(User, { foreignKey: 'user_id' });

Artist.belongsToMany(Event, { through: EventArtist, foreignKey: 'artist_id' });
Event.belongsToMany(Artist, { through: EventArtist, foreignKey: 'event_id' });

User.hasMany(Subscription, { foreignKey: 'user_id' });
Subscription.belongsTo(User, { foreignKey: 'user_id' });

Event.hasMany(Subscription, { foreignKey: 'event_id' });
Subscription.belongsTo(Event, { foreignKey: 'event_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

Subscription.hasMany(Notification, { foreignKey: 'subscription_id' });
Notification.belongsTo(Subscription, { foreignKey: 'subscription_id' });

User.hasOne(Profile, { foreignKey: 'user_id' });
Profile.belongsTo(User, { foreignKey: 'user_id' });

export {
  User,
  Artist,
  Local,
  Event,
  EventArtist,
  Portfolio,
  Subscription,
  Notification,
  Photo,
  Profile  
};
