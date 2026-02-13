import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronRight, ChevronLeft, Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { Icon } from '@iconify/react';


const productData = {
  id: 1,
  title: 'Floating Phone',
  rating: 5,
  reviewCount: 10,
  price: 1139.33,
  availability: 'In Stock',
  description: 'Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.',
  colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42'],
  images: [
    '/src/assets/products/product-1.jpg',
    '/src/assets/products/product-2.jpg'
  ],
  features: [
    'the quick fox jumps over the lazy dog',
    'the quick fox jumps over the lazy dog',
    'the quick fox jumps over the lazy dog',
    'the quick fox jumps over the lazy dog'
  ]
};

const bestsellerProducts = [
  {
    id: 1,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-1.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 2,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-2.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 3,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-3.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 4,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-4.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 5,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-5.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 6,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-6.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 7,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-7.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  },
  {
    id: 8,
    title: 'Graphic Design',
    department: 'English Department',
    originalPrice: 16.48,
    salePrice: 6.48,
    image: '/src/assets/products/product-8.jpg',
    colors: ['#23A6F0', '#23856D', '#E77C40', '#252B42']
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [activeTab, setActiveTab] = useState('description');

  const product = productData; 

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="w-full">
      <div className="bg-[#FAFAFA]">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm font-bold">
            <a href="/" className="text-[#252B42] hover:text-[#23A6F0]">
              Home
            </a>
            <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
            <span className="text-[#BDBDBD]">Shop</span>
          </nav>
        </div>
      </div>

      <div className="bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="relative bg-white rounded-lg overflow-hidden mb-4">
                <img 
                  src={product.images[currentImageIndex]}
                  alt={product.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <button 
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                >
                  <ChevronLeft className="w-6 h-6 text-[#252B42]" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100"
                >
                  <ChevronRight className="w-6 h-6 text-[#252B42]" />
                </button>
              </div>

              <div className="flex gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-1 overflow-hidden rounded-lg border-2 ${
                      currentImageIndex === index ? 'border-[#23A6F0]' : 'border-gray-200'
                    }`}
                  >
                    <img 
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-24 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-normal text-[#252B42] mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i}
                      className="w-5 h-5 fill-[#F3CD03] text-[#F3CD03]"
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#737373]">
                  {product.reviewCount} Reviews
                </span>
              </div>

              <div className="text-2xl font-bold text-[#252B42] mb-4">
                ${product.price.toFixed(2)}
              </div>

              <div className="flex items-center gap-2 mb-6">
                <span className="text-sm font-bold text-[#737373]">
                  Availability :
                </span>
                <span className="text-sm font-bold text-[#23A6F0]">
                  {product.availability}
                </span>
              </div>

              <p className="text-sm text-[#858585] leading-relaxed mb-6 pb-6 border-b border-gray-200">
                {product.description}
              </p>

              <div className="flex gap-2 mb-16">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === index ? 'border-[#252B42]' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button className="px-6 py-3 bg-[#23A6F0] text-white rounded font-bold text-sm hover:bg-[#1a8ad1] transition-colors">
                  Select Options
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Heart className="w-5 h-5 text-[#252B42]" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <ShoppingCart className="w-5 h-5 text-[#252B42]" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <Eye className="w-5 h-5 text-[#252B42]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex justify-center gap-12">
            <button
              onClick={() => setActiveTab('description')}
              className={`py-6 text-sm font-bold ${
                activeTab === 'description'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0]'
                  : 'text-[#737373]'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('info')}
              className={`py-6 text-sm font-bold ${
                activeTab === 'info'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0]'
                  : 'text-[#737373]'
              }`}
            >
              Additional Information
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-6 text-sm font-bold flex items-center gap-1 ${
                activeTab === 'reviews'
                  ? 'text-[#252B42] border-b-2 border-[#23A6F0]'
                  : 'text-[#737373]'
              }`}
            >
              Reviews <span className="text-[#23856D]">(0)</span>
            </button>
          </nav>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg overflow-hidden">
              <img 
                src="/src/assets/products/product-detail-content.jpg"
                alt="Product detail"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#252B42] mb-6">
                the quick fox jumps over
              </h3>
              <p className="text-sm text-[#737373] leading-relaxed mb-4">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-sm text-[#737373] leading-relaxed mb-4">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
              <p className="text-sm text-[#737373] leading-relaxed">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent door ENIM RELIT Mollie. Excitation venial consequent sent nostrum met.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[#252B42] mb-6">
                the quick fox jumps over
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-[#737373]">
                    <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <h3 className="text-2xl font-bold text-[#252B42] mt-8 mb-6">
                the quick fox jumps over
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm text-[#737373]">
                    <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#252B42] mb-8">
            BESTSELLER PRODUCTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestsellerProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
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

export default ProductDetailPage;