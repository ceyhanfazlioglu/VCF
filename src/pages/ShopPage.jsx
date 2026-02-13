import React, { useState } from 'react';
import { ChevronRight, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Icon } from '@iconify/react';

const categories = [
  {
    id: 1,
    title: 'CLOTHS',
    itemCount: 5,
    image: '/src/assets/shop/category-1.jpg'
  },
  {
    id: 2,
    title: 'CLOTHS',
    itemCount: 5,
    image: '/src/assets/shop/category-2.jpg'
  },
  {
    id: 3,
    title: 'CLOTHS',
    itemCount: 5,
    image: '/src/assets/shop/category-3.jpg'
  },
  {
    id: 4,
    title: 'CLOTHS',
    itemCount: 5,
    image: '/src/assets/shop/category-4.jpg'
  },
  {
    id: 5,
    title: 'CLOTHS',
    itemCount: 5,
    image: '/src/assets/shop/category-5.jpg'
  }
];

const products = [
  {
    id: 1,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-1.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 2,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-2.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 3,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-3.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 4,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-4.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 5,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-5.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 6,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-6.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 7,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-7.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 8,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-8.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 9,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-9.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 10,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-10.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 11,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-11.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 12,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products-shop/product-shop-12.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  }
];

const ShopPage = () => {
  const [viewMode, setViewMode] = useState('grid'); 
  const [currentPage, setCurrentPage] = useState(2); 

  return (
    <div className="w-full">
      <div className="bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-[#252B42]">Shop</h1>
            
            <nav className="flex items-center gap-2 text-sm">
              <a href="/" className="font-bold text-[#252B42] hover:text-[#23A6F0]">
                Home
              </a>
              <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
              <span className="text-[#BDBDBD] font-bold">Shop</span>
            </nav>
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] pb-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <div 
                key={category.id}
                className="relative h-[300px] overflow-hidden cursor-pointer group"
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col items-center justify-center text-white">
                  <h3 className="text-base font-bold mb-1">{category.title}</h3>
                  <p className="text-sm">{category.itemCount} Items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-sm text-[#737373] font-bold">
              Showing all 12 results
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#737373] font-bold">Views:</span>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 border rounded ${
                    viewMode === 'grid' 
                      ? 'border-[#23A6F0] text-[#23A6F0]' 
                      : 'border-gray-300 text-[#737373]'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 border rounded ${
                    viewMode === 'list' 
                      ? 'border-[#23A6F0] text-[#23A6F0]' 
                      : 'border-gray-300 text-[#737373]'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select className="px-4 py-2 border border-gray-300 rounded bg-[#F9F9F9] text-[#737373] text-sm font-normal min-w-[200px]">
                <option>Popularity</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>

              <button className="px-6 py-2 bg-[#23A6F0] text-white rounded font-bold text-sm hover:bg-[#1a8ad1] transition-colors">
                Filter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      <div className="border-t bg-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center">
            <nav className="flex gap-1">
              <button className="px-6 py-3 border border-[#BDBDBD] text-[#23A6F0] rounded hover:bg-gray-50 font-bold text-sm">
                First
              </button>
              <button className="px-4 py-3 border border-[#BDBDBD] text-[#23A6F0] rounded hover:bg-gray-50 font-bold text-sm">
                1
              </button>
              <button className="px-4 py-3 bg-[#23A6F0] text-white rounded font-bold text-sm">
                2
              </button>
              <button className="px-4 py-3 border border-[#BDBDBD] text-[#23A6F0] rounded hover:bg-gray-50 font-bold text-sm">
                3
              </button>
              <button className="px-6 py-3 border border-[#BDBDBD] text-[#23A6F0] rounded hover:bg-gray-50 font-bold text-sm">
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>

<div className="bg-[#FAFAFA] py-12">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
      {[
        { id: 1, icon: "fa7-brands:hooli", name: "Hooli" },
        { id: 2, icon: "fa-brands:lyft", name: "Lyft" },
        { id: 3, icon: "fa-brands:pied-piper-hat", name: "Pied Piper" }, // O meşhur şapka
        { id: 4, icon: "fa-brands:stripe", name: "Stripe" },
        { id: 5, icon: "fa-brands:aws", name: "AWS" },
        { id: 6, icon: "fa-brands:reddit-alien", name: "Reddit" },
      ].map((logo) => (
        <div 
          key={logo.id}
          className="grayscale hover:grayscale-0 transition-all opacity-70 hover:opacity-100 cursor-pointer p-4"
          title={logo.name}
        >
          <Icon 
            icon={logo.icon} 
            className="w-16 h-16 md:w-20 md:h-20 text-[#737373]" 
          />
        </div>
      ))}
    </div>
  </div>
</div>
      
    </div>
  );
};

export default ShopPage;