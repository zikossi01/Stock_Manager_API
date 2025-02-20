// backend/routes/productRoutes.js

const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Routes for the product API
router.get('/', ProductController.getAllProducts);
router.post('/', ProductController.addProduct);
router.put('/:id', ProductController.updateProduct);
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
