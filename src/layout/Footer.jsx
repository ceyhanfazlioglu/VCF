import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Footer Top Section */}
      <div className="bg-[#FAFAFA] py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-2xl font-bold text-[#252B42]">
              Consulting Agency For Your Business
            </h2>
            <p className="text-[#737373] hidden md:block">
              the quick fox jumps over the lazy dog
            </p>
            <button className="bg-[#23A6F0] text-white px-8 py-3 rounded hover:bg-[#1a8cd1] transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Company Info */}
            <div>
              <h3 className="text-[#252B42] font-bold mb-4">Company Info</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">About Us</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Carrier</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">We are hiring</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Blog</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-[#252B42] font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">About Us</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Carrier</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">We are hiring</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Blog</a></li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-[#252B42] font-bold mb-4">Features</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Business Marketing</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">User Analytic</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Live Chat</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Unlimited Support</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-[#252B42] font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">IOS & Android</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Watch a Demo</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">Customers</a></li>
                <li><a href="#" className="text-[#737373] hover:text-[#23A6F0]">API</a></li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div>
              <h3 className="text-[#252B42] font-bold mb-4">Get In Touch</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-[#737373]">
                  <svg className="w-5 h-5 mt-1 text-[#23A6F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>(480) 555-0103</span>
                </li>
                <li className="flex items-start gap-2 text-[#737373]">
                  <svg className="w-5 h-5 mt-1 text-[#23A6F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>4517 Washington Ave.</span>
                </li>
                <li className="flex items-start gap-2 text-[#737373]">
                  <svg className="w-5 h-5 mt-1 text-[#23A6F0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>debra.holt@example.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-[#FAFAFA] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#737373] text-sm">
              Made With Love By Figmaland All Right Reserved
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
    </footer>
  );
};

export default Footer;
