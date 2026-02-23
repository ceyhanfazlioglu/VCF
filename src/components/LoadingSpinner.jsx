import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#23A6F0] mb-4"></div>
      <p className="text-[#737373] text-lg">Loading products...</p>
    </div>
  );
};

export default LoadingSpinner;