import React, { useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Phone, Mail, Instagram, Youtube, Facebook, Twitter,
  Search, ShoppingCart, Heart, User, Menu, X, LogOut,
  ChevronDown, Trash2, ShoppingBag
} from 'lucide-react';
import { logoutUser } from '../store/actions/authActions';
import { fetchCategories } from '../store/actions/Categoryactions';
import { removeFromCart } from '../store/actions/shoppingCartActions';
import { groupCategoriesByGender, buildCategoryUrl } from '../utils/categoryUtils';
import md5 from 'md5';

const Header = () => {
  const [menuOpen, setMenuOpen]         = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [cartOpen, setCartOpen]         = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = React.useRef(null);
  const cartRef = useRef(null);

  const dispatch = useDispatch();
  const history  = useHistory();

  const user            = useSelector(state => state.client.user);
  const isAuthenticated = user && user.email;
  const categories      = useSelector(state => state.product.categories);

  // T17: cart state'i Redux'tan al
  const cart = useSelector(state => state.shoppingCart.cart);
  const cartItemCount  = cart.reduce((sum, item) => sum + item.count, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + item.count * item.product.price, 0);

  // Categories fetch
  useEffect(() => {
    if (categories.length === 0) dispatch(fetchCategories());
  }, [dispatch, categories.length]);

  // Cart dropdown dışına tıklayınca kapat
  useEffect(() => {
    const handler = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // User menu dışına tıklayınca kapat
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const { kadin, erkek } = groupCategoriesByGender(categories);

  const getGravatarUrl = (email) => {
    if (!email) return '';
    const hash = md5(email.toLowerCase().trim());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=40`;
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    history.push('/');
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileShopOpen(false);
  };

  const handleRemove = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <header className="w-full">

      {/* ── Top Bar ── */}
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
            <div className="text-center">Follow Us and get a chance to win 80% off</div>
            <div className="flex items-center gap-2">
              <span>Follow Us :</span>
              <div className="flex gap-2">
                <Instagram className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Youtube   className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Facebook  className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
                <Twitter   className="w-4 h-4 cursor-pointer hover:text-[#23A6F0]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Nav ── */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-[#252B42]">VCF</Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-[#737373] hover:text-[#23A6F0] font-medium">Home</Link>

              {/* Shop Dropdown */}
              <div className="relative group">
                <Link to="/shop" className="flex items-center gap-1 text-[#737373] hover:text-[#23A6F0] font-medium">
                  Shop
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-200" />
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white shadow-xl rounded-lg py-6 px-8 min-w-[420px] z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 border border-gray-100">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-bold text-[#252B42] mb-4 pb-2 border-b border-gray-100 text-sm uppercase tracking-wider">Kadın</h4>
                      <div className="flex flex-col gap-2.5">
                        {kadin.map(cat => (
                          <Link key={cat.id} to={buildCategoryUrl(cat)}
                            className="flex items-center gap-2 text-[#737373] hover:text-[#23A6F0] hover:translate-x-1 transition-all text-sm group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-[#23A6F0] transition-colors flex-shrink-0" />
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#252B42] mb-4 pb-2 border-b border-gray-100 text-sm uppercase tracking-wider">Erkek</h4>
                      <div className="flex flex-col gap-2.5">
                        {erkek.map(cat => (
                          <Link key={cat.id} to={buildCategoryUrl(cat)}
                            className="flex items-center gap-2 text-[#737373] hover:text-[#23A6F0] hover:translate-x-1 transition-all text-sm group/item">
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover/item:bg-[#23A6F0] transition-colors flex-shrink-0" />
                            {cat.title}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Link to="/team"    className="text-[#737373] hover:text-[#23A6F0] font-medium">Team</Link>
              <Link to="/blog"    className="text-[#737373] hover:text-[#23A6F0] font-medium">Blog</Link>
              <Link to="/contact" className="text-[#737373] hover:text-[#23A6F0] font-medium">Contact</Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center gap-4">

              {/* Auth — Desktop */}
              {isAuthenticated ? (
                <div className="hidden md:flex items-center gap-4">
                  {/* T23: User dropdown */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setUserMenuOpen(v => !v)}
                      className="flex items-center gap-2 text-[#23A6F0] hover:opacity-80"
                    >
                      <img src={getGravatarUrl(user.email)} alt={user.name || 'User'} className="w-8 h-8 rounded-full" />
                      <span className="text-sm font-bold">{user.name || user.email}</span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {userMenuOpen && (
                      <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                        <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />
                        <Link to="/orders" onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#737373] hover:text-[#23A6F0] hover:bg-gray-50 transition-colors">
                          <ShoppingBag className="w-4 h-4" /> My Orders
                        </Link>
                        <hr className="my-1 border-gray-100" />
                        <button onClick={() => { handleLogout(); setUserMenuOpen(false); }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[#737373] hover:text-[#E74040] hover:bg-gray-50 transition-colors">
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <Link to="/login"  className="flex items-center gap-1 text-[#23A6F0] hover:underline text-sm"><User className="w-4 h-4" /> Login</Link>
                  <Link to="/signup" className="flex items-center gap-1 text-[#23A6F0] hover:underline text-sm"><User className="w-4 h-4" /> Register</Link>
                </div>
              )}

              <button className="text-[#23A6F0]"><Search className="w-5 h-5" /></button>

              {/* T17: Cart Icon + Dropdown */}
              <div className="relative" ref={cartRef}>
                <button
                  onClick={() => setCartOpen(v => !v)}
                  className="relative flex items-center gap-1 text-[#23A6F0] hover:opacity-80 transition-opacity"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount > 9 ? '9+' : cartItemCount}
                    </span>
                  )}
                </button>

                {/* T17: Cart Dropdown — resimde gösterildiği gibi */}
                {cartOpen && (
                  <div className="absolute right-0 top-full mt-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">

                    {/* Küçük ok */}
                    <div className="absolute -top-2 right-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45" />

                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-100">
                      <h3 className="font-bold text-[#252B42] text-base">
                        My Cart ({cartItemCount} {cartItemCount === 1 ? 'Item' : 'Items'})
                      </h3>
                    </div>

                    {/* Cart Items */}
                    <div className="max-h-80 overflow-y-auto">
                      {cart.length === 0 ? (
                        <div className="py-10 text-center">
                          <ShoppingCart className="w-12 h-12 text-gray-200 mx-auto mb-3" />
                          <p className="text-[#737373] text-sm">Sepetiniz boş</p>
                        </div>
                      ) : (
                        cart.map((item) => {
                          const img = item.product.images?.[0]?.url || '';
                          return (
                            <div key={item.product.id} className="flex items-center gap-3 px-5 py-4 border-b border-gray-50 hover:bg-gray-50 transition-colors">
                              {/* Ürün görseli */}
                              <img
                                src={img || 'https://placehold.co/80x80/png?text=?'}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded-lg flex-shrink-0 border border-gray-100"
                                onError={(e) => { e.target.src = 'https://placehold.co/80x80/png?text=?'; }}
                              />

                              {/* Ürün bilgisi */}
                              <div className="flex-1 min-w-0">
                                <p className="text-[#252B42] font-bold text-sm leading-tight line-clamp-2 mb-1">
                                  {item.product.name}
                                </p>
                                <p className="text-[#737373] text-xs">
                                  Qty: {item.count}
                                </p>
                                <p className="text-[#23A6F0] font-bold text-sm mt-1">
                                  ${(item.product.price * item.count).toFixed(2)}
                                </p>
                              </div>

                              {/* Sil butonu */}
                              <button
                                onClick={() => handleRemove(item.product.id)}
                                className="text-gray-300 hover:text-[#E74040] transition-colors flex-shrink-0 p-1"
                                title="Kaldır"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>

                    {/* Footer — Sepete Git + Siparişi Tamamla */}
                    {cart.length > 0 && (
                      <div className="px-5 py-4 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[#737373] text-sm font-medium">Total:</span>
                          <span className="text-[#252B42] font-bold text-lg">
                            ${cartTotalPrice.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex gap-3">
                          <Link to="/cart" onClick={() => setCartOpen(false)}
                            className="flex-1 text-center border-2 border-[#23A6F0] text-[#23A6F0] py-2.5 rounded-lg font-bold text-sm hover:bg-blue-50 transition-colors">
                            View Cart
                          </Link>
                          <Link to="/order" onClick={() => setCartOpen(false)}
                            className="flex-1 text-center bg-[#FF7B00] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#e56e00] transition-colors">
                            Checkout
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <button className="hidden md:flex items-center gap-1 text-[#23A6F0]">
                <Heart className="w-5 h-5" />
              </button>

              {/* Hamburger */}
              <button className="md:hidden text-[#252B42]" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div className="md:hidden border-t bg-white">
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col gap-1">
                <Link to="/" onClick={closeMenu} className="text-[#737373] hover:text-[#23A6F0] py-3 px-2 border-b border-gray-50 font-medium">Home</Link>

                {/* Mobile Shop accordion */}
                <div className="border-b border-gray-50">
                  <button onClick={() => setMobileShopOpen(v => !v)}
                    className="w-full flex items-center justify-between text-[#737373] hover:text-[#23A6F0] py-3 px-2 font-medium">
                    <span>Shop</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileShopOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileShopOpen && (
                    <div className="pb-3 px-2">
                      <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                        <div>
                          <h5 className="font-bold text-[#252B42] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Kadın</h5>
                          <div className="flex flex-col gap-2">
                            {kadin.map(cat => (
                              <Link key={cat.id} to={buildCategoryUrl(cat)} onClick={closeMenu}
                                className="text-[#737373] hover:text-[#23A6F0] text-sm flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                {cat.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h5 className="font-bold text-[#252B42] text-xs uppercase tracking-wider mb-2 pb-1 border-b border-gray-200">Erkek</h5>
                          <div className="flex flex-col gap-2">
                            {erkek.map(cat => (
                              <Link key={cat.id} to={buildCategoryUrl(cat)} onClick={closeMenu}
                                className="text-[#737373] hover:text-[#23A6F0] text-sm flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-gray-400 flex-shrink-0" />
                                {cat.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Link to="/team"    onClick={closeMenu} className="text-[#737373] hover:text-[#23A6F0] py-3 px-2 border-b border-gray-50 font-medium">Team</Link>
                <Link to="/blog"    onClick={closeMenu} className="text-[#737373] hover:text-[#23A6F0] py-3 px-2 border-b border-gray-50 font-medium">Blog</Link>
                <Link to="/contact" onClick={closeMenu} className="text-[#737373] hover:text-[#23A6F0] py-3 px-2 border-b border-gray-50 font-medium">Contact</Link>
              </nav>

              <div className="flex flex-col items-center gap-3 pt-4 border-t mt-4">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={closeMenu} className="flex items-center gap-2 text-[#23A6F0]">
                      <img src={getGravatarUrl(user.email)} alt={user.name || 'User'} className="w-8 h-8 rounded-full" />
                      <span>{user.name || user.email}</span>
                    </Link>
                    <Link to="/orders" onClick={closeMenu} className="flex items-center gap-2 text-[#23A6F0]">
                      <ShoppingBag className="w-5 h-5" /> My Orders
                    </Link>
                    <button onClick={() => { handleLogout(); closeMenu(); }} className="flex items-center gap-2 text-[#23A6F0]">
                      <LogOut className="w-5 h-5" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login"  onClick={closeMenu} className="flex items-center gap-2 text-[#23A6F0]"><User className="w-5 h-5" /> Login</Link>
                    <Link to="/signup" onClick={closeMenu} className="flex items-center gap-2 text-[#23A6F0]"><User className="w-5 h-5" /> Register</Link>
                  </>
                )}
                <div className="flex gap-4 pt-2">
                  <button className="flex items-center gap-1 text-[#23A6F0]"><Search className="w-5 h-5" /></button>
                  <button onClick={() => { setCartOpen(v => !v); closeMenu(); }}
                    className="relative flex items-center gap-1 text-[#23A6F0]">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-[#23A6F0] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartItemCount}
                      </span>
                    )}
                  </button>
                  <button className="flex items-center gap-1 text-[#23A6F0]"><Heart className="w-5 h-5" /></button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;