import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const VitaClassic = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const products = [
    {
      id: 1,
      season: 'SUMMER 2020',
      title: 'Vita Classic Product',
      description: 'We know how large objects will act, We know how are objects will act, We know',
      price: '$16.48',
      image: '/assets/hero/hero-product.png',
    },
    {
      id: 2,
      season: 'SUMMER 2020',
      title: 'Vita Classic Product',
      description: 'We know how large objects will act, We know how are objects will act, We know',
      price: '$16.48',
      image: '/assets/hero/hero-product-2.png',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % products.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + products.length) % products.length);
  };

  return (
    <section className="bg-[#23856D] overflow-hidden">
      <div className="relative h-[1230px] md:h-[709px] max-w-[1440px] mx-auto">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <div className="flex flex-col md:pt-0 md:flex-row h-full">
              <div className="flex items-center justify-center md:w-1/2 p-8 md:p-12">
                <div className="flex flex-col pt-28 md:pt-0 gap-[40px] text-white max-w-md text-center md:text-left mx-auto">
                  <h5 className="text-base font-bold tracking-[0.1px]">
                    {product.season}
                  </h5>
                  
                  <h1 className="text-[40px] md:text-[58px] font-bold leading-[50px] md:leading-[80px] tracking-[0.2px]">
                    {product.title}
                  </h1>
                  
                  <h4 className="text-sm leading-[20px] tracking-[0.2px] max-w-[341px] mx-auto md:mx-0">
                    {product.description}
                  </h4>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-[34px]">
                    <h3 className="text-2xl font-bold tracking-[0.1px]">
                      {product.price}
                    </h3>
                    <button className="bg-[#2DC071] hover:bg-[#26a55f] text-white px-10 py-[15px] rounded-[5px] font-bold text-sm tracking-[0.2px] uppercase transition-colors">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex-1 relative h-[600px] md:h-auto">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="absolute -bottom-40 left-1/2 md:left-auto md:right-0 -translate-x-1/2  h-full md:h-[110%] w-auto object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={prevSlide}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-20"
        >
          <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white hover:text-white/80 transition-colors z-20"
        >
          <ChevronRight className="w-10 h-10 md:w-12 md:h-12" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white w-16' : 'bg-white/50 w-2'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VitaClassic;