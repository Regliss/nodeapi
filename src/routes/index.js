const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const productRouter = require('./products.route');
const orderRouter = require('./orders.route');

router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);

module.exports = router;