import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { fetchProducts } from '../store/actions/productActions';
import { fetchCategories } from '../store/actions/Categoryactions';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Pagination from '../components/Pagination';
import BrandLogos from '../components/BrandLogos';
import { buildCategoryUrl } from '../utils/categoryUtils';

const STATIC_BRANDS = ['Bedroom', 'Decor', 'Decoration', 'Kitchen', 'Lamp', 'Lighting'];
const STATIC_COLORS = [
  { name: 'Blue',      hex: '#4285F4' },
  { name: 'Green',     hex: '#34A853' },
  { name: 'Orange',    hex: '#FF6D00' },
  { name: 'Dark Blue', hex: '#1A237E' },
];


const FilterDropdown = ({
  categories,
  selectedCategoryId,
  onCategoryChange,
  selectedBrands,
  onBrandToggle,
  selectedColors,
  onColorToggle,
  priceRange,
  onPriceChange,
  onApply,
}) => (
  <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl">
    <div className="flex gap-0 p-8">

      {/* Filter By Category */}
      <div className="flex-1 pr-8 border-r border-gray-100">
        <h4 className="font-bold text-[#252B42] mb-4 text-sm tracking-wide">Filter By Category</h4>
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="radio" name="filter-category" value=""
              checked={selectedCategoryId === ''}
              onChange={() => onCategoryChange('')}
              className="w-4 h-4 accent-[#23A6F0]"
            />
            <span className={`text-sm ${selectedCategoryId === '' ? 'text-[#252B42] font-semibold' : 'text-[#737373] group-hover:text-[#252B42]'}`}>All</span>
          </label>
          {categories.map((cat) => (
            <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
              <input type="radio" name="filter-category" value={cat.id}
                checked={selectedCategoryId === String(cat.id)}
                onChange={() => onCategoryChange(String(cat.id))}
                className="w-4 h-4 accent-[#23A6F0]"
              />
              <span className={`text-sm ${selectedCategoryId === String(cat.id) ? 'text-[#252B42] font-semibold' : 'text-[#737373] group-hover:text-[#252B42]'}`}>
                {cat.title}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter By Brand */}
      <div className="flex-1 px-8 border-r border-gray-100">
        <h4 className="font-bold text-[#252B42] mb-4 text-sm tracking-wide">Filter By Brand</h4>
        <div className="space-y-3">
          {STATIC_BRANDS.map((brand) => (
            <label key={brand} className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandToggle(brand)}
                className="w-4 h-4 accent-[#23A6F0] rounded"
              />
              <span className={`text-sm ${selectedBrands.includes(brand) ? 'text-[#252B42] font-semibold' : 'text-[#737373] group-hover:text-[#252B42]'}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter By Color */}
      <div className="flex-1 px-8 border-r border-gray-100">
        <h4 className="font-bold text-[#252B42] mb-4 text-sm tracking-wide">Filter By Color</h4>
        <div className="space-y-3">
          {STATIC_COLORS.map(({ name, hex }) => (
            <label key={name} className="flex items-center gap-3 cursor-pointer group">
              <button type="button" onClick={() => onColorToggle(name)}
                className={`w-5 h-5 rounded-full border-2 flex-shrink-0 transition-all ${selectedColors.includes(name) ? 'border-[#252B42] scale-110 shadow-md' : 'border-transparent'}`}
                style={{ backgroundColor: hex }}
              />
              <span onClick={() => onColorToggle(name)}
                className={`text-sm cursor-pointer ${selectedColors.includes(name) ? 'text-[#252B42] font-semibold' : 'text-[#737373] group-hover:text-[#252B42]'}`}>
                {name}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Filter By Price */}
      <div className="flex-1 pl-8">
        <h4 className="font-bold text-[#252B42] mb-4 text-sm tracking-wide">Filter By Price</h4>
        <div className="relative h-2 bg-gray-200 rounded-full mb-5 mt-3">
          <div className="absolute h-2 bg-[#23A6F0] rounded-full pointer-events-none"
            style={{ left: `${(priceRange[0] / 1000) * 100}%`, right: `${100 - (priceRange[1] / 1000) * 100}%` }}
          />
          <div className="absolute w-4 h-4 bg-white border-2 border-[#23A6F0] rounded-full -top-1 shadow pointer-events-none"
            style={{ left: `calc(${(priceRange[0] / 1000) * 100}% - 8px)` }} />
          <div className="absolute w-4 h-4 bg-white border-2 border-[#23A6F0] rounded-full -top-1 shadow pointer-events-none"
            style={{ left: `calc(${(priceRange[1] / 1000) * 100}% - 8px)` }} />
        </div>
        <div className="flex gap-3 mb-5">
          <input type="number" min={0} max={priceRange[1] - 10} value={priceRange[0]}
            onChange={(e) => onPriceChange([Number(e.target.value), priceRange[1]])}
            className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-[#23A6F0]"
          />
          <input type="number" min={priceRange[0] + 10} max={1000} value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], Number(e.target.value)])}
            className="w-20 border border-gray-300 rounded px-2 py-1.5 text-sm text-center focus:outline-none focus:border-[#23A6F0]"
          />
        </div>
        <button onClick={onApply}
          className="w-full bg-[#23A6F0] text-white py-2.5 rounded font-bold text-sm hover:bg-[#1a8ad1] transition-colors">
          Filter
        </button>
      </div>
    </div>
  </div>
);


const ShopPage = () => {
  const dispatch = useDispatch();
  const { categoryId } = useParams();  
  const { productList, total, fetchState, limit, offset, categories } = useSelector(
    (state) => state.product
  );

  
  const [category, setCategory] = useState(categoryId || '');
  const [sort, setSort]         = useState('');
  const [filter, setFilter]     = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode]       = useState('grid');
  const [filterOpen, setFilterOpen]   = useState(false);
  const filterRef = useRef(null);

  const [selectedCategoryId, setSelectedCategoryId] = useState(categoryId || '');
  const [selectedBrands, setSelectedBrands]   = useState([]);
  const [selectedColors, setSelectedColors]   = useState([]);
  const [priceRange, setPriceRange]           = useState([0, 1000]);

  useEffect(() => {
    const handler = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setFilterOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  useEffect(() => {
    setCategory(categoryId || '');
    setSelectedCategoryId(categoryId || '');
    setCurrentPage(1);
  }, [categoryId]);

  
  useEffect(() => {
    const newOffset = (currentPage - 1) * limit;
    dispatch(fetchProducts({
      category: category || undefined,
      sort:     sort     || undefined,
      filter:   filter   || undefined,
      limit,
      offset: newOffset,
    }));
  }, [dispatch, category, sort, filter, currentPage, limit]);

  useEffect(() => {
    setCurrentPage(1);
  }, [category, sort, filter]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
    
  };

  
  const debounceTimer = useRef(null);
  const handleFilterInput = (e) => {
    const val = e.target.value;
    clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setFilter(val);  
    }, 400);
  };

  const handleDropdownApply = () => {
    setCategory(selectedCategoryId);  
    setFilterOpen(false);
  };

  const handleClear = () => {
    setCategory('');
    setSort('');
    setFilter('');
    setSelectedCategoryId('');
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 1000]);
    if (filterInputRef.current) filterInputRef.current.value = '';
  };

  const filterInputRef = useRef(null);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBrandToggle = (brand) =>
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  const handleColorToggle = (color) =>
    setSelectedColors((prev) => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);

  const hasActiveFilters = category || sort || filter;
  const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Page Header ── */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[#252B42]">Shop</h1>
            <nav className="flex items-center gap-2 text-sm">
              <Link to="/" className="text-[#252B42] hover:text-[#23A6F0]">Home</Link>
              <span className="text-[#737373]">/</span>
              <span className="text-[#737373]">Shop</span>
            </nav>
          </div>

          {/* Category Cards */}
          {topCategories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {topCategories.map((cat) => (
                <Link key={cat.id} to={buildCategoryUrl(cat)} className="relative h-48 rounded-lg overflow-hidden group">
                  <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center text-white text-center px-2">
                    <h3 className="text-lg font-bold leading-tight">{cat.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">

        <div className="relative" ref={filterRef}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-2">

            <div className="flex items-center gap-3 flex-wrap">
              <p className="text-[#737373] text-sm">
                {fetchState === 'FETCHED' && (
                  <>Showing all <span className="font-bold text-[#252B42]">{total}</span> results</>
                )}
              </p>
              {category && (
                <span className="text-xs bg-blue-50 text-[#23A6F0] border border-[#23A6F0] rounded-full px-2 py-0.5 font-medium">
                  Category: {categories.find(c => String(c.id) === category)?.title || category}
                </span>
              )}
              {filter && (
                <span className="text-xs bg-blue-50 text-[#23A6F0] border border-[#23A6F0] rounded-full px-2 py-0.5 font-medium">
                  Filter: "{filter}"
                </span>
              )}
              {sort && (
                <span className="text-xs bg-blue-50 text-[#23A6F0] border border-[#23A6F0] rounded-full px-2 py-0.5 font-medium">
                  Sort: {sort}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">

              <div className="flex items-center gap-1">
                <span className="text-[#737373] text-sm font-medium mr-1">Views:</span>
                <button onClick={() => setViewMode('grid')}
                  className={`p-2 rounded border transition-colors ${viewMode === 'grid' ? 'border-[#23A6F0] text-[#23A6F0]' : 'border-gray-200 text-[#737373] hover:border-gray-400'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button onClick={() => setViewMode('list')}
                  className={`p-2 rounded border transition-colors ${viewMode === 'list' ? 'border-[#23A6F0] text-[#23A6F0]' : 'border-gray-200 text-[#737373] hover:border-gray-400'}`}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              <input
                ref={filterInputRef}
                type="text"
                placeholder="Search products..."
                defaultValue={filter}
                onChange={handleFilterInput}
                className="px-3 py-2 border border-gray-300 rounded text-sm text-[#737373] focus:outline-none focus:border-[#23A6F0] w-44"
              />

              <select
                value={sort}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded text-sm text-[#737373] focus:outline-none focus:border-[#23A6F0] bg-white"
              >
                <option value="">Popularity</option>
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="rating:asc">Rating: Low to High</option>
                <option value="rating:desc">Rating: High to Low</option>
              </select>

              <button
                onClick={() => setFilterOpen((v) => !v)}
                className="flex items-center gap-2 px-5 py-2 bg-[#23A6F0] text-white rounded font-bold text-sm hover:bg-[#1a8ad1] transition-colors"
              >
                Filter
              </button>

              {hasActiveFilters && (
                <button onClick={handleClear} className="text-sm text-[#737373] underline hover:text-[#E74040]">
                  Clear
                </button>
              )}
            </div>
          </div>

          {filterOpen && (
            <FilterDropdown
              categories={categories}
              selectedCategoryId={selectedCategoryId}
              onCategoryChange={setSelectedCategoryId}
              selectedBrands={selectedBrands}
              onBrandToggle={handleBrandToggle}
              selectedColors={selectedColors}
              onColorToggle={handleColorToggle}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onApply={handleDropdownApply}
            />
          )}
        </div>

        {/* ── Products ── */}
        <div className="mt-6">
          {fetchState === 'FETCHING' && <LoadingSpinner />}

          {fetchState === 'FAILED' && (
            <div className="text-center py-12">
              <p className="text-red-500 text-lg mb-4">Failed to load products.</p>
              <button
                onClick={() => dispatch(fetchProducts({ limit, offset: 0 }))}
                className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]"
              >
                Retry
              </button>
            </div>
          )}

          {fetchState === 'FETCHED' && (
            <>
              {productList.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm">
                  <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-[#737373] text-lg mb-4">No products found.</p>
                  <button onClick={handleClear} className="px-6 py-2 bg-[#23A6F0] text-white rounded hover:bg-[#1a8ad1]">
                    Clear Filters
                  </button>
                </div>
              ) : (
                <>
                  {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {productList.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {productList.map((product) => (
                        <ListProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  )}
                  <Pagination
                    currentPage={currentPage}
                    totalItems={total}
                    itemsPerPage={limit}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}
        </div>
      </div>

      <BrandLogos />
    </div>
  );
};

const ListProductCard = ({ product }) => {
  const imageUrl = (product.images || [])[0]?.url || product.image || '';
  return (
    <Link to={`/product/${product.id}`} className="bg-white rounded-lg shadow-sm overflow-hidden flex gap-4 p-4 hover:shadow-md transition-shadow">
      <img src={imageUrl} alt={product.name} className="w-32 h-32 object-cover rounded-lg shrink-0" />
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-[#252B42] text-base mb-1 truncate">{product.name}</h3>
        <p className="text-[#737373] text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center gap-3">
          {product.sell_price && <span className="text-[#BDBDBD] line-through text-sm">${product.sell_price}</span>}
          <span className="text-[#23856D] font-bold text-lg">${product.price}</span>
        </div>
        <div className="flex items-center gap-1 mt-2">
          {[1,2,3,4,5].map((star) => (
            <svg key={star} className={`w-4 h-4 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ShopPage;