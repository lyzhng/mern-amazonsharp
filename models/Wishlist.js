const { Schema } = require('mongoose');
const connection = require('../config/database');

const WishlistSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
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
