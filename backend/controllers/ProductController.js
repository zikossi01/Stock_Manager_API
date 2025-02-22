const Product = require('../models/Product');
const path = require('path');

// Add multer for file upload handling
const multer = require('multer');
const fs = require('fs');

// Set up storage engine for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/'; // Directory for storing images
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// Initialize multer with storage configuration
const upload = multer({ storage });

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
};

// Add a new product (with image upload)
const addProduct = async (req, res) => {
  try {
    // If an image file is provided, handle the file upload
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : ''; // Save image path in database

    const { title, description, price, stock } = req.body;

    // Create a new product and save to database
    const newProduct = new Product({
      title,
      description,
      price,
      stock,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // If an image file is provided, handle the file upload
    const image = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : req.body.image;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body, image }, // Update product with image if provided
      { new: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  upload, // Export the upload middleware for use in routes
};
