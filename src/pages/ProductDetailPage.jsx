import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ArrowLeft, ShoppingCart, Heart, Eye, ChevronRight, Check } from 'lucide-react';
import { fetchSingleProduct } from '../store/actions/productActions';
import { addToCart } from '../store/actions/shoppingCartActions';
import LoadingSpinner from '../components/LoadingSpinner';
import BrandLogos from '../components/BrandLogos';
import ProductCard from '../components/ProductCard';
import axiosInstance from '../api/axiosInstance';

const ProductDetailPage = () => {
  const params    = useParams();
  const productId = params.productId || params.id;

  const history  = useHistory();
  const dispatch = useDispatch();

  const { currentProduct: product, fetchState, categories } = useSelector(s => s.product);
  const cart = useSelector(s => s.shoppingCart.cart);

  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab]         = useState('description');
  const [bestsellerProducts, setBestsellerProducts] = useState([]);
  const [quantity, setQuantity]           = useState(1);
  const [addedToCart, setAddedToCart]     = useState(false); // feedback

  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
      setSelectedImage(0);
      setAddedToCart(false);
    }
  }, [productId, dispatch]);

  useEffect(() => {
    axiosInstance.get('/products?limit=8&sort=sell_count:desc')
      .then(res => setBestsellerProducts(res.data.products || []))
      .catch(() => {});
  }, []);

  // Ürün sepette kaç adet var?
  const cartItem    = product ? cart.find(i => i.product.id === product.id) : null;
  const cartCount   = cartItem ? cartItem.count : 0;

  // T17: Sepete ekle
  const handleAddToCart = () => {
    if (!product) return;
    dispatch(addToCart(product, quantity));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (fetchState === 'FETCHING' || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (fetchState === 'FAILED') {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 text-xl">Failed to load product.</p>
        <button onClick={() => history.goBack()}
          className="flex items-center gap-2 px-6 py-3 bg-[#23A6F0] text-white rounded font-bold hover:bg-[#1a8ad1]">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>
      </div>
    );
  }

  const primaryImage = product.images?.[selectedImage] || product.images?.[0];
  const gender  = params.gender;
  const catName = params.categoryName;
  const catId   = params.categoryId;

  const colors = [
    { name: 'Blue',   code: '#23A6F0' },
    { name: 'Green',  code: '#2DC071' },
    { name: 'Orange', code: '#E77C40' },
    { name: 'Navy',   code: '#252B42' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        {/* Breadcrumb + Back */}
        <div className="flex items-center justify-between mb-6">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#252B42] font-bold hover:text-[#23A6F0]">Home</Link>
            <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
            {catId ? (
              <>
                <Link to={`/shop/${gender}/${catName}/${catId}`} className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
                <span className="text-[#737373] capitalize">{catName?.replace(/-/g, ' ')}</span>
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
              </>
            ) : (
              <>
                <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
                <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
              </>
            )}
            <span className="text-[#737373] line-clamp-1 max-w-[200px]">{product.name}</span>
          </nav>
          <button onClick={() => history.goBack()}
            className="flex items-center gap-2 text-[#737373] hover:text-[#252B42] font-medium transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Images */}
            <div>
              <div className="relative mb-4 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={primaryImage?.url || 'https://placehold.co/600x800/png?text=No+Image'}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
                {product.images?.length > 1 && (
                  <>
                    <button onClick={() => setSelectedImage(i => Math.max(0, i - 1))}
                      className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white">
                      <ArrowLeft className="w-5 h-5 text-[#252B42]" />
                    </button>
                    <button onClick={() => setSelectedImage(i => Math.min(product.images.length - 1, i + 1))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 rounded-full p-2 shadow hover:bg-white">
                      <ChevronRight className="w-5 h-5 text-[#252B42]" />
                    </button>
                  </>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img, i) => (
                    <img key={i} src={img.url} alt={`thumb-${i}`} onClick={() => setSelectedImage(i)}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border-2 flex-shrink-0 transition-all ${selectedImage === i ? 'border-[#23A6F0] shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-[#252B42] mb-3">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">
                  {[1,2,3,4,5].map(star => (
                    <svg key={star} className={`w-5 h-5 ${star <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-[#737373] text-sm font-semibold">{product.sell_count || 0} Reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-5">
                {product.sell_price && <span className="text-xl text-[#BDBDBD] line-through">${product.sell_price}</span>}
                <span className="text-3xl font-bold text-[#252B42]">${product.price}</span>
              </div>

              {/* Availability */}
              <div className="flex items-center gap-2 mb-5">
                <span className="font-bold text-[#252B42]">Availability :</span>
                <span className={`font-bold ${product.stock > 0 ? 'text-[#23A6F0]' : 'text-red-500'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </span>
              </div>

              {/* Description */}
              <p className="text-[#737373] mb-6 leading-relaxed">{product.description}</p>

              <hr className="border-gray-200 mb-6" />

              {/* Colors */}
              <div className="mb-6">
                <p className="text-sm font-bold text-[#252B42] mb-2">Colors</p>
                <div className="flex gap-2">
                  {colors.map(c => (
                    <button key={c.name} title={c.name}
                      className="w-8 h-8 rounded-full border-2 border-white outline outline-2 outline-transparent hover:outline-[#737373] transition-all"
                      style={{ backgroundColor: c.code }} />
                  ))}
                </div>
              </div>

              {/* T17: Quantity + Add to Cart */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-2 text-[#252B42] hover:bg-gray-100 font-bold">−</button>
                  <span className="px-4 py-2 font-bold text-[#252B42] border-x border-gray-300">{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-2 text-[#252B42] hover:bg-gray-100 font-bold">+</button>
                </div>

                {/* T17: Add to Cart butonu */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`flex-1 min-w-[160px] flex items-center justify-center gap-2 px-6 py-2.5 rounded font-bold transition-all ${
                    addedToCart
                      ? 'bg-[#2DC071] text-white'
                      : product.stock === 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#23A6F0] text-white hover:bg-[#1a8ad1]'
                  }`}
                >
                  {addedToCart ? (
                    <><Check className="w-4 h-4" /> Added! ({cartCount + quantity})</>
                  ) : (
                    <><ShoppingCart className="w-4 h-4" /> Add to Cart{cartCount > 0 && ` (${cartCount})`}</>
                  )}
                </button>

                <button className="border border-gray-300 p-2.5 rounded hover:bg-gray-50 hover:border-[#252B42] transition-colors">
                  <Heart className="w-5 h-5 text-[#252B42]" />
                </button>
                <button className="border border-gray-300 p-2.5 rounded hover:bg-gray-50 hover:border-[#252B42] transition-colors">
                  <Eye className="w-5 h-5 text-[#252B42]" />
                </button>
              </div>

              {/* Sepetteki adet bilgisi */}
              {cartCount > 0 && (
                <p className="mt-3 text-sm text-[#2DC071] font-medium flex items-center gap-1">
                  <Check className="w-4 h-4" />
                  You have {cartCount} of this item in your cart
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b px-6 flex gap-8 overflow-x-auto">
            {['description', 'additional', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                className={`py-4 font-bold text-sm whitespace-nowrap relative transition-colors capitalize ${activeTab === tab ? 'text-[#252B42]' : 'text-[#737373] hover:text-[#252B42]'}`}>
                {tab === 'reviews' ? `Reviews (${product.sell_count || 0})` : tab === 'additional' ? 'Additional Information' : 'Description'}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#23A6F0]" />}
              </button>
            ))}
          </div>
          <div className="p-8">
            {activeTab === 'description' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <img src={primaryImage?.url || 'https://placehold.co/400x600/png?text=Product'} alt="detail" className="w-full h-auto rounded-lg shadow" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#252B42] mb-4">Product Details</h3>
                  <p className="text-[#737373] leading-relaxed">{product.description}</p>
                  <ul className="mt-4 space-y-2">
                    {['Premium quality material', 'Comfortable fit', 'Easy care instructions', 'Available in multiple sizes'].map(item => (
                      <li key={item} className="flex items-start gap-2 text-[#737373] text-sm">
                        <ChevronRight className="w-4 h-4 text-[#23A6F0] flex-shrink-0 mt-0.5" />{item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#252B42] mb-4">Specifications</h3>
                  <ul className="space-y-2">
                    {[['Stock', product.stock], ['Rating', `${product.rating?.toFixed(2)} / 5`], ['Sold', `${product.sell_count} units`], ['Product ID', product.id]].map(([label, value]) => (
                      <li key={label} className="flex items-center gap-2 text-sm">
                        <ChevronRight className="w-4 h-4 text-[#737373] flex-shrink-0" />
                        <span className="text-[#252B42] font-semibold">{label}:</span>
                        <span className="text-[#737373]">{value}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'additional' && <p className="text-[#737373]">Additional product information will be displayed here.</p>}
            {activeTab === 'reviews' && <p className="text-[#737373]">Product reviews ({product.sell_count || 0}) will be displayed here.</p>}
          </div>
        </div>

        {/* Bestsellers */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#252B42] mb-2">BESTSELLER PRODUCTS</h2>
          <hr className="border-gray-200 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {bestsellerProducts.length > 0
              ? bestsellerProducts.map(bp => <ProductCard key={bp.id} product={bp} />)
              : Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-80" />
                ))}
          </div>
        </div>
      </div>

      <BrandLogos />
    </div>
  );
};

export default ProductDetailPage;