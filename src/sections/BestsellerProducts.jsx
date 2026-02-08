import React from 'react';
import ProductCard from '../components/ProductCard';

const BestsellerProducts = () => {
  const products = [
    {
      id: 1,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-1.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 2,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-2.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 3,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-3.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 4,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-4.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 5,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-5.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 6,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-6.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 7,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-7.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
    {
      id: 8,
      title: 'Graphic Design',
      department: 'English Department',
      originalPrice: 16.48,
      salePrice: 6.48,
      image: '/assets/products/product-8.jpg',
      colors: ['#23A6F0', '#2DC071', '#E77C40', '#252B42'],
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h4 className="text-[#737373] text-sm md:text-base mb-2">Featured Products</h4>
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
            BESTSELLER PRODUCTS
          </h2>
          <p className="text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestsellerProducts;
