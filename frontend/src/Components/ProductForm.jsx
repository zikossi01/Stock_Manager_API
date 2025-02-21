import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded, onProductEdited, editingProduct }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
      setImageUrl(editingProduct.imageUrl);
    } else {
      clearForm();
    }
  }, [editingProduct]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const productData = { title, description, price, stock, imageUrl };

    if (editingProduct) {
      // Edit the product
      try {
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          productData
        );
        onProductEdited(response.data); // Notify parent component of the update
        clearForm();
      } catch (error) {
        console.error('Error editing product:', error);
      }
    } else {
      // Add a new product
      try {
        const response = await axios.post('http://localhost:5000/api/products', productData);
        onProductAdded(response.data); // Notify parent component of the new product
        clearForm();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    }
  };

  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageUrl('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col relative">
        <label htmlFor="title" className="text-sm font-medium text-white transition-all transform focus:scale-110 focus:text-teal-300">
          Product Title
        </label>
        <input
          id="title"
          type=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
        />
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="description" className="text-sm font-medium text-white transition-all transform focus:scale-110 focus:text-teal-300">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-2 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col relative">
          <label htmlFor="price" className="text-sm font-medium text-white transition-all transform focus:scale-110 focus:text-teal-300">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="mt-2 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="stock" className="text-sm font-medium text-white transition-all transform focus:scale-110 focus:text-teal-300">
            Stock
          </label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            className="mt-2 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col relative">
        <label htmlFor="imageUrl" className="text-sm font-medium text-white transition-all transform focus:scale-110 focus:text-teal-300">
          Image URL
        </label>
        <input
          id="imageUrl"
          type="file"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="mt-2 p-3 border border-teal-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all transform hover:scale-105"
        />
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all transform hover:scale-105 hover:shadow-xl"
      >
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
