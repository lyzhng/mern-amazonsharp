const express = require('express');
const { check, body, validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

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
    return res.status(422).json({ errors: errors.array() });
  }
  const { email, username, password } = req.body;

  bcrypt.hash(password, process.env.HASH_ITER, async (err, hash) => {
    if (err) {
      return res.status(500).json({
        err: 'An error has occurred during while hashing the password.',
      });
    }
    await User.create({ username, email, password: hash, });
    res.status(200).json({ redirectLoc: '/login' });
  })
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log(req.user)
  return res.status(200).json({
    message: 'Login successful.',
    redirectLoc: '/'
  })
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.json({ err });
    }
    res.clearCookie('sid');
    res.json({
      redirectLoc: '/'
    })
  })
})

module.exports = router;