const { Schema } = require('mongoose');
const connection = require('../config/database');

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    // unique: true,
  },
  email: {
    type: String,
    required: true,
    // unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  store: {
    type: Schema.Types.ObjectId,
  },
  cart: {
    type: Schema.Types.ObjectId,
  },
  wishlist: {
    type: Schema.Types.ObjectId,
  },
});

const User = connection.model('User', UserSchema);
module.exports = User;
