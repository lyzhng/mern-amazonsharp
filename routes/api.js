const express = require('express');
const router = express.Router();

const authRouter = require('./auth');
const productRouter = require('./products');
const profileRouter = require('./profiles');

router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/profiles', profileRouter);

module.exports = router;
