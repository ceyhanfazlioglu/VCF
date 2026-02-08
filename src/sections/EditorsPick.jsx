import React from 'react';

const EditorsPick = () => {
  const categories = [
    {
      id: 1,
      title: 'MEN',
      image: '/assets/editors-men.png',
      size: 'large',
    },
    {
      id: 2,
      title: 'WOMEN',
      image: '/assets/editors-women.png',
      size: 'large',
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      image: '/assets/editors-accessories.png',
      size: 'small',
    },
    {
      id: 4,
      title: 'KIDS',
      image: '/assets/editors-kids.png',
      size: 'small',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
            EDITOR'S PICK
          </h2>
          <p className="text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Men - Large */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer">
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
              <h3 className="font-bold text-[#252B42]">{categories[0].title}</h3>
            </div>
          </div>

          {/* Women - Large */}
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden group cursor-pointer">
            <img
              src={categories[1].image}
              alt={categories[1].title}
              className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
              <h3 className="font-bold text-[#252B42]">{categories[1].title}</h3>
            </div>
          </div>

          {/* Accessories - Small */}
          <div className="md:col-span-2 relative overflow-hidden group cursor-pointer">
            <img
              src={categories[2].image}
              alt={categories[2].title}
              className="w-full h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
              <h3 className="font-bold text-[#252B42]">{categories[2].title}</h3>
            </div>
          </div>

          {/* Kids - Small */}
          <div className="md:col-span-2 relative overflow-hidden group cursor-pointer">
            <img
              src={categories[3].image}
              alt={categories[3].title}
              className="w-full h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 bg-white px-6 py-3">
              <h3 className="font-bold text-[#252B42]">{categories[3].title}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
