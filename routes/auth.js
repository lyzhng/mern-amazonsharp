const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');

const { User } = require('../models');

const HASH_ITERATIONS = 10;

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

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const [userWithUsername, userWithEmail] = await Promise.all([User.findOne({ email }), User.findOne({ username })]);

  if (!userWithUsername && !userWithEmail) {
    bcrypt.hash(password, HASH_ITERATIONS, async (err, hash) => {
      if (err) {
        console.log('An error has occurred during while hashing the password.');
        return res.status(500).json({ err });
      }
      await User.create({
        username,
        email,
        password: hash,
      });
      res.status(200).json({
        redirectLoc: '/login',
      });
    });
  } else {
    return res.status(409).json({
      message: 'User with username or email already exists!',
    });
  }
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  console.log(req.user)
  return res.status(200).json({
    message: 'Login successful.',
    redirectLoc: '/'
  })
});

module.exports = router;