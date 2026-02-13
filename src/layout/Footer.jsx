import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white">
      <div className="bg-[#FAFAFA] border-b md:hidden">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-[#252B42]">Bandage</h3>
            <div className="flex gap-4">
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-6">
            <div>
              <h3 className="text-[#252B42] font-bold mb-4 md:mb-6">Company Info</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">About Us</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Carrier</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">We are hiring</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#252B42] font-bold mb-4 md:mb-6">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">About Us</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Carrier</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">We are hiring</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#252B42] font-bold mb-4 md:mb-6">Features</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Business Marketing</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">User Analytic</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Live Chat</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Unlimited Support</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#252B42] font-bold mb-4 md:mb-6">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">IOS & Android</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Watch a Demo</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">Customers</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0] block">API</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-[#252B42] font-bold mb-4 md:mb-6">Get In Touch</h3>
              <div>
                <form className="w-full max-w-sm">
                  <div className="flex">
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l focus:outline-none focus:border-[#23A6F0]"
                    />
                    <button
                      type="submit"
                      className="bg-[#23A6F0] text-white px-6 py-3 rounded-r hover:bg-[#1a8cd1] transition-colors"
                    >
                      Subscribe
                    </button>
                  </div>
                  <p className="text-xs text-[#737373] mt-2">Lore imp sum dolor Amit</p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden md:block bg-[#FAFAFA] border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <p className="text-[#737373] text-sm">
              Made With Love By VCF All Right Reserved
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#23A6F0] hover:text-[#1a8cd1]">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom - Mobile copyright */}
      <div className="md:hidden bg-[#FAFAFA] border-t">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-[#737373] text-sm">
            Made With Love By VCF All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;