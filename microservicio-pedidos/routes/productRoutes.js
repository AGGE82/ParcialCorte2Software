const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/crear', productController.createProduct);
router.get('/', productController.getProducts);

module.exports = router;
