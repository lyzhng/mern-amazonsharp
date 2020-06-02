const { Schema } = require('mongoose');
const connection = require('../config/database');

const CartSchema = new Schema({
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

const Cart = connection.model('Cart', CartSchema);
module.exports = Cart;
