'use client'

import { useState } from "react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Hamburger Button for All Screens */}
      <button
        className="p-4 bg-gray-800 text-white"
        onClick={handleToggleSidebar}
      >
        {isOpen ? (
          <span className="text-3xl">&times;</span> // Close icon (X)
        ) : (
          <span className="text-3xl">&#9776;</span> // Hamburger icon (☰)
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 transition-all z-50 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          {/* Close Button inside sidebar */}
          <button
            className="text-white p-2"
            onClick={handleToggleSidebar}
          >
            X
          </button>
        </div>

        <ul>
          <li className="mb-4">
            <Link href="/admin/dashboard">Sale Overview</Link>
          </li>
          <li className="mb-4">
            <Link href="/product-management">Product Management</Link>
          </li>
          <li className="mb-4">
            <Link href="/coupon-management">Coupon Management</Link>
          </li>
          <li className="mb-4">
            <Link href="/bulk-upload">Bulk Upload</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
