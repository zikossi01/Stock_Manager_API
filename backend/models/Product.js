// backend/models/Product.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // Created at and Updated at fields
  }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
