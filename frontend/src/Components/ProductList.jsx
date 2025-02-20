import React from 'react';

const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="p-6 border border-gray-300 rounded-lg shadow-lg flex justify-between items-center space-x-4 bg-white"
        >
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-800">{product.title}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-gray-800">Price: ${product.price}</p>
            <p className="text-gray-800">Stock: {product.stock}</p>
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-24 h-24 object-cover rounded-lg mt-4"
            />
          </div>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => onEditProduct(product)}
            >
              Edit
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              onClick={() => onDeleteProduct(product._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
