import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  offer: string;
  category: string;
  description: string;
}

const products: Product[] = [
  // Fruits Category
  {
    id: 1,
    name: 'Organic Apples',
    price: 199,
    image: 'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 3 Get 1 Free',
    category: 'Fruits',
    description: 'Fresh organic apples from local orchards'
  },
  {
    id: 2,
    name: 'Fresh Strawberries',
    price: 299,
    image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '15% Off',
    category: 'Fruits',
    description: 'Sweet and juicy fresh strawberries'
  },
  {
    id: 3,
    name: 'Organic Bananas',
    price: 129,
    image: 'https://images.unsplash.com/photo-1543218024-57a70143c369?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 2 Get 1 Free',
    category: 'Fruits',
    description: 'Ripe and ready-to-eat organic bananas'
  },
  {
    id: 4,
    name: 'Organic Oranges',
    price: 179,
    image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 2 Get 2 Free',
    category: 'Fruits',
    description: 'Sweet and juicy organic oranges'
  },
  {
    id: 5,
    name: 'Organic Grapes',
    price: 249,
    image: 'https://th.bing.com/th/id/R.241594f449ad0034eff01a81e04f7f30?rik=G8xSJ3K7nIkdUw&riu=http%3a%2f%2fgreenlawn-farms.com%2fwp-content%2fuploads%2f2019%2f07%2f7144.png&ehk=O4MMhN5DadJR2GvcORErRDPNlcuLiQW8WJKfTCzUpLw%3d&risl=&pid=ImgRaw&r=0',
    offer: 'Buy 2 Get 1 Free',
    category: 'Fruits',
    description: 'Sweet and seedless organic grapes'
  },
  {
    id: 6,
    name: 'Organic Mangoes',
    price: 199,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 3 Get 1 Free',
    category: 'Fruits',
    description: 'Sweet and juicy organic mangoes'
  },
  {
    id: 7,
    name: 'Organic Pomegranates',
    price: 279,
    image: 'https://cdn.shopaccino.com/rootz/products/picture19-192802688603861_m.jpg?v=538',
    offer: 'Buy 2 Get 2 Free',
    category: 'Fruits',
    description: 'Sweet and juicy organic pomegranates'
  },
  {
    id: 8,
    name: 'Organic Pineapples',
    price: 299,
    image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 2 Get 1 Free',
    category: 'Fruits',
    description: 'Sweet and juicy organic pineapples'
  },
  {
    id: 9,
    name: 'Organic Watermelons',
    price: 399,
    image: 'https://satvyk.com/wp-content/uploads/2021/04/Satvyk-Watermelon-1.jpg',
    offer: 'Buy 2 Get 2 Free',
    category: 'Fruits',
    description: 'Sweet and refreshing organic watermelons'
  },
  {
    id: 10,
    name: 'Organic Papayas',
    price: 149,
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '20% Off',
    category: 'Fruits',
    description: 'Sweet and ripe organic papayas'
  },

  // Vegetables Category
  {
    id: 11,
    name: 'Organic Tomatoes',
    price: 149,
    image: 'https://th.bing.com/th/id/OIP.7sXD1I8TuX9VresgBYIzGgHaE7?rs=1&pid=ImgDetMain',
    offer: 'Buy 2 Get 1 Free',
    category: 'Vegetables',
    description: 'Fresh organic tomatoes from local farms'
  },
  {
    id: 12,
    name: 'Fresh Lettuce',
    price: 99,
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '20% Off',
    category: 'Vegetables',
    description: 'Crisp and fresh lettuce heads'
  },
  {
    id: 13,
    name: 'Organic Carrots',
    price: 89,
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: 'Buy 2 Get 2 Free',
    category: 'Vegetables',
    description: 'Sweet and crunchy organic carrots'
  },
  {
    id: 14,
    name: 'Fresh Spinach',
    price: 79,
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '10% Off',
    category: 'Vegetables',
    description: 'Nutritious fresh spinach leaves'
  },
  {
    id: 15,
    name: 'Fresh Broccoli',
    price: 159,
    image: 'https://images.unsplash.com/photo-1584270354949-c26b0d5b4a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '25% Off',
    category: 'Vegetables',
    description: 'Fresh and crisp broccoli heads'
  },
  {
    id: 16,
    name: 'Fresh Cauliflower',
    price: 139,
    image: 'https://5.imimg.com/data5/XG/LS/XL/SELLER-90542357/cauliflower-500x500.jpeg',
    offer: '15% Off',
    category: 'Vegetables',
    description: 'Fresh white cauliflower heads'
  },
  {
    id: 17,
    name: 'Fresh Bell Peppers',
    price: 119,
    image: 'https://images.unsplash.com/photo-1526470498-9ae73c665de8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '20% Off',
    category: 'Vegetables',
    description: 'Colorful fresh bell peppers'
  },
  {
    id: 18,
    name: 'Fresh Green Beans',
    price: 89,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '10% Off',
    category: 'Vegetables',
    description: 'Fresh and tender green beans'
  },
  {
    id: 19,
    name: 'Fresh Mushrooms',
    price: 149,
    image: 'https://m.media-amazon.com/images/I/71XMKwfQCzL.jpg',
    offer: '15% Off',
    category: 'Vegetables',
    description: 'Fresh and firm button mushrooms'
  },
  {
    id: 20,
    name: 'Fresh Zucchini',
    price: 79,
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    offer: '20% Off',
    category: 'Vegetables',
    description: 'Fresh and tender zucchini'
  },

  // Pulses Category
  {
    id: 21,
    name: 'Organic Toor Dal',
    price: 129,
    image: 'https://organicshandy.com/wp-content/uploads/2018/10/dhal-red-toor.jpg',
    offer: 'Buy 2 Get 1 Free',
    category: 'Pulses',
    description: 'Premium quality organic toor dal'
  },
  {
    id: 22,
    name: 'Organic Moong Dal',
    price: 149,
    image: 'https://5.imimg.com/data5/PB/YY/FE/SELLER-7452716/organic-moong-dhal-split-paasi-paruppu-1000x1000.jpg',
    offer: '15% Off',
    category: 'Pulses',
    description: 'Fresh organic moong dal'
  },
  {
    id: 23,
    name: 'Organic Chana Dal',
    price: 139,
    image: 'https://cdn11.bigcommerce.com/s-dis4vxtxtc/images/stencil/1280x1280/products/2490/3285/image_1549__36830.1567254947.jpg?c=2?imbypass=on',
    offer: 'Buy 2 Get 2 Free',
    category: 'Pulses',
    description: 'Premium organic chana dal'
  },
  {
    id: 24,
    name: 'Organic Urad Dal',
    price: 159,
    image: 'https://th.bing.com/th/id/OIP.Jpy3Et3szVY-u3ph9yV1pQHaHa?rs=1&pid=ImgDetMain',
    offer: '20% Off',
    category: 'Pulses',
    description: 'Fresh organic urad dal'
  },
  {
    id: 25,
    name: 'Organic Masoor Dal',
    price: 119,
    image: 'https://5.imimg.com/data5/SELLER/Default/2023/8/333911900/LV/PA/YL/45687351/organic-masoor-dal.jpg',
    offer: 'Buy 3 Get 1 Free',
    category: 'Pulses',
    description: 'Premium organic masoor dal'
  },
  {
    id: 26,
    name: 'Organic Rajma',
    price: 179,
    image: 'https://www.greendna.in/cdn/shop/products/redraj3.jpg?v=1589193965',
    offer: 'Buy 2 Get 1 Free',
    category: 'Pulses',
    description: 'Fresh organic rajma beans'
  },
  {
    id: 27,
    name: 'Organic Chole',
    price: 169,
    image: 'https://images.meesho.com/images/products/422327621/ovtjw_512.webp',
    offer: '15% Off',
    category: 'Pulses',
    description: 'Premium organic chole'
  },
  {
    id: 28,
    name: 'Organic Lobia',
    price: 149,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXL4oEudQUcNPTx0IBUdocBMg0bnatXaB37A&s',
    offer: 'Buy 2 Get 2 Free',
    category: 'Pulses',
    description: 'Fresh organic lobia'
  },
  {
    id: 29,
    name: 'Organic Green Moong',
    price: 139,
    image: 'https://5.imimg.com/data5/SELLER/Default/2022/6/TE/DE/BP/151894220/organic-green-mung-bean-500x500.jpg',
    offer: '20% Off',
    category: 'Pulses',
    description: 'Premium organic green moong'
  },
  {
    id: 30,
    name: 'Organic Black Eyed Peas',
    price: 159,
    image: 'https://c8.alamy.com/comp/2B1KE36/pile-black-eyed-beans-isolated-on-white-background-have-a-good-aroma-creamy-texture-and-distinctive-flavor-these-beans-are-characterized-2B1KE36.jpg',
    offer: 'Buy 2 Get 1 Free',
    category: 'Pulses',
    description: 'Fresh organic black eyed peas'
  }
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const categories = ['all', ...Array.from(new Set(products.map(product => product.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) + change)
    }));
  };

  const handleAddToCart = (product: Product) => {
    const quantity = quantities[product.id] || 1;
    if (quantity > 0) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        offer: product.offer
      });
      setQuantities(prev => ({ ...prev, [product.id]: 0 }));
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow">
        <div className="flex gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedCategory === category
                  ? 'bg-farm-green-500 text-white'
                  : 'bg-farm-green-100 text-farm-green-800 hover:bg-farm-green-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-farm-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-farm-green-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
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
              <p className="text-sm text-gray-600 mt-1">{product.description}</p>
              <p className="text-farm-green-600 font-medium mt-2">₹{product.price}</p>
              <span className="inline-block bg-farm-green-100 text-farm-green-800 px-2 py-1 rounded-full text-sm mt-2">
                {product.offer}
              </span>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(product.id, -1)}
                    className="w-8 h-8 rounded-full bg-farm-green-100 text-farm-green-800 hover:bg-farm-green-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{quantities[product.id] || 0}</span>
                  <button
                    onClick={() => handleQuantityChange(product.id, 1)}
                    className="w-8 h-8 rounded-full bg-farm-green-100 text-farm-green-800 hover:bg-farm-green-200"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!quantities[product.id]}
                  className={`w-full py-2 rounded-lg transition-colors ${
                    quantities[product.id]
                      ? 'bg-farm-green-500 text-white hover:bg-farm-green-600'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products; 