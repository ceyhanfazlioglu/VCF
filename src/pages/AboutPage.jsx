import React from 'react';
import { Facebook, Instagram, Twitter, Play } from 'lucide-react';
import { Icon } from '@iconify/react';

const stats = [
  { value: '15K', label: 'Happy Customers' },
  { value: '150K', label: 'Monthly Visitors' },
  { value: '15', label: 'Countries Worldwide' },
  { value: '100+', label: 'Top Partners' }
];

const teamMembers = [
  {
    id: 1,
    name: 'Gökhan Özdemir',
    profession: 'Project Manager',
    image: '/images/team/team-1-user-3.jpg',
    bgColor: '#F3CD03',
    social: { facebook: '#', instagram: '#', twitter: '#' }
  },
  {
    id: 2,
    name: 'Ceyhan Fazlıoğlu',
    profession: 'Full Stack Developer',
    image: '/images/team/team-1-user-2.jpg',
    bgColor: '#E5E5E5',
    social: { facebook: '#', instagram: '#', twitter: '#' }
  }
];

const AboutPage = () => {
  return (
    <div className="w-full">
      <div className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <p className="text-sm font-bold text-[#252B42]">ABOUT COMPANY</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#252B42]">
                ABOUT US
              </h1>
              <p className="text-base text-[#737373] max-w-md">
                We know how large objects will act, 
                but things on a small scale
              </p>
              <button className="px-8 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a8ad1] transition-colors">
                Get Quote Now
              </button>
            </div>

            <div className="relative">
              <div className="relative w-full h-[400px] md:h-[500px]">
              <div className="absolute -top-70 -right-25 w-96 h-96 bg-[#FFE9EA] rounded-full"></div>
                <img 
                  src="/images/about/shopping-woman.png"
                  alt="Shopping woman"
                  className="absolute bottom-0 right-0 w-full h-full object-contain"
                />
                <div className="absolute top-10 left-10 w-4 h-4 bg-[#977DF4] rounded-full"></div>
                <div className="absolute top-20 right-20 w-6 h-6 bg-[#FFE9EA] rounded-full"></div>
                <div className="absolute bottom-20 left-5 w-4 h-4 bg-[#FFE9EA] rounded-full"></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="space-y-4">
              <p className="text-sm text-[#E74040] font-normal">Problems trying</p>
              <h2 className="text-2xl font-bold text-[#252B42]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </h2>
            </div>
            <div>
              <p className="text-sm text-[#737373] leading-relaxed">
                Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <h3 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-2">
                  {stat.value}
                </h3>
                <p className="text-sm font-bold text-[#737373]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden">
            <img 
              src="/images/about/video-thumbnail.png"
              alt="Video thumbnail"
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-[#23A6F0] rounded-full flex items-center justify-center hover:bg-[#1a8ad1] transition-colors shadow-lg">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#252B42] mb-4">
              Meet Our Team
            </h2>
            <p className="text-sm text-[#737373] max-w-2xl mx-auto">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member) => (
              <div key={member.id} className="bg-white overflow-hidden">
                <div 
                  className="h-64 md:h-80 flex items-end justify-center overflow-hidden"
                  style={{ backgroundColor: member.bgColor }}
                >
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="p-6 text-center">
                  <h3 className="text-base font-bold text-[#252B42] mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm font-bold text-[#737373] mb-4">
                    {member.profession}
                  </p>

                  <div className="flex justify-center gap-5">
                    <a 
                      href={member.social.facebook}
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Facebook"
                    >
                      <Facebook className="w-6 h-6 text-[#1877F2]" />
                    </a>
                    <a 
                      href={member.social.instagram}
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Instagram"
                    >
                      <Instagram className="w-6 h-6 text-[#E4405F]" />
                    </a>
                    <a 
                      href={member.social.twitter}
                      className="hover:opacity-80 transition-opacity"
                      aria-label="Twitter"
                    >
                      <Twitter className="w-6 h-6 text-[#1DA1F2]" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-[#FAFAFA] py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#252B42] mb-4">
              Big Companies Are Here
            </h2>
            <p className="text-sm text-[#737373] max-w-2xl mx-auto">
              Problems trying to resolve the conflict between 
              the two major realms of Classical physics: Newtonian mechanics
            </p>
          </div>

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
                  className="w-16 h-16 md:w-20 md:h-20 text-[#737373]" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="bg-[#2A7CC7] text-white p-8 md:p-16 flex items-center">
            <div className="max-w-md">
              <p className="text-sm font-bold mb-6">WORK WITH US</p>
              <h2 className="text-4xl font-bold mb-6">
                Now Let's grow Yours
              </h2>
              <p className="text-sm mb-6 leading-relaxed">
                The gradual accumulation of information about atomic and 
                small-scale behavior during the first quarter of the 20th
              </p>
              <button className="px-8 py-3 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-[#2A7CC7] transition-colors">
                Button
              </button>
            </div>
          </div>

          <div className="h-[400px] lg:h-auto">
            <img 
              src="/images/about/work-with-us.png"
              alt="Work with us"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;