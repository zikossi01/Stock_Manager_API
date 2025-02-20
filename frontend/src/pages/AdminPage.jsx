import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from '../Components/ProductForm';
import ProductList from '../Components/ProductList';

const AdminPage = () => {
  const [products, setProducts] = useState([]);

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
    setProducts([...products, newProduct]);
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
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 p-12 flex flex-col">
      <div className="flex-1 max-w-7xl mx-auto space-y-12">
        <header className="text-center animate__animated animate__fadeIn pt-8">
          <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-600 tracking-tight drop-shadow-xl">
            Admin Dashboard
          </h1>
          <p className="text-xl text-white mt-4 font-light">Manage, edit, and control your products effortlessly.</p>
        </header>

        <section className="bg-gradient-to-br from-gray-800 to-gray-900 p-12 rounded-xl shadow-2xl transform transition hover:scale-105 hover:shadow-3xl duration-300 ease-in-out border border-gray-600">
          <h2 className="text-4xl font-semibold text-gradient text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600 mb-8">
            Add New Product
          </h2>
          <ProductForm onProductAdded={handleProductAdded} />
        </section>

        <section className="space-y-8 flex-1">
          <h2 className="text-4xl font-semibold text-white mb-6">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductList
              products={products}
              onDeleteProduct={handleDeleteProduct}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
