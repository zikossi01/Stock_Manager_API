import React from 'react';

const ProductList = ({ products, onDeleteProduct, onEditProduct }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-start w-full">
      {products.map((product) => (
        <div
          key={product._id}
          className="w-1/4 bg-gray-800 rounded-lg shadow-lg p-6 border-2 border-teal-600 flex flex-col items-start"
        >
          <img
            src={product.imageUrl || 'https://via.placeholder.com/200'}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-2xl font-semibold text-teal-300 mt-4">{product.title}</h3>
          <p className="text-gray-300 mt-2">{product.description}</p>
          <p className="text-lg text-teal-400 font-bold mt-2">${product.price}</p>
          <p className="text-md text-gray-500 mt-2">Stock: {product.stock}</p>

          <div className="flex justify-between w-full mt-6">
            <button
              onClick={() => onEditProduct(product)}
              className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={() => onDeleteProduct(product._id)}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-200"
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
