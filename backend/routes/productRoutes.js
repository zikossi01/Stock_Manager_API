const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Routes for product API
router.get('/', ProductController.getAllProducts);

// Use multer for file upload when adding a product
router.post('/', ProductController.upload.single('image'), ProductController.addProduct);

// Use multer for file upload when updating a product
router.put('/:id', ProductController.upload.single('image'), ProductController.updateProduct);

router.delete('/:id', ProductController.deleteProduct);

module.exports = router;
