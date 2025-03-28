import React from 'react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    price: 149,
    image: 'https://th.bing.com/th/id/OIP.7sXD1I8TuX9VresgBYIzGgHaE7?rs=1&pid=ImgDetMain',
    offer: 'Buy 2 Get 1 Free'
  },
  {
    id: 2,
    name: 'Fresh Lettuce',
    price: 99,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '20% Off'
  },
  {
    id: 3,
    name: 'Organic Carrots',
    price: 89,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 2 Get 2 Free'
  }
];

const Home = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-farm-green-100 rounded-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-farm-green-800 mb-4">
          Fresh from the Farm to Your Table
        </h1>
        <p className="text-lg text-farm-green-600 mb-6">
          Discover the finest organic produce directly from local farmers
        </p>
        <Link
          to="/products"
          className="bg-farm-green-500 text-white px-6 py-3 rounded-lg hover:bg-farm-green-600 transition-colors"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold text-farm-green-800 mb-6">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-farm-green-800">
                  {product.name}
                </h3>
                <p className="text-farm-green-600 font-medium">₹{product.price}</p>
                <span className="inline-block bg-farm-green-100 text-farm-green-800 px-2 py-1 rounded-full text-sm mt-2">
                  {product.offer}
                </span>
                <button className="w-full bg-farm-green-500 text-white py-2 rounded-lg mt-4 hover:bg-farm-green-600 transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="bg-farm-green-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-farm-green-800 mb-4">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-farm-green-800">
              Weekend Special
            </h3>
            <p className="text-farm-green-600">
              Get 20% off on all organic vegetables this weekend!
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-farm-green-800">
              Bulk Discount
            </h3>
            <p className="text-farm-green-600">
              Buy 5 items or more and get 15% off on your entire order
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 