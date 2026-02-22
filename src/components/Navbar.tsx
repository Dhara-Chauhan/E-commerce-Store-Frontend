import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, Dropdown, Drawer } from "antd";
import { useApp } from "../context/AppContext";
import type { MenuProps } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  MenuOutlined,
  DownOutlined,
} from "@ant-design/icons";
import type { RootState } from "../app/store";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { categories } = useApp();
  const cartItems = useSelector((state: RootState) => state.cart.cart);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const categoryItems: MenuProps["items"] = [
    { key: "all", label: "Shop All", onClick: () => navigate("/shop") },
    ...categories.map((cat: string) => ({
      key: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, " "),
      onClick: () => navigate(`/category/${cat}`),
    })),
  ];

  const handleMobileMenuClose = () => setMobileMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm border-b border-gray-100 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link
                to="/"
                className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                LuxeStore
              </Link>
            </div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex gap-8 items-center">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Home
              </Link>
              <Dropdown menu={{ items: categoryItems }} trigger={["hover"]}>
                <a
                  onClick={(e) => e.preventDefault()}
                  className="text-gray-700 hover:text-primary font-medium cursor-pointer flex items-center gap-1 transition-colors"
                >
                  Shop <DownOutlined className="text-xs" />
                </a>
              </Dropdown>
              <Link
                to="/shop" // Fallback or separate link
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Products
              </Link>
            </nav>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/cart">
                <Badge count={cartCount} showZero size="small" color="#4F46E5">
                  <ShoppingOutlined className="text-2xl text-gray-700 hover:text-primary transition-colors cursor-pointer" />
                </Badge>
              </Link>
              <Link to="/profile">
                  <div className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
                      <UserOutlined className="text-xl text-gray-700" />
                  </div>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <Link to="/cart">
                  <Badge count={cartCount} showZero size="small" color="#4F46E5">
                    <ShoppingOutlined className="text-2xl text-gray-700" />
                  </Badge>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="text-gray-700 hover:text-primary focus:outline-none"
              >
                <MenuOutlined className="text-2xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={handleMobileMenuClose}
        open={mobileMenuOpen}
        styles={{ body: { padding: 0 } }}
      >
        <div className="flex flex-col p-4 space-y-4">
          <Link
            to="/"
            className="text-lg font-medium text-gray-800 hover:text-primary"
            onClick={handleMobileMenuClose}
          >
            Home
          </Link>
           <div className="border-t border-gray-100 my-2"></div>
           <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-2">Categories</p>
           {categoryItems && Array.isArray(categoryItems) && categoryItems.map((item: any) => (
               <div key={item.key} onClick={(e) => { item.onClick && item.onClick(e as any); handleMobileMenuClose(); }} className="py-2 text-gray-700 cursor-pointer hover:text-primary pl-4 border-l-2 border-transparent hover:border-primary transition-all">
                   {item.label}
               </div>
           ))}
           <div className="border-t border-gray-100 my-2"></div>
          <Link
             to="/profile"
             className="flex items-center gap-2 text-lg font-medium text-gray-800 hover:text-primary"
             onClick={handleMobileMenuClose}
          >
             <UserOutlined /> Profile
          </Link>
        </div>
      </Drawer>
      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
