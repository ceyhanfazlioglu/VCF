import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const teamMembers = [
  {
    id: 1,
    name: "Gökhan Özdemir",
    profession: "Project Manager",
    image: "/src/assets/team/gokhan-ozdemir.jpg",
    bgColor: "#F3CD03", 
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  },
  {
    id: 2,
    name: "Ceyhan Fazlıoğlu",
    profession: "Full Stack Developer",
    image: "/src/assets/team/ceyhan-fazlioglu.jpg",
    bgColor: "#E5E5E5", 
    social: {
      facebook: "#",
      instagram: "#",
      twitter: "#"
    }
  }
];

const TeamCard = ({ member }) => {
  return (
    <div className="bg-white overflow-hidden">
      <div 
        className="h-64 md:h-80 flex items-end justify-center overflow-hidden"
        style={{ backgroundColor: member.bgColor }}
      >
        <img 
          src={member.image}
          alt={`${member.name} - ${member.profession}`}
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
  );
};

const TeamPage = () => {
  return (
    <div className="w-full bg-white py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#252B42] mb-6">
            Meet Our Team
          </h2>
          <p className="text-sm md:text-base text-[#737373] max-w-2xl mx-auto leading-relaxed">
            Problems trying to resolve the conflict between 
            the two major realms of Classical physics: 
            Newtonian mechanics
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamPage;
