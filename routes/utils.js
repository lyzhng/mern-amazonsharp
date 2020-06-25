const { body } = require('express-validator');
const { User, Store, Cart, Wishlist } = require('../models');
const { USERNAME_IN_USE_MSG, EMAIL_IN_USE_MSG } = require('../config/constants');

async function createUser(username, email, hash) {
  const user = await User.create({ username, email, password: hash });
  const [store, cart, wishlist] = await Promise.all([
    Store.create({ user: user._id }), 
    Cart.create({ user: user._id }),
    Wishlist.create({ user: user._id }),
  ]);
  await User.updateOne({ _id: user._id }, {
    store: store._id,
    cart: cart._id,
    wishlist: wishlist._id,
  });
}

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.json({
      message: 'You need to be logged in to access this page.'
    });
  }
}

function isValidName(name) {
  return name.match(/^([A-Za-z0-9]+(\s)*[A-Za-z0-9]+)+$/g);
}

function isValidPrice(price) {
  return +price === +price;
}

const validateRegistration = [
  body('username').isLength({ min: 6, max: 16 }).isAlphanumeric(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('email').custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      return Promise.reject(EMAIL_IN_USE_MSG);
    }
  }),
  body('username').custom(async (username) => {
    const user = await User.findOne({ username });
    if (user) {
      return Promise.reject(USERNAME_IN_USE_MSG);
    }
  }),
]

module.exports = {
  checkAuth,
  isValidName,
  isValidPrice,
  createUser,
  validateRegistration
}
