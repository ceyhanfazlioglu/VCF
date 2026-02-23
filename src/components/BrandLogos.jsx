import React from 'react';
import { Icon } from '@iconify/react';

const BrandLogos = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center">
          {[
            { id: 1, icon: "fa-brands:hooli", name: "Hooli" },
            { id: 2, icon: "fa-brands:lyft", name: "Lyft" },
            { id: 3, icon: "fa-brands:pied-piper-hat", name: "Pied Piper" }, 
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
    </section>
  );
};

export default BrandLogos;