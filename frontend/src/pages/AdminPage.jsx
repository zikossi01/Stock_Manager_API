import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // State for editing a product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductAdded = (newProduct) => {
    // Add the new product at the start of the list
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const handleProductEdited = (updatedProduct) => {
    setProducts(products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    ));
    setEditingProduct(null); // Clear editing state after successful edit
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-800 via-gray-900 to-black overflow-x-hidden">
      <div className="flex-grow">
        {/* Admin Header */}
        <header className="text-center py-6">
          <h1 className="text-5xl font-extrabold text-gray-100">Admin Dashboard</h1>
          <p className="text-lg text-gray-400 mt-2">Manage your store's products with ease</p>
        </header>

        {/* Product Form Section */}
        <main className="flex-grow">
          <section className="bg-gray-800 p-8 max-w-4xl mx-auto rounded-xl shadow-xl border-2 border-teal-700 transition-transform transform hover:scale-105">
            <h2 className="text-4xl font-semibold text-teal-300 mb-4">
              {editingProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <ProductForm
              onProductAdded={handleProductAdded}
              onProductEdited={handleProductEdited}
              editingProduct={editingProduct}
            />
          </section>

          {/* Product List Section */}
          <section className="py-6">
            <h2 className="text-4xl font-semibold text-teal-300 mb-4">Product List</h2>
            <div className="flex flex-wrap gap-4 justify-start w-full">
              <ProductList
                products={products}
                onDeleteProduct={handleDeleteProduct}
                onEditProduct={setEditingProduct} // Set the product to be edited
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
