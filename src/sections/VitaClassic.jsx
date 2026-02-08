import React from 'react';

const VitaClassic = () => {
  return (
    <section className="bg-[#23856D] relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center min-h-[500px] md:min-h-[600px]">
          {/* Left Content */}
          <div className="text-white space-y-6 py-12 md:py-0 z-10">
            <h5 className="text-sm md:text-base font-bold tracking-wider">
              SUMMER 2020
            </h5>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Vita Classic Product
            </h2>
            <p className="text-base md:text-lg text-white/90 max-w-md">
              We know how large objects will act, We know how are objects will act, We know
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <span className="text-xl md:text-2xl font-bold">$16.48</span>
              <button className="bg-[#2DC071] hover:bg-[#26a55f] text-white px-8 py-3 rounded font-bold text-sm transition-colors">
                ADD TO CART
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex items-center justify-center md:justify-end">
            <div className="relative w-full max-w-md">
              <img 
                src="/assets/hero/hero-product.png" 
                alt="Vita Classic Product" 
                className="object-contain w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VitaClassic;
