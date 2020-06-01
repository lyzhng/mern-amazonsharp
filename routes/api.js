const express = require('express');
const router = express.Router();

const { Product } = require('../models');

router.get('/user_data', (req, res) => {
  if (req.user === undefined) {
    res.json({})
  } else {
    res.json({ username: req.user.username })
  }
})

router.get('/products', async (req, res) => {
  const products = await Product.find({}).lean();
  res.status(200).send({ products });
});

module.exports = router;