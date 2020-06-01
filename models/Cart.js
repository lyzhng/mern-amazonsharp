const { Schema } = require('mongoose');
const connection = require('../config/database');

const CartSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

const Cart = connection.model('Cart', CartSchema);
module.exports = Cart;
