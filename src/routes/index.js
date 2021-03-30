const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const productRouter = require('./products.route');
const orderRouter = require('./orders.route');
const categoryRouter = require('./categoryz.route');
const checkoutRouter = require('./checkout.route');

router.use(userRouter);
router.use(productRouter);
router.use(orderRouter);
router.use(categoryRouter);
router.use(checkoutRouter);

module.exports = router;