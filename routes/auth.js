const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User, Cart, Store, Wishlist } = require('../models');

router.post('/register', [
  body('username').isLength({ min: 6, max: 16 }).isAlphanumeric(),
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  body('email').custom(async (email) => {
    const user = await User.findOne({ email });
    if (user) {
      return Promise.reject('E-mail is already in use.')
    }
  }),
  body('username').custom(async (username) => {
    const user = await User.findOne({ username });
    if (user) {
      return Promise.reject('Username is already in use.')
    }
  }),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors);
    const exists = errors.array().filter(err => err.msg === 'Username is already in' || err.msg === 'E-mail is already in use.');
    if (exists) {
      return res.status(200).json({
        message: 'E-mail or username already exists.',
        err: false,
        success: false
      })
    }
    return res.status(200).json({
      message: 'Follow the guidelines for email, username, and password inputs.',
      err: false,
      success: false,
    });
  }
  const { email, username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync(+process.env.HASH_ITER);
    const hash = bcrypt.hashSync(password, salt);
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
    res.status(200).json({
      message: 'Registration successful.',
      err: false,
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: 'An error has occurred during while hashing the password.',
      err: true,
      success: false,
    });
  }
});

/**
 * Handling Passport auth by yourself https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling
 */
router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      next(err)
    }
    if (!user) {
      return res.status(200).json({
        message: 'Authention failed. Cannot retrieve user.',
        success: false,
        err: false,
      })
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr)
      }
      return res.status(200).json({
        message: 'Authentication successful.',
        success: true,
        err: false,
      })
    })
  })(req, res, next);
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.json({
        err: true,
        message: 'Session could not be destroyed.',
        success: false,
      });
    }
    res.clearCookie('sid');
    res.json({
      message: 'Logout successful.',
      success: true,
      err: false
    })
  })
})

module.exports = router;
