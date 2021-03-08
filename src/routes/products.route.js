const express = require('express');
const router = express.Router();
const product = require('../controllers/products.controller');

router.post('/product', product.create);
router.get('/products/:id', product.getProduct);
router.get('/products/', product.getProducts);

module.exports = router;