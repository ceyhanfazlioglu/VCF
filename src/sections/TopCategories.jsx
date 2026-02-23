import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../store/actions/Categoryactions';
import { getTopCategories, buildCategoryUrl } from '../utils/categoryUtils';

const TopCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.product.categories);
  const fetchState = useSelector(state => state.product.fetchState);

  useEffect(() => {
    // Fetch categories if not already fetched
    if (categories.length === 0 && fetchState === 'NOT_FETCHED') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, fetchState]);

  // Get top 5 categories by rating
  const topCategories = getTopCategories(categories, 5);

  if (fetchState === 'FETCHING') {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </section>
    );
  }

  if (topCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#252B42] mb-4">
            Top Categories
          </h2>
          <p className="text-[#737373] max-w-2xl mx-auto">
            Explore our most popular categories with the highest ratings
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {topCategories.map((category) => (
            <Link
              key={category.id}
              to={buildCategoryUrl(category)}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Category Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x600?text=Category';
                  }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                
                {/* Category Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1">
                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-sm font-semibold">{category.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Link
            to="/shop"
            className="inline-block px-8 py-3 bg-[#23A6F0] text-white font-bold rounded hover:bg-[#1a8ad1] transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopCategories;