import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      season: 'SUMMER 2020',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale.',
      image: '/assets/hero-woman-2.png',
    },
    {
      id: 2,
      season: 'SUMMER 2020',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale.',
      image: '/assets/hero-woman.jpg',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] bg-[#23A6F0] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="absolute inset-0">
            <img 
              src={slide.image} 
              alt="Hero"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="container mx-auto h-full relative z-10">
            <div className="flex items-center h-full">
              <div className="w-full md:max-w-[599px] px-6 md:px-0">
                <div className="flex flex-col gap-[35px]">
                  <h5 className="text-base font-bold tracking-wide text-white">
                    {slide.season}
                  </h5>
                  
                  <h1 className="text-[40px] md:text-[58px] font-bold leading-[50px] md:leading-[80px] tracking-[0.2px] text-white">
                    {slide.title}
                  </h1>
                  
                  <h4 className="text-xl leading-[30px] tracking-[0.2px] text-white max-w-[376px]">
                    {slide.description}
                  </h4>
                  
                  <div>
                    <button className="bg-[#2DC071] hover:bg-[#26a55f] text-white px-10 py-[15px] rounded-[5px] font-bold text-sm tracking-[0.2px] transition-colors">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </div>
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
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-16 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;