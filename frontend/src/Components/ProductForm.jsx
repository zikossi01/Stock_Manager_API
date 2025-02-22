import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded, onProductEdited, editingProduct }) => {
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageFile, setImageFile] = useState(null); // To handle the selected image file
  const [imagePreview, setImagePreview] = useState(null); // To show a preview of the image

  // Set initial state if editing a product
  useEffect(() => {
    if (editingProduct) {
      setTitle(editingProduct.title);
      setDescription(editingProduct.description);
      setPrice(editingProduct.price);
      setStock(editingProduct.stock);
      setImagePreview(editingProduct.image); // Use the existing product image if editing
    }
  }, [editingProduct]);

  // Handle form submission (create or update product)
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('stock', stock);

    // If there's an image file, append it to the form data
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      if (editingProduct) {
        // Update product
        const response = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        onProductEdited(response.data); // Callback after editing
      } else {
        // Add new product
        const response = await axios.post(
          'http://localhost:5000/api/products',
          formData,
          { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        onProductAdded(response.data); // Callback after adding
      }

      clearForm(); // Clear the form after submission
    } catch (error) {
      console.error('Error adding/editing product:', error);
    }
  };

  // Handle image file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);

      // Create a preview of the image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL to display the image
      };
      reader.readAsDataURL(file);
    }
  };

  // Clear form fields
  const clearForm = () => {
    setTitle('');
    setDescription('');
    setPrice('');
    setStock('');
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col">
        <label htmlFor="title" className="text-sm font-medium text-white">
          Product Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-2 p-3 border border-teal-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="description" className="text-sm font-medium text-white">
          Product Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows="4"
          className="mt-2 p-3 border border-teal-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="price" className="text-sm font-medium text-white">
          Product Price
        </label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          min="0"
          className="mt-2 p-3 border border-teal-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="stock" className="text-sm font-medium text-white">
          Product Stock
        </label>
        <input
          id="stock"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          min="0"
          className="mt-2 p-3 border border-teal-300 rounded-md"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="image" className="text-sm font-medium text-white">
          Product Image
        </label>
        <input
          id="image"
          type="file"
          onChange={handleImageChange}
          required={!editingProduct} // Make sure image is required if editing is not happening
          className="mt-2 p-3 border border-teal-300 rounded-md"
        />
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-32 h-32 object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
      >
        {editingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
