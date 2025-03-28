import React from 'react';
import { Link } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    let discount = 0;
    cartItems.forEach(item => {
      if (item.offer === 'Buy 2 Get 1 Free' && item.quantity >= 2) {
        discount += item.price * Math.floor(item.quantity / 2);
      } else if (item.offer === 'Buy 2 Get 2 Free' && item.quantity >= 2) {
        discount += item.price * Math.floor(item.quantity / 2);
      } else if (item.offer === 'Buy 3 Get 1 Free' && item.quantity >= 3) {
        discount += item.price * Math.floor(item.quantity / 3);
      } else if (item.offer === '15% Off') {
        discount += item.price * item.quantity * 0.15;
      } else if (item.offer === '20% Off') {
        discount += item.price * item.quantity * 0.20;
      } else if (item.offer === '25% Off') {
        discount += item.price * item.quantity * 0.25;
      } else if (item.offer === '10% Off') {
        discount += item.price * item.quantity * 0.10;
      }
    });
    return discount;
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const total = subtotal - discount;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-farm-green-800 mb-8">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link
            to="/products"
            className="bg-farm-green-500 text-white px-6 py-3 rounded-lg hover:bg-farm-green-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Cart Items */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center p-4 border-b last:border-b-0"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 ml-4">
                  <h3 className="text-lg font-semibold text-farm-green-800">
                    {item.name}
                  </h3>
                  <p className="text-farm-green-600">₹{item.price}</p>
                  <span className="inline-block bg-farm-green-100 text-farm-green-800 px-2 py-1 rounded-full text-sm mt-1">
                    {item.offer}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full bg-farm-green-100 text-farm-green-800 hover:bg-farm-green-200"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full bg-farm-green-100 text-farm-green-800 hover:bg-farm-green-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-farm-green-800 mb-4">
              Order Summary
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-farm-green-600">
                <span>Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link
              to="/checkout"
              className="block w-full bg-farm-green-500 text-white text-center py-3 rounded-lg mt-6 hover:bg-farm-green-600 transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 