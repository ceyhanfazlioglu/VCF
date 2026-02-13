import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Instagram, Youtube, Facebook, Twitter, Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full">
      <div className="hidden md:block bg-[#252B42] text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-row justify-between items-center py-2 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(225) 555-0118</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>michelle.rivera@example.com</span>
              </div>
            </div>
            <div className="text-center">
              Follow Us and get a chance to win 80% off
            </div>
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

      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="text-2xl font-bold text-[#252B42]">
              VCF
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-[#737373] hover:text-[#23A6F0]">Home</Link>
              <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
              <Link to="/team" className="text-[#737373] hover:text-[#23A6F0]">Team</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23A6F0]">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23A6F0]">Contact</Link>
            </nav>

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

              <button
                className="md:hidden text-[#252B42]"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <nav className="container mx-auto px-4 py-4 flex flex-col items-center gap-6 text-lg">
              <Link to="/" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Shop</Link>
              <Link to="/team" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Team</Link>
              <Link to="/blog" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link to="/pages" className="text-[#737373] hover:text-[#23A6F0]" onClick={() => setMenuOpen(false)}>Pages</Link>
              <div className="flex items-center gap-6 pt-2 border-t w-full justify-center">
                <Link to="/login" className="flex items-center gap-1 text-[#23A6F0]">
                  <User className="w-5 h-5" />
                  <span>Login / Register</span>
                </Link>
                <button className="flex items-center gap-1 text-[#23A6F0]">
                  <Heart className="w-5 h-5" />
                  <span>1</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;