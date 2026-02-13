import React from 'react';

const offices = [
  {
    id: 1,
    city: "Paris",
    address: "1901 Thorn ridge Cir.",
    postalCode: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215"
  },
  {
    id: 2,
    city: "Berlin",
    address: "4140 Parker Rd.",
    postalCode: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215"
  },
  {
    id: 3,
    city: "New York",
    address: "2715 Ash Dr. San Jose,",
    postalCode: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215"
  },
  {
    id: 4,
    city: "London",
    address: "3517 W. Gray St. Utica,",
    postalCode: "75000 Paris",
    phone: "+451 215 215",
    fax: "+451 215 215"
  }
];

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-[#17a2b8] to-[#0e7f95] relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/src/assets/unsplash_RYyr-k3Ysqg.png')`,
          backgroundPosition: 'right center'
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-r from-[#17a2b8] via-[#17a2b8]/80 to-transparent" />

      <div className="relative z-10">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
            <div className="text-white space-y-6 lg:py-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                CONTACT US
              </h1>
              
              <p className="text-base md:text-lg max-w-md leading-relaxed">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>

              <button className="px-8 py-4 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a8ad1] transition-colors">
                CONTACT US
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
              {offices.map((office) => (
                <div 
                  key={office.id}
                  className="text-white space-y-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">
                    {office.city}
                  </h3>

                  <p className="text-base leading-relaxed">
                    {office.address}
                  </p>

                  <div className="w-16 h-0.5 bg-[#23A6F0]"></div>

                  <p className="text-base font-bold">
                    {office.postalCode}
                  </p>

                  <p className="text-base">
                    Phone : {office.phone}
                  </p>

                  <p className="text-base">
                    Fax : {office.fax}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;