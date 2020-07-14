const express = require('express');
const router = express.Router();
const multer = require('multer');

const { User, Product, Store } = require('../models');
const { checkAuth, isValidName, isValidPrice } = require('./utils');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  }
});

router.get('/', async (req, res) => {
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

const upload = multer({ storage});
router.post('/', checkAuth, upload.single('file'), async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      username,
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

router.put('/', checkAuth, async (req, res) => {
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

router.delete('/', checkAuth, async (req, res) => {
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

module.exports = router;
