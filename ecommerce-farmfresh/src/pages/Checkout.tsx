import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

const Checkout = () => {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState<CheckoutForm>({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    console.log('Order submitted:', formData);
    alert('Order placed successfully!');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-farm-green-800 mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Shipping Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-farm-green-800 mb-4">
            Shipping Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-farm-green-800 mb-4">
            Payment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
              />
            </div>
          </div>
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
          <button
            type="submit"
            className="w-full bg-farm-green-500 text-white py-3 rounded-lg mt-6 hover:bg-farm-green-600 transition-colors"
          >
            Place Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout; 