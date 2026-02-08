import React from 'react';
import { Calendar, MessageCircle, ChevronRight } from 'lucide-react';

const FeaturedPosts = () => {
  const posts = [
    {
      id: 1,
      image: '/assets/posts/post-1.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
    {
      id: 2,
      image: '/assets/posts/post-2.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
    {
      id: 3,
      image: '/assets/posts/post-3.jpg',
      tags: ['Google', 'Trending', 'New'],
      title: "Loudest à la Madison #1 (L'integral)",
      description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
      date: '22 April 2021',
      comments: 10,
    },
  ];

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h6 className="text-[#23A6F0] text-sm font-bold mb-2">Practice Advice</h6>
          <h2 className="text-3xl md:text-4xl font-bold text-[#252B42] mb-2">
            Featured Posts
          </h2>
          <p className="text-[#737373] max-w-md mx-auto">
            Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-white shadow-sm hover:shadow-lg transition-shadow">
              {/* Post Image */}
              <div className="relative overflow-hidden">
                <div className="absolute top-4 left-4 bg-[#E74040] text-white px-3 py-1 text-xs font-bold rounded">
                  NEW
                </div>
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-[300px] object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Post Content */}
              <div className="p-6 space-y-4">
                {/* Tags */}
                <div className="flex gap-2 text-xs">
                  <span className="text-[#23A6F0]">Google</span>
                  <span className="text-[#737373]">Trending</span>
                  <span className="text-[#737373]">New</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-[#252B42] leading-tight">
                  {post.title}
                </h3>

                {/* Description */}
                <p className="text-[#737373] text-sm leading-relaxed">
                  {post.description}
                </p>

                {/* Meta Info */}
                <div className="flex justify-between items-center pt-4">
                  <div className="flex items-center gap-2 text-[#737373] text-xs">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#737373] text-xs">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments} comments</span>
                  </div>
                </div>

                {/* Learn More Link */}
                <a 
                  href="#" 
                  className="flex items-center gap-2 text-[#737373] hover:text-[#23A6F0] font-bold text-sm pt-2"
                >
                  Learn More
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPosts;
