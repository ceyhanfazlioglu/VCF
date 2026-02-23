import React from 'react';
import { Link } from 'react-router-dom';
import { turkishToEnglish, buildCategoryUrl } from '../utils/categoryUtils';

const ProductCard = ({ product, category }) => {
  const primaryImage = product.images?.find(img => img.index === 0) || product.images?.[0];

  /**
   * T16 URL: /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
   * 
   * `category` prop geçilirse tam URL, yoksa fallback /product/:id
   */
  const buildProductUrl = () => {
    const nameSlug = turkishToEnglish(product.name);

    if (category) {
      const gender      = category.gender === 'k' ? 'kadin' : 'erkek';
      const catName     = turkishToEnglish(category.title);
      const catId       = category.id;
      return `/shop/${gender}/${catName}/${catId}/${nameSlug}/${product.id}`;
    }

    // Fallback — category bilgisi yokken (örn. BestsellerProducts)
    return `/product/${product.id}`;
  };

  return (
    <Link
      to={buildProductUrl()}
      className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={primaryImage?.url || 'https://placehold.co/400x600/png?text=No+Image'}
          alt={product.name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => { e.target.src = 'https://placehold.co/400x600/png?text=No+Image'; }}
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-[#252B42] mb-1 line-clamp-1 group-hover:text-[#23A6F0] transition-colors">
          {product.name}
        </h3>

        <p className="text-sm text-[#737373] mb-3 line-clamp-2 h-10">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.sell_price && (
              <span className="text-sm text-[#BDBDBD] line-through">${product.sell_price}</span>
            )}
            <span className="text-xl font-bold text-[#23856D]">
              ${product.price}
            </span>
          </div>

          {product.rating > 0 && (
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm text-[#737373]">{product.rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {product.stock > 0 && product.stock < 10 && (
          <p className="text-xs text-orange-500 mt-2 font-medium">Only {product.stock} left!</p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-500 font-bold mt-2">Out of Stock</p>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;