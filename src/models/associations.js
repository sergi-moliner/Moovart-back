import User from './userModel.js';
import Artist from './artistModel.js';
import Local from './localModel.js';
import Event from './eventModel.js';
import EventArtist from './eventArtistModel.js';
import Portfolio from './portfolioModel.js';
import Subscription from './subscriptionModel.js';
import Notification from './notificationModel.js';
import Photo from './photoModel.js';

User.hasOne(Artist, { foreignKey: 'user_id' });
User.hasOne(Local, { foreignKey: 'user_id' });
User.hasMany(Event, { foreignKey: 'user_id' });
User.hasMany(Photo, { foreignKey: 'user_id' });
User.hasMany(Subscription, { foreignKey: 'user_id' });
User.hasMany(Notification, { foreignKey: 'user_id' });

Artist.belongsTo(User, { foreignKey: 'user_id' });
Artist.hasMany(Portfolio, { foreignKey: 'artist_id' });
Artist.hasMany(EventArtist, { foreignKey: 'artist_id' });

Local.belongsTo(User, { foreignKey: 'user_id' });

Event.belongsTo(User, { foreignKey: 'user_id' });
Event.hasMany(EventArtist, { foreignKey: 'event_id' });
Event.hasMany(Subscription, { foreignKey: 'event_id' });

EventArtist.belongsTo(Event, { foreignKey: 'event_id' });
EventArtist.belongsTo(Artist, { foreignKey: 'artist_id' });

Portfolio.belongsTo(Artist, { foreignKey: 'artist_id' });

Subscription.belongsTo(User, { foreignKey: 'user_id' });
Subscription.belongsTo(Event, { foreignKey: 'event_id' });
Subscription.hasMany(Notification, { foreignKey: 'subscription_id' });

Notification.belongsTo(User, { foreignKey: 'user_id' });
Notification.belongsTo(Subscription, { foreignKey: 'subscription_id' });

Photo.belongsTo(User, { foreignKey: 'user_id' });

export {
  User,
  Artist,
  Local,
  Event,
  EventArtist,
  Portfolio,
  Subscription,
  Notification,
  Photo
};