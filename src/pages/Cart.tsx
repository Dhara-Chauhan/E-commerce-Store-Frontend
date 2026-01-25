import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, Popconfirm } from "antd";
import { DeleteOutlined, ArrowRightOutlined, ShoppingOutlined } from "@ant-design/icons";
import type { RootState } from "../app/store";
import {
  type CartItem,
  removeFromCart,
  updateQuantity,
} from "../features/cart/cartSlice";
import { useApp } from "../context/AppContext";
import QuantityBtn from "../components/QuantityBtn";

const Cart: React.FC = () => {
  const { usdToInr } = useApp();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.cart);

  const handleRemove = (item: CartItem) => dispatch(removeFromCart(item));
  const handleUpdate = (item: CartItem, qty: number) =>
    dispatch(updateQuantity({ id: item.id, quantity: qty }));

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.05; // Mock tax 5%
  const total = subtotal + tax;

  if (cartItems.length === 0) {
      return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <ShoppingOutlined className="text-6xl text-gray-200 mb-6" />
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
              <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link to="/shop">
                  <Button type="primary" size="large" shape="round" className="h-12 px-8">
                      Start Shopping
                  </Button>
              </Link>
          </div>
      )
  }

  return (
    <div className="pb-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 flex flex-col gap-6">
            {cartItems.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                    <img
                        alt={item.title}
                        src={item.thumbnail}
                        className="w-24 h-24 object-contain"
                    />
                    
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-lg font-bold text-gray-800 mb-1">{item.title}</h2>
                        <p className="text-gray-500 text-sm mb-2">{item.category}</p>
                        <p className="text-primary font-bold">{usdToInr(item.price)}</p>
                    </div>

                     <div className="flex flex-col items-center gap-4 sm:flex-row">
                        <QuantityBtn
                            value={item.quantity}
                            onChange={(q) => handleUpdate(item, q)}
                        />
                        <span className="font-bold text-gray-800 w-24 text-center sm:text-right">
                            {usdToInr(item.price * item.quantity)}
                        </span>
                        
                        <Popconfirm
                            title="Delete the item"
                            description="Are you sure to delete this item?"
                            onConfirm={() => handleRemove(item)}
                            okText="Yes"
                            cancelText="No"
                            okButtonProps={{ danger: true }}
                        >
                             <Button 
                                type="text" 
                                danger 
                                shape="circle" 
                                icon={<DeleteOutlined />} 
                                className="bg-red-50 hover:bg-red-100"
                            />
                        </Popconfirm>
                    </div>
                </div>
            ))}
        </div>

        {/* Summary */}
        <div className="lg:w-96">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>{usdToInr(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax (5%)</span>
                        <span>{usdToInr(tax)}</span>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>{usdToInr(total)}</span>
                    </div>
                </div>

                <Button 
                    type="primary" 
                    size="large" 
                    block 
                    className="h-12 text-lg font-bold shadow-xl shadow-primary/20 rounded-xl"
                    icon={<ArrowRightOutlined />}
                    iconPosition="end"
                >
                    Checkout
                </Button>
                
                <div className="mt-6 text-center">
                     <p className="text-xs text-gray-400">Secure Checkout - SSL Encrypted</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
