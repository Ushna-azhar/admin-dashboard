'use client'
import React, { useState } from 'react';

const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: 'DISCOUNT10', discount: 10 },
    { id: 2, code: 'SALE20', discount: 20 },
  ]);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 0 });

  const handleAddCoupon = () => {
    if (!newCoupon.code || newCoupon.discount <= 0) {
      alert('Please fill out all fields.');
      return;
    }
    setCoupons([...coupons, { ...newCoupon, id: coupons.length + 1 }]);
    setNewCoupon({ code: '', discount: 0 });
  };

  const handleDeleteCoupon = (id) => {
    setCoupons(coupons.filter((coupon) => coupon.id !== id));
  };

  return (
    <div className="p-4 sm:p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">Coupon Management</h2>
      <p className="text-center text-gray-600 mb-8">Manage your coupons. Add, edit, or remove coupons.</p>

      {/* Coupon List */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6 mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Coupon List</h3>
        <table className="min-w-full mt-4 table-auto border-collapse">
          <thead>
            <tr>
              <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Coupon Code</th>
              <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Discount (%)</th>
              <th className="border-b p-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td className="border-b p-3 text-sm">{coupon.code}</td>
                <td className="border-b p-3 text-sm">{coupon.discount}</td>
                <td className="border-b p-3 text-sm">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
                    onClick={() => handleDeleteCoupon(coupon.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add New Coupon */}
      <div className="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Add New Coupon</h3>
        <form>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Coupon Code</label>
            <input
              type="text"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              value={newCoupon.code}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, code: e.target.value })
              }
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Discount (%)</label>
            <input
              type="number"
              className="mt-2 p-3 border border-gray-300 rounded-lg w-full"
              value={newCoupon.discount}
              onChange={(e) =>
                setNewCoupon({ ...newCoupon, discount: e.target.value })
              }
            />
          </div>
          <button
            type="button"
            onClick={handleAddCoupon}
            className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition duration-200 w-full sm:w-auto"
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default CouponManagement;
