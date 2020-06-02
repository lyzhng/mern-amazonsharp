const { Schema } = require('mongoose');
const connection = require('../config/database');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  store: {
    type: Schema.Types.ObjectId,
    ref: 'Store'
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: 'Cart'
  },
  wishlist: {
    type: Schema.Types.ObjectId,
    ref: 'Wishlist'
  },
});

const User = connection.model('User', UserSchema);
module.exports = User;
