'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productName: '',
    price: 0,
    description: ''
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          'https://template-03-api.vercel.app/api/products'
        );
        setProducts(response.data.data); // Get data array from the response
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleSaveEdit = async () => {
    if (!newProduct.productName || newProduct.price <= 0 || !newProduct.description) {
      alert('Please fill all fields.');
      return;
    }

    try {
      await axios.put(
        `https://template-03-api.vercel.app/api/products/${newProduct.productName}`,
        newProduct
      );
      setProducts(
        products.map((product) =>
          product.productName === newProduct.productName ? newProduct : product
        )
      );
      setNewProduct({ productName: '', price: 0, description: '' });
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update the product. Please check the network or API.');
    }
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Product Management</h2>
      <p className="text-center text-gray-600 mb-8">Manage your products here. Add, edit, or delete products.</p>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Product List</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full mt-4 table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Product Name</th>
                <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Price</th>
                <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.productName}>
                  <td className="border-b p-3 text-sm">{product.productName}</td>
                  <td className="border-b p-3 text-sm">${product.price}</td>
                  <td className="border-b p-3 text-sm">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
                      onClick={() => setNewProduct(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Edit Product</h3>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              value={newProduct.productName}
              onChange={(e) =>
                setNewProduct({ ...newProduct, productName: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({ ...newProduct, description: e.target.value })
              }
            />
          </div>
          <button
            type="button"
            onClick={handleSaveEdit}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
