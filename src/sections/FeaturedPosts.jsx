import React from 'react';
import { Calendar, MessageCircle, ChevronRight } from 'lucide-react';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      image: '/assets/posts/post-1.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10,
    },
    {
      id: 2,
      image: '/assets/posts/post-2.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10,
    },
    {
      id: 3,
      image: '/assets/posts/post-3.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: 'Loudest à la Madison #1 (L\'integral)',
      description: 'We focus on ergonomics and meeting you where you work. It\'s only a keystroke away.',
      date: '22 April 2021',
      comments: 10,
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12 max-w-[692px] mx-auto">
          <h6 className="text-[#23A6F0] text-sm font-bold mb-2">Practice Advice</h6>
          <h2 className="text-2xl md:text-3xl font-bold text-[#252B42] mb-2">
            Featured Posts
          </h2>
          <p className="text-[#737373] text-sm">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Posts Grid - Figma Desktop: 1050px, Mobile: stack */}
        <div className="max-w-[1050px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-[30px]">
            {posts.map((post) => (
              <div key={post.id} className="bg-white shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                {/* Image with NEW badge - Mobile: higher */}
                <div className="relative overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-[300px] md:h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* NEW Badge */}
                  <span className="absolute top-4 left-4 bg-[#E74040] text-white text-xs font-bold px-3 py-1">
                    NEW
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {/* Tags */}
                  <div className="flex gap-2 text-xs">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className={index === 0 ? 'text-[#8EC2F2]' : 'text-[#737373]'}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-[#252B42] leading-tight">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#737373] text-sm line-clamp-3">
                    {post.description}
                  </p>

                  {/* Meta info */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-[#737373] text-xs">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#737373] text-xs">
                      <MessageCircle className="w-4 h-4" />
                      <span>{post.comments} comments</span>
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <a 
                    href="#" 
                    className="flex items-center gap-2 text-[#737373] hover:text-[#23A6F0] text-sm font-bold group transition-colors"
                  >
                    <span>Learn More</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;