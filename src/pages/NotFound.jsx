import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-[#FAFAFA]">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-6xl md:text-8xl font-bold text-[#252B42]">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold text-[#252B42]">Page Not Found</h2>
        <p className="text-[#737373] max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-[#23A6F0] hover:bg-[#1a8cd1] text-white px-8 py-3 rounded font-bold transition-colors"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
