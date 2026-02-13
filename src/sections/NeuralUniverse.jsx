import React from 'react';

const NeuralUniverse = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-[1439px] mx-auto">
          <div className="flex flex-col md:flex-row gap-8 md:gap-[30px] items-center">
            <div className="w-full md:w-[704px] order-2 md:order-1">
              <img 
                src="/assets/banners/banner-neural.jpg" 
                alt="Part of the Neural Universe"
                className="w-full h-auto md:h-[682px] object-cover rounded-none md:rounded-lg"
              />
            </div>

            <div className="w-full md:w-[573px] space-y-6 text-center md:text-left order-1 md:order-2">
              <h5 className="text-[#23A6F0] text-sm md:text-base font-bold">
                SUMMER 2020
              </h5>
              <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] leading-tight">
                Part of the Neural Universe
              </h2>
              <p className="text-[#737373] text-base md:text-lg">
                We know how large objects will act, but things on a small scale.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="bg-[#2DC071] hover:bg-[#26a55f] text-white px-8 py-3 rounded font-bold text-sm transition-colors">
                  BUY NOW
                </button>
                <button className="border-2 border-[#2DC071] text-[#2DC071] hover:bg-[#2DC071] hover:text-white px-8 py-3 rounded font-bold text-sm transition-colors">
                  READ MORE
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NeuralUniverse;