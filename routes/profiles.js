const express = require('express');
const router = express.Router();

const { User, Store } = require('../models');

router.get('/user-data', (req, res) => {
  if (req.user === undefined) {
    res.json({})
  } else {
    res.json({ username: req.user.username })
  }
});

router.get('/:username', async (req, res) => {
  // This Mongoose query may take a while for a very large User database.
  // It will have to go through all the users and check if each one's username is :username.
  // Possible solution: use db indexing.
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({
        err: false,
        message: 'User cannot be found.',
        success: false,
      });
    }

    const store = await Store.findOne({ user: user._id }).populate({ path: 'items' }).lean();
    console.log(`${req.params.username}'s store`);
    console.log('Store', store);
    return res.status(200).json({
      products: store.items,
      err: false,
      success: true,
      message: `Retrieved products for ${username}.`
    });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      err: true,
      success: false,
      message: 'Something went wrong. Try again in a bit.',
    });
  }
});

module.exports = router;
