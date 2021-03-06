const { Schema } = require('mongoose');
const connection = require('../config/database');

const WishlistSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      default: [],
    },
  ],
});

const Wishlist = connection.model('Wishlist', WishlistSchema);
module.exports = Wishlist;
