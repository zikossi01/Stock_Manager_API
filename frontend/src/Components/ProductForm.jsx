import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newProduct = { title, description, price, stock, imageUrl };

    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      onProductAdded(response.data);
      clearForm();
    } catch (error) {
      console.error('Error adding product:', error.response?.data?.message || error.message);
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
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium text-gray-700">Product Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 p-4 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-2 p-4 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium text-gray-700">Price ($)</label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
            className="mt-2 p-4 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock</label>
          <input
            id="stock"
            type="number"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
            className="mt-2 p-4 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>
      </div>

      <div className="flex flex-col">
        <label htmlFor="imageUrl" className="text-sm font-medium text-gray-700">Image URL</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          className="mt-2 p-4 border border-pink-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-pink-400 to-pink-600 text-white font-semibold rounded-xl hover:from-pink-500 hover:to-pink-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default ProductForm;
