import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const BestsellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBestsellers = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/products?limit=8');
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Failed to load bestseller products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBestsellers();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-[#737373]">Loading bestseller products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 max-w-[692px] mx-auto">
          <h4 className="text-[#737373] text-sm md:text-base mb-2">Featured Products</h4>
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-[#737373] text-sm">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="max-w-[1049px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[30px]">
            {products.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg overflow-hidden">
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={product.images?.[0]?.url || 'https://placehold.co/239x300/png?text=Product'}
                      alt={product.name}
                      className="w-full h-[300px] object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/239x300/png?text=No+Image';
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-6 text-center">
                    <h5 className="font-bold text-[#252B42] mb-2 line-clamp-1">
                      {product.name}
                    </h5>
                    <p className="text-sm text-[#737373] mb-2">
                      English Department
                    </p>
                    
                    {/* Prices */}
                    <div className="flex gap-2 justify-center items-center">
                      <span className="text-[#BDBDBD] line-through">
                        ${(product.price * 1.5).toFixed(2)}
                      </span>
                      <span className="text-[#23856D] font-bold">
                        ${product.price}
                      </span>
                    </div>

                    {/* Color Options */}
                    <div className="flex gap-2 justify-center mt-4">
                      <div className="w-4 h-4 rounded-full bg-[#23A6F0]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#2DC071]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#E77C40]"></div>
                      <div className="w-4 h-4 rounded-full bg-[#252B42]"></div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;