import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const { id, title, department, originalPrice, salePrice, image, colors } = product;

  return (
    <Link to={`/product/${id}`} className="group">
      <div className="bg-white">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title}
            className="w-full h-[300px] sm:h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info */}
        <div className="p-4 sm:p-6 text-center space-y-2">
          {/* Title */}
          <h3 className="font-bold text-[#252B42] text-base">
            {title}
          </h3>

          {/* Department */}
          <p className="text-[#737373] text-sm font-bold">
            {department}
          </p>

          {/* Prices */}
          <div className="flex gap-2 justify-center items-center">
            <span className="text-[#BDBDBD] line-through font-bold">
              ${originalPrice.toFixed(2)}
            </span>
            <span className="text-[#23856D] font-bold">
              ${salePrice.toFixed(2)}
            </span>
          </div>

          {/* Color Options */}
          {colors && (
            <div className="flex gap-1 justify-center pt-2">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className="w-4 h-4 rounded-full border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  aria-label={`Color option ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
