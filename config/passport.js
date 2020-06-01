const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models/index');
const bcrypt = require('bcrypt');

const customFields = {
  usernameField: 'email',
  passwordField: 'password',
};

const verifyCallback = (email, password, done) => {
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          return done(err)
        }
        if (res) {
          return done(null, user);
        }
        return done(null, false);
      })
    })
    .catch(err => {
      done(err);
    });
};

const strategy = new LocalStrategy(customFields, verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  console.log('SERIALIZING', user)
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  console.log('DESERIALIZING', userId)
  User.findById(userId)
    .then(user => {
      done(null, user);
    })
    .catch(err => done(err));
});

