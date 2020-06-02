const express = require('express');
const router = express.Router();

const { User, Product, Store } = require('../models');

router.get('/user_data', (req, res) => {
  if (req.user === undefined) {
    res.json({})
  } else {
    res.json({ username: req.user.username })
  }
})

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({}).lean();
    res.status(200).send({ products });
  } catch (err) {
    console.error(err);
    res.status(200).json({
      err: true,
      success: false,
      message: 'Something went wrong. Try again in a bit.',
    });
  }
});

router.post('/products/new', async (req, res) => {
  try {
    const {
      name,
      price,
      username
    } = req.body;
    const product = await Product.create({ name, price });
    const user = await User.findOne({ username });
    await Product.findOneAndUpdate({ _id: product._id }, { $push: { sellers: user._id } });
    // Need to add it to the user's store.
    const store = await Store.findOneAndUpdate({}, { $push: { items: product._id } })
      .populate({
        path: 'user',
        match: { _id: { $in: [user._id] } }
      })
      .lean();
    res.status(200).json({
      err: false,
      success: true,
      message: 'Successfully posted a new item!',
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

router.put('/products/update', async (req, res) => {
  try {
    console.log('Updating product.');
    const {
      productId,
      updatedPrice,
      updatedName
    } = req.body;
    console.log(req.body);
    await Product.updateOne({ _id: productId }, {
      price: updatedPrice,
      name: updatedName,
    });
    res.status(200).json({
      message: 'Successfully updated the product.',
      err: false,
      success: true,
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

router.delete('/products/delete', async (req, res) => {
  try {
    console.log('Arrived at /api/products/delete.');
    console.log(req.body);
    const productId = req.body.productId;
    await Product.deleteOne({ _id: productId });
    // TODO: Delete it from user's store.

    res.status(200).json({
      message: 'Successfully deleted the product.',
      err: false,
      success: true,
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

router.get('/store/:username', async (req, res) => {
  // This Mongoose query may take a while for a very large User database.
  // It will have to go through all the users and check if each one's username is :username.
  // Possible solution: use db indexing.
  try {
    // TODO: Find a way to avoid populating the items when store.user is null or find a way that will return `:username`'s items.
    const store = await Store.findOne()
      .populate({
        path: 'user',
        match: { username: { $in: [req.params.username] } }
      })
      .populate('items')
      .lean();
    console.log(`${req.params.username}'s store`);
    console.log(store);
    return (store.user !== null && store.items !== null)
      ? res.status(200).json({ products: store.items })
      : res.status(200).json({ products: [] });
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
