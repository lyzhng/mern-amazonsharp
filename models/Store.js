const { Schema } = require('mongoose');
const connection = require('../config/database');

const StoreSchema = new Schema({
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

const Cart = connection.model('Store', StoreSchema);
module.exports = Cart;
