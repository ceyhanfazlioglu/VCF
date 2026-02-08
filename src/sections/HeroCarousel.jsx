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
      bgColor: 'bg-[#23A6F0]',
    },
    {
      id: 2,
      season: 'SUMMER 2020',
      title: 'NEW COLLECTION',
      description: 'We know how large objects will act, but things on a small scale.',
      bgColor: 'bg-[#23A6F0]',
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] lg:h-[716px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          } ${slide.bgColor}`}
        >
          <div className="container mx-auto px-4 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
              {/* Left Content */}
              <div className="text-white space-y-6 z-10">
                <h5 className="text-sm md:text-base font-bold tracking-wider">
                  {slide.season}
                </h5>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {slide.title}
                </h1>
                <p className="text-base md:text-xl text-white/90 max-w-md">
                  {slide.description}
                </p>
                <button className="bg-[#2DC071] hover:bg-[#26a55f] text-white px-8 md:px-10 py-3 md:py-4 rounded font-bold text-sm md:text-base transition-colors">
                  SHOP NOW
                </button>
              </div>

              {/* Right Image */}
              <div className="hidden md:flex items-center justify-center">
                <div className="w-full h-full flex items-center justify-end">
                  <div className="relative">
                    <img 
                      src="/assets/hero-woman-2.png" 
                      alt="Model" 
                      className="object-contain h-[500px] lg:h-[600px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
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

      {/* Dots Indicator */}
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
