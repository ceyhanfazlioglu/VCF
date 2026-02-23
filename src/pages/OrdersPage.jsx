import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, ShoppingBag, Package, Calendar, CreditCard } from 'lucide-react';
import axiosInstance from '../api/axiosInstance';

/* Status badge */
const StatusBadge = ({ status }) => {
  const map = {
    pending:    'bg-yellow-100 text-yellow-700',
    processing: 'bg-blue-100 text-[#23A6F0]',
    shipped:    'bg-purple-100 text-purple-700',
    delivered:  'bg-green-100 text-[#2DC071]',
    cancelled:  'bg-red-100 text-[#E74040]',
  };
  const label = status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${map[status] || 'bg-gray-100 text-[#737373]'}`}>
      {label}
    </span>
  );
};

/* Single order row — collapsible */
const OrderRow = ({ order }) => {
  const [open, setOpen] = useState(false);

  const date     = order.order_date ? new Date(order.order_date).toLocaleDateString('en-GB', {day:'2-digit', month:'short', year:'numeric'}) : '—';
  const products = order.products || [];
  const total    = typeof order.price === 'number' ? order.price.toFixed(2) : '—';

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header row */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-4 px-5 py-4 bg-white hover:bg-gray-50 transition-colors text-left"
      >
        {/* Order # */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#23A6F0]/10 flex items-center justify-center">
          <Package className="w-4 h-4 text-[#23A6F0]"/>
        </div>

        <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-3 items-center">
          {/* Order ID */}
          <div>
            <p className="text-xs text-[#737373] mb-0.5">Order ID</p>
            <p className="font-bold text-[#252B42] text-sm">#{order.id}</p>
          </div>
          {/* Date */}
          <div className="hidden sm:block">
            <p className="text-xs text-[#737373] mb-0.5">Date</p>
            <p className="text-sm text-[#252B42] flex items-center gap-1"><Calendar className="w-3 h-3"/>{date}</p>
          </div>
          {/* Total */}
          <div>
            <p className="text-xs text-[#737373] mb-0.5">Total</p>
            <p className="font-bold text-[#FF7B00] text-sm">${total}</p>
          </div>
          {/* Status */}
          <div className="hidden sm:block">
            <p className="text-xs text-[#737373] mb-0.5">Status</p>
            <StatusBadge status={order.status}/>
          </div>
        </div>

        {/* Expand icon */}
        <ChevronDown className={`w-5 h-5 text-[#737373] flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}/>
      </button>

      {/* Collapsible detail panel */}
      {open && (
        <div className="border-t border-gray-100 bg-gray-50 px-5 py-5">

          {/* Mobile: date + status */}
          <div className="sm:hidden flex gap-4 mb-4 text-sm">
            <div><span className="text-[#737373] text-xs">Date: </span><span className="text-[#252B42]">{date}</span></div>
            <StatusBadge status={order.status}/>
          </div>

          {/* Products table */}
          <h4 className="font-bold text-[#252B42] text-sm mb-3 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-[#23A6F0]"/>
            Order Items ({products.length})
          </h4>

          {products.length === 0 ? (
            <p className="text-sm text-[#737373]">No product details available.</p>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-bold text-[#737373] uppercase tracking-wide">Product</th>
                    <th className="text-center px-4 py-3 text-xs font-bold text-[#737373] uppercase tracking-wide">Qty</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-[#737373] uppercase tracking-wide">Unit Price</th>
                    <th className="text-right px-4 py-3 text-xs font-bold text-[#737373] uppercase tracking-wide">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map((item, idx) => {
                    const product = item.product || item;
                    const name    = product.name || item.detail || `Product #${item.product_id || idx+1}`;
                    const img     = product.images?.[0]?.url || '';
                    const price   = product.price || 0;
                    const count   = item.count || 1;
                    return (
                      <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {img ? (
                              <img src={img} alt={name} className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0"/>
                            ) : (
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                                <Package className="w-5 h-5 text-gray-300"/>
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-[#252B42] line-clamp-1">{name}</p>
                              {item.detail && item.detail !== name && (
                                <p className="text-xs text-[#737373]">{item.detail}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center font-semibold text-[#252B42]">{count}</td>
                        <td className="px-4 py-3 text-right text-[#737373]">${price.toFixed(2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-[#252B42]">${(price * count).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="border-t-2 border-gray-200 bg-gray-50">
                  <tr>
                    <td colSpan={3} className="px-4 py-3 text-right font-bold text-[#252B42]">Order Total</td>
                    <td className="px-4 py-3 text-right font-bold text-lg text-[#FF7B00]">${total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}

          {/* Payment info */}
          {order.card_no && (
            <div className="mt-4 flex items-center gap-2 text-sm text-[#737373]">
              <CreditCard className="w-4 h-4"/>
              <span>Paid with card ending in <strong className="text-[#252B42]">****{String(order.card_no).slice(-4)}</strong></span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

/* MAIN */
const OrdersPage = () => {
  const [orders,  setOrders]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    axiosInstance.get('/order')
      .then(res => {
        // API ya array ya da { orders: [...] } dönebilir
        const data = Array.isArray(res.data) ? res.data : (res.data.orders || []);
        // En yeni sipariş üstte
        setOrders([...data].sort((a,b) => new Date(b.order_date) - new Date(a.order_date)));
      })
      .catch(err => {
        console.error('Orders fetch error:', err);
        setError('Failed to load orders. Please try again.');
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6">
          <Link to="/" className="text-[#252B42] font-bold hover:text-[#23A6F0]">Home</Link>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]"/>
          <span className="text-[#737373]">My Orders</span>
        </nav>

        {/* Title */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#252B42] flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-[#23A6F0]"/>
            My Orders
          </h1>
          {!loading && orders.length > 0 && (
            <span className="text-sm text-[#737373]">{orders.length} order{orders.length !== 1 ? 's' : ''}</span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col gap-3">
            {[1,2,3].map(i => (
              <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white animate-pulse">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200"/>
                  <div className="flex-1 grid grid-cols-4 gap-3">
                    {[1,2,3,4].map(j => <div key={j} className="h-4 bg-gray-200 rounded"/>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-12">
            <p className="text-[#E74040] mb-4">{error}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2 bg-[#23A6F0] text-white rounded-lg font-bold text-sm">Retry</button>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center py-16">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4"/>
            <h2 className="text-xl font-bold text-[#252B42] mb-2">No orders yet</h2>
            <p className="text-[#737373] mb-6">You haven't placed any orders yet.</p>
            <Link to="/shop" className="px-8 py-3 bg-[#23A6F0] text-white rounded-lg font-bold hover:bg-[#1a8ad1] transition-colors">
              Start Shopping
            </Link>
          </div>
        )}

        {/* Orders list */}
        {!loading && !error && orders.length > 0 && (
          <div className="flex flex-col gap-4">
            {orders.map(order => <OrderRow key={order.id} order={order}/>)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;