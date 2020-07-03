const express = require('express');
const { validationResult } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const { validateRegistration, createUser } = require('./utils');
const { User } = require('../models');
const { 
  USERNAME_IN_USE_MSG, 
  EMAIL_IN_USE_MSG, 
  EMAIL_OR_USERNAME_EXISTS_MSG, 
  AUTH_SUCCESS_MSG 
} = require('../config/constants');

router.post('/register', validateRegistration, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.error(errors);
    const exists = errors.array().filter(err => err.msg === USERNAME_IN_USE_MSG || err.msg === EMAIL_IN_USE_MSG);
    if (exists) {
      return res.status(200).json({
        message: EMAIL_OR_USERNAME_EXISTS_MSG,
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
    bcrypt.genSalt(+process.env.HASH_ITER, (saltErr, salt) => {
      if (saltErr) {
        return res.json({
          err: true,
          message: 'There was an error with salting.',
          success: false,
        });
      }

      bcrypt.hash(password, salt, async (hashErr, hash) => {
        if (hashErr) {
          return res.json({
            err: true,
            message: 'There was an error with hashing.',
            success: false,
          });
        }
        createUser(username, email, hash);
      });
    });

    return res.status(200).json({
      message: 'Registration successful.',
      err: false,
      success: true,
      username 
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
  passport.authenticate('local', (err, user, info) => { // eslint-disable-line no-unused-vars
    if (err) {
      next(err)
    }
    if (!user) {
      return res.status(200).json({
        message: 'Authentication failed. Cannot retrieve user.',
        success: false,
        err: false,
      })
    }
    req.login(user, async (loginErr) => {
      if (loginErr) {
        return next(loginErr);
      }
      const email = req.body.email;
      const { username } = await User.findOne({ email });
      return res.status(200).json({
        message: AUTH_SUCCESS_MSG,
        success: true,
        err: false,
        username
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
