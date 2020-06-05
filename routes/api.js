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
      productName,
      productPrice,
      username
    } = req.body;
    if (!isValidName(productName) || !isValidPrice(productPrice)) {
      return res.status(200).json({
        err: false,
        success: false,
        message: 'Product name should contain alphanumeric characters and/or spaces. Product price should be a number.',
      });
    }
    const [product, user] = await Promise.all([
      Product.create({ name: productName, price: productPrice }),
      User.findOne({ username }),
    ]);
    await Product.findOneAndUpdate({ _id: product._id }, { $push: { sellers: user._id } });
    // Need to add it to the user's store.
    await Store.updateOne({ user: user._id }, { $push: { items: product._id } });
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
    if (!isValidName(updatedName) || !isValidPrice(updatedPrice)) {
      return res.status(200).json({
        err: false,
        success: false,
        message: 'Product name should contain alphanumeric characters and/or spaces. Product price should be a number.',
      });
    }
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

router.get('/profile/:username', async (req, res) => {
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

function isValidName(name) {
 return name.match(/^([A-Za-z0-9]+(\s)*[A-Za-z0-9]+)+$/g);
}

function isValidPrice(price) {
  return +price === +price;
}

module.exports = router;
