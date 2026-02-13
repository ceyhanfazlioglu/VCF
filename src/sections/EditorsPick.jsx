import React from 'react';

const EditorsPick = () => {
  const categories = [
    {
      id: 1,
      title: 'MEN',
      image: '/assets/editors-men.png',
    },
    {
      id: 2,
      title: 'WOMEN',
      image: '/assets/editors-women.png',
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      image: '/assets/editors-accessories.png',
    },
    {
      id: 4,
      title: 'KIDS',
      image: '/assets/editors-kids.png',
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-[#FAFAFA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
            EDITOR'S PICK
          </h2>
          <p className="text-[#737373]">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-[30px] max-w-[1050px] mx-auto">
          <div className="relative overflow-hidden group cursor-pointer md:w-[510px]">
            <img
              src={categories[0].image}
              alt={categories[0].title}
              className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 md:left-[31px] md:bottom-6 bg-white px-[50px] py-[17px]">
              <h3 className="font-bold text-[#252B42] text-base uppercase">{categories[0].title}</h3>
            </div>
          </div>

          <div className="relative overflow-hidden group cursor-pointer md:flex-1">
            <img
              src={categories[1].image}
              alt={categories[1].title}
              className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-6 left-6 bg-white px-[50px] py-[17px]">
              <h3 className="font-bold text-[#252B42] text-base uppercase">{categories[1].title}</h3>
            </div>
          </div>

          <div className="flex flex-col gap-4 md:gap-[16px] md:w-[240px]">
            <div className="relative overflow-hidden group cursor-pointer">
              <img
                src={categories[2].image}
                alt={categories[2].title}
                className="w-full h-[200px] md:h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-[24px] py-[12px]">
                <h3 className="font-bold text-[#252B42] text-sm uppercase whitespace-nowrap">{categories[2].title}</h3>
              </div>
            </div>

            <div className="relative overflow-hidden group cursor-pointer">
              <img
                src={categories[3].image}
                alt={categories[3].title}
                className="w-full h-[200px] md:h-[242px] object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-[39px] py-[12px]">
                <h3 className="font-bold text-[#252B42] text-sm uppercase">{categories[3].title}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorsPick;
