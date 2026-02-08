import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Search, ShoppingCart, Heart, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-[#252B42] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2 text-sm">
            {/* Contact Info */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>

            {/* Promo Text */}
            <div className="hidden md:block text-center py-2 md:py-0">
              Follow Us and get a chance to win 80% off
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              <span>Follow Us :</span>
              <div className="flex gap-2">
                <Instagram className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Youtube className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Facebook className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Twitter className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              BrandName
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-[#737373] hover:text-[#23A6F0]">Home</Link>
              <div className="relative group">
                <button className="flex items-center gap-1 text-[#737373] hover:text-[#23A6F0]">
                  Shop
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              <Link to="/about" className="text-[#737373] hover:text-[#23A6F0]">About</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23A6F0]">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23A6F0]">Contact</Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#23A6F0]">Pages</Link>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              <Link to="/login" className="hidden md:flex items-center gap-1 text-[#23A6F0] hover:underline">
                <User className="w-4 h-4" />
                <span className="text-sm">Login / Register</span>
              </Link>
              <button className="text-[#23A6F0]">
                <Search className="w-5 h-5" />
              </button>
              <button className="flex items-center gap-1 text-[#23A6F0]">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-sm">1</span>
              </button>
              <button className="hidden md:flex items-center gap-1 text-[#23A6F0]">
                <Heart className="w-5 h-5" />
                <span className="text-sm">1</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
