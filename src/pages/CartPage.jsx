import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowLeft, ChevronRight } from 'lucide-react';
import {
  removeFromCart,
  updateCartItem,
  toggleCartItem,
  clearCart,
} from '../store/actions/shoppingCartActions';

/* ── Miktar butonları ── */
const QtyButton = ({ onClick, children, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-[#252B42] transition-colors"
  >
    {children}
  </button>
);

/* ── Tek sepet satırı ── */
const CartRow = ({ item, dispatch }) => {
  const { product, count, checked } = item;
  const img = product.images?.[0]?.url || '';

  const handleIncrease = () =>
    dispatch(updateCartItem(product.id, { count: count + 1 }));

  const handleDecrease = () => {
    if (count <= 1) dispatch(removeFromCart(product.id));
    else dispatch(updateCartItem(product.id, { count: count - 1 }));
  };

  return (
    <div className={`flex items-center gap-4 p-5 rounded-xl border transition-all ${checked ? 'border-gray-200 bg-white' : 'border-gray-100 bg-gray-50 opacity-60'}`}>
      {/* Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={() => dispatch(toggleCartItem(product.id))}
        className="w-5 h-5 accent-[#23A6F0] cursor-pointer flex-shrink-0"
      />

      {/* Ürün görseli */}
      <Link to={`/product/${product.id}`} className="flex-shrink-0">
        <img
          src={img || 'https://placehold.co/80x80/png?text=?'}
          alt={product.name}
          className="w-20 h-20 object-cover rounded-lg border border-gray-100 hover:opacity-80 transition-opacity"
          onError={(e) => { e.target.src = 'https://placehold.co/80x80/png?text=?'; }}
        />
      </Link>

      {/* Ürün bilgisi */}
      <div className="flex-1 min-w-0">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-[#252B42] text-sm leading-tight hover:text-[#23A6F0] transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-xs text-[#737373] mt-0.5 line-clamp-1">{product.description}</p>
        )}
        <p className="text-[#23A6F0] font-bold text-sm mt-1">
          ${product.price}
          <span className="text-[#737373] font-normal text-xs ml-1">/ unit</span>
        </p>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <QtyButton onClick={handleDecrease}>−</QtyButton>
        <span className="w-8 text-center font-bold text-[#252B42] text-sm">{count}</span>
        <QtyButton onClick={handleIncrease}>+</QtyButton>
      </div>

      {/* Satır toplamı */}
      <div className="w-24 text-right flex-shrink-0">
        <p className="font-bold text-[#252B42] text-base">
          ${(product.price * count).toFixed(2)}
        </p>
      </div>

      <button
        onClick={() => dispatch(removeFromCart(product.id))}
        className="text-gray-300 hover:text-[#E74040] transition-colors flex-shrink-0 p-1"
        title="Remove"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

const CartPage = () => {
  const dispatch = useDispatch();
  const history  = useHistory();
  const cart = useSelector(state => state.shoppingCart.cart);

  const SHIPPING_COST           = 29.99;
  const FREE_SHIPPING_THRESHOLD = 15;

  const checkedItems     = cart.filter(i => i.checked);
  const totalItems       = cart.reduce((s, i) => s + i.count, 0);
  const checkedItemCount = checkedItems.reduce((s, i) => s + i.count, 0);
  const subtotal         = checkedItems.reduce((s, i) => s + i.product.price * i.count, 0);
  const isFreeShipping   = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingFee      = isFreeShipping && checkedItems.length > 0 ? 0 : (checkedItems.length > 0 ? SHIPPING_COST : 0);
  const discount         = isFreeShipping && checkedItems.length > 0 ? SHIPPING_COST : 0;
  const grandTotal       = subtotal + shippingFee;

  const allChecked = cart.length > 0 && cart.every(i => i.checked);

  const handleToggleAll = () => {
    const newChecked = !allChecked;
    cart.forEach(item =>
      dispatch(updateCartItem(item.product.id, { checked: newChecked }))
    );
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-6 px-4">
        <ShoppingBag className="w-24 h-24 text-gray-200" />
        <h2 className="text-2xl font-bold text-[#252B42]">Your cart is empty</h2>
        <p className="text-[#737373]">Looks like you haven't added anything yet.</p>
        <Link
          to="/shop"
          className="px-8 py-3 bg-[#23A6F0] text-white rounded-lg font-bold hover:bg-[#1a8ad1] transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/"    className="text-[#252B42] font-bold hover:text-[#23A6F0]">Home</Link>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
          <Link to="/shop" className="text-[#737373] hover:text-[#23A6F0]">Shop</Link>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]" />
          <span className="text-[#737373]">Cart</span>
        </nav>

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#252B42]">
            My Cart
            <span className="ml-2 text-base font-normal text-[#737373]">({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
          </h1>
          <button
            onClick={() => dispatch(clearCart())}
            className="flex items-center gap-1.5 text-sm text-[#737373] hover:text-[#E74040] transition-colors"
          >
            <Trash2 className="w-4 h-4" /> Clear Cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          <div className="flex-1">

            <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-gray-200 mb-3 shadow-sm">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleToggleAll}
                className="w-5 h-5 accent-[#23A6F0] cursor-pointer"
              />
              <span className="text-sm font-bold text-[#252B42]">
                Select All ({cart.length} {cart.length === 1 ? 'product' : 'products'})
              </span>
              <div className="ml-auto flex gap-6 text-xs text-[#737373] font-medium hidden sm:flex">
                <span className="w-24 text-center">Qty</span>
                <span className="w-24 text-right">Price</span>
                <span className="w-6" />
              </div>
            </div>

            {/* Cart rows */}
            <div className="flex flex-col gap-3">
              {cart.map(item => (
                <CartRow key={item.product.id} item={item} dispatch={dispatch} />
              ))}
            </div>

            {/* Continue shopping */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[#23A6F0] font-bold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-6 overflow-hidden">

              {/* Üst Create Order butonu */}
              <button
                disabled={checkedItems.length === 0}
                onClick={() => checkedItems.length > 0 && history.push('/order')}
                className={`w-full flex items-center justify-center gap-2 py-4 font-bold text-base transition-colors ${
                  checkedItems.length === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-[#FF7B00] text-white hover:bg-[#e56e00]'
                }`}
              >
                Create Order
                <span>›</span>
              </button>

              {/* Sipariş Özeti */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-[#252B42] mb-5">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {/* Products Total */}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#737373]">Products Total</span>
                    <span className="font-semibold text-[#252B42]">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#737373]">Shipping</span>
                    <span className="font-semibold text-[#252B42]">${SHIPPING_COST.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-[#737373]">
                      Free Shipping Discount
                      {!isFreeShipping && checkedItems.length > 0 && (
                        <span className="block text-xs text-[#23A6F0] mt-0.5">
                          Add ${(FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2)} more for free shipping
                        </span>
                      )}
                    </span>
                    <span className={`font-semibold ${discount > 0 ? 'text-[#E74040]' : 'text-[#BDBDBD]'}`}>
                      {discount > 0 ? `-$${discount.toFixed(2)}` : '$0.00'}
                    </span>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="border-t border-gray-100 pt-4 mb-5">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#252B42]">Grand Total</span>
                    <span className="font-bold text-xl text-[#FF7B00]">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                  {checkedItems.length < cart.length && cart.length > 0 && (
                    <p className="text-xs text-[#737373] mt-1">
                      * Only selected items are included
                    </p>
                  )}
                </div>

                <button
                  disabled={checkedItems.length === 0}
                  onClick={() => checkedItems.length > 0 && history.push('/order')}
                  className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm transition-colors ${
                    checkedItems.length === 0
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#FF7B00] text-white hover:bg-[#e56e00]'
                  }`}
                >
                  Create Order
                  <span>›</span>
                </button>

                {checkedItems.length === 0 && (
                  <p className="text-xs text-[#737373] text-center mt-2">
                    Select at least one item to continue
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;