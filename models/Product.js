const { Schema } = require('mongoose');
const connection = require('../config/database');

const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  sellers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  boughtFreq: {
    type: Number,
    default: 0,
  },
  addedToWishlistFreq: {
    type: Number,
    default: 0,
  },
});

const Product = connection.model('Product', ProductSchema);
module.exports = Product;
