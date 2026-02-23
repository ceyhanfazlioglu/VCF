import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, MapPin, CreditCard, ChevronRight, Check, Shield, CheckCircle, ShoppingBag } from 'lucide-react';
import { fetchAddresses, createAddress, updateAddress, deleteAddress } from '../store/actions/addressActions';
import { fetchCards, createCard, updateCard, deleteCard } from '../store/actions/cardActions';
import { clearCart } from '../store/actions/shoppingCartActions';
import axiosInstance from '../api/axiosInstance';

const TR_CITIES = ['Adana','Adiyaman','Afyonkarahisar','Agri','Amasya','Ankara','Antalya','Artvin','Aydin','Balikesir','Bilecik','Bingol','Bitlis','Bolu','Burdur','Bursa','Canakkale','Cankiri','Corum','Denizli','Diyarbakir','Edirne','Elazig','Erzincan','Erzurum','Eskisehir','Gaziantep','Giresun','Gumushane','Hakkari','Hatay','Isparta','Mersin','Istanbul','Izmir','Kars','Kastamonu','Kayseri','Kirklareli','Kirsehir','Kocaeli','Konya','Kutahya','Malatya','Manisa','Kahramanmaras','Mardin','Mugla','Mus','Nevsehir','Nigde','Ordu','Rize','Sakarya','Samsun','Siirt','Sinop','Sivas','Tekirdag','Tokat','Trabzon','Tunceli','Sanliurfa','Usak','Van','Yozgat','Zonguldak','Aksaray','Bayburt','Karaman','Kirikkale','Batman','Sirnak','Bartin','Ardahan','Igdir','Yalova','Karabuk','Kilis','Osmaniye','Duzce'];
const MONTHS = Array.from({length:12},(_,i)=>i+1);
const YEARS  = Array.from({length:10},(_,i)=>new Date().getFullYear()+i);
const SHIPPING_COST = 29.99;
const FREE_SHIPPING_THRESHOLD = 15;
const EMPTY_ADDR = {title:'',name:'',surname:'',phone:'',city:'',district:'',neighborhood:'',address:''};
const EMPTY_CARD = {card_no:'',expire_month:'',expire_year:'',name_on_card:''};
const formatCardNo = (v) => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
const maskCard = (no) => `**** **** **** ${String(no).replace(/\D/g,'').slice(-4)}`;

/* ORDER SUMMARY */
const OrderSummary = ({subtotal, onAction, actionLabel, disabled, loading}) => {
  const isFree = subtotal >= FREE_SHIPPING_THRESHOLD;
  const fee    = isFree ? 0 : (subtotal > 0 ? SHIPPING_COST : 0);
  const disc   = isFree && subtotal > 0 ? SHIPPING_COST : 0;
  const grand  = subtotal + fee;
  const btnBase = `w-full flex items-center justify-center gap-2 font-bold transition-colors`;
  const btnCls  = disabled||loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FF7B00] text-white hover:bg-[#e56e00]';
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
      <button disabled={disabled||loading} onClick={onAction} className={`${btnBase} ${btnCls} py-4 text-base`}>
        {loading ? 'Processing...' : `${actionLabel} \u203a`}
      </button>
      <div className="p-6">
        <h2 className="text-lg font-bold text-[#252B42] mb-5">Order Summary</h2>
        <div className="space-y-3 mb-4 text-sm">
          <div className="flex justify-between"><span className="text-[#737373]">Products Total</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
          <div className="flex justify-between"><span className="text-[#737373]">Shipping</span><span className="font-semibold">${SHIPPING_COST.toFixed(2)}</span></div>
          <div className="flex justify-between">
            <span className="text-[#737373]">Free Shipping Discount</span>
            <span className={disc > 0 ? 'font-semibold text-[#E74040]' : 'font-semibold text-[#BDBDBD]'}>
              {disc > 0 ? `-$${disc.toFixed(2)}` : '$0.00'}
            </span>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4 mb-5">
          <div className="flex justify-between"><span className="font-bold text-[#252B42]">Grand Total</span><span className="font-bold text-xl text-[#FF7B00]">${grand.toFixed(2)}</span></div>
        </div>
        <button disabled={disabled||loading} onClick={onAction} className={`${btnBase} ${btnCls} py-3 rounded-lg text-sm`}>
          {loading ? 'Processing...' : `${actionLabel} \u203a`}
        </button>
      </div>
    </div>
  );
};

/* ADDRESS FORM */
const AddressForm = ({initial=EMPTY_ADDR, onSubmit, onCancel, loading}) => {
  const [form, setForm] = useState(initial);
  const set = (f) => (e) => setForm(p => ({...p, [f]: e.target.value}));
  const inp = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#23A6F0] transition-colors';
  const lbl = 'block text-xs font-bold text-[#737373] mb-1 uppercase tracking-wide';
  return (
    <form onSubmit={(e)=>{e.preventDefault(); onSubmit(form);}} className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4">
      <h3 className="font-bold text-[#252B42] mb-5">{initial.id ? 'Update Address' : 'Add New Address'}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2"><label className={lbl}>Address Title *</label><input required value={form.title} onChange={set('title')} placeholder="Home, Work..." className={inp}/></div>
        <div><label className={lbl}>Name *</label><input required value={form.name} onChange={set('name')} placeholder="First name" className={inp}/></div>
        <div><label className={lbl}>Surname *</label><input required value={form.surname} onChange={set('surname')} placeholder="Last name" className={inp}/></div>
        <div className="sm:col-span-2"><label className={lbl}>Phone *</label><input required value={form.phone} onChange={set('phone')} placeholder="05xx xxx xx xx" className={inp}/></div>
        <div>
          <label className={lbl}>City *</label>
          <select required value={form.city} onChange={set('city')} className={inp}>
            <option value="">Select city...</option>
            {TR_CITIES.map(c => <option key={c} value={c.toLowerCase()}>{c}</option>)}
          </select>
        </div>
        <div><label className={lbl}>District *</label><input required value={form.district} onChange={set('district')} placeholder="District" className={inp}/></div>
        <div className="sm:col-span-2"><label className={lbl}>Neighborhood *</label><input required value={form.neighborhood} onChange={set('neighborhood')} placeholder="Neighborhood" className={inp}/></div>
        <div className="sm:col-span-2"><label className={lbl}>Address Detail *</label><textarea required value={form.address} onChange={set('address')} placeholder="Street, building no, door no..." rows={3} className={`${inp} resize-none`}/></div>
      </div>
      <div className="flex gap-3 mt-5">
        <button type="submit" disabled={loading} className="flex-1 bg-[#23A6F0] text-white py-2.5 rounded-lg font-bold text-sm disabled:opacity-50">
          {loading ? 'Saving...' : (initial.id ? 'Update' : 'Save Address')}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-[#737373] rounded-lg font-bold text-sm hover:bg-gray-100">Cancel</button>
      </div>
    </form>
  );
};

const AddressCard = ({addr, selected, onSelect, onEdit, onDelete}) => (
  <div onClick={onSelect} className={`relative border-2 rounded-xl p-4 cursor-pointer transition-all ${selected ? 'border-[#23A6F0] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
    <div className={`absolute top-3 left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? 'border-[#23A6F0] bg-[#23A6F0]' : 'border-gray-300'}`}>
      {selected && <Check className="w-3 h-3 text-white"/>}
    </div>
    <div className="ml-7">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-bold text-[#252B42] text-sm">{addr.title}</p>
          <p className="text-[#737373] text-xs">{addr.name} {addr.surname}</p>
          <p className="text-[#737373] text-xs">{addr.phone}</p>
          <p className="text-[#737373] text-xs mt-1">{addr.neighborhood}, {addr.district}, {addr.city}</p>
        </div>
        <div className="flex gap-1 flex-shrink-0">
          <button onClick={(e)=>{e.stopPropagation(); onEdit(addr);}} className="p-1.5 text-[#737373] hover:text-[#23A6F0]"><Edit2 className="w-4 h-4"/></button>
          <button onClick={(e)=>{e.stopPropagation(); onDelete(addr.id);}} className="p-1.5 text-[#737373] hover:text-[#E74040]"><Trash2 className="w-4 h-4"/></button>
        </div>
      </div>
    </div>
  </div>
);

/* STEP 1 - ADDRESS */
const StepAddress = ({shippingAddr, setShippingAddr, onNext}) => {
  const dispatch    = useDispatch();
  const addressList = useSelector(s => s.client.addressList);
  const [billingSame, setBillingSame] = useState(true);
  const [billingAddr, setBillingAddr] = useState(null);
  const [showForm, setShowForm]       = useState(false);
  const [editingAddr, setEditingAddr] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => { dispatch(fetchAddresses()); }, [dispatch]);
  useEffect(() => {
    if (addressList.length > 0 && !shippingAddr) setShippingAddr(addressList[0].id);
  }, [addressList]);

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      editingAddr
        ? await dispatch(updateAddress({id: editingAddr.id, ...formData}))
        : await dispatch(createAddress(formData));
      setShowForm(false);
      setEditingAddr(null);
    } catch { alert('Failed to save address.'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this address?')) return;
    dispatch(deleteAddress(id));
    if (shippingAddr === id) setShippingAddr(null);
    if (billingAddr === id) setBillingAddr(null);
  };

  const canProceed = shippingAddr && (billingSame || billingAddr);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#252B42] text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-[#23A6F0]"/>Shipping Address</h2>
        <button onClick={() => { setEditingAddr(null); setShowForm(true); }} className="flex items-center gap-1.5 text-sm font-bold text-[#23A6F0] hover:underline">
          <Plus className="w-4 h-4"/>Add New
        </button>
      </div>

      {addressList.length === 0 ? (
        <div className="text-center py-8 text-[#737373]">
          <MapPin className="w-10 h-10 text-gray-200 mx-auto mb-3"/>
          <p className="text-sm mb-3">No saved addresses yet.</p>
          <button onClick={() => setShowForm(true)} className="px-5 py-2 bg-[#23A6F0] text-white rounded-lg text-sm font-bold">Add Address</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {addressList.map(a => (
            <AddressCard key={a.id} addr={a}
              selected={shippingAddr === a.id}
              onSelect={() => setShippingAddr(a.id)}
              onEdit={(addr) => { setEditingAddr(addr); setShowForm(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <AddressForm
          initial={editingAddr || EMPTY_ADDR}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditingAddr(null); }}
          loading={formLoading}
        />
      )}

      <div className="border-t border-gray-100 mt-6 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-[#252B42] text-lg flex items-center gap-2"><MapPin className="w-5 h-5 text-[#737373]"/>Billing Address</h2>
          <label className="flex items-center gap-2 cursor-pointer text-sm text-[#737373]">
            <input type="checkbox" checked={billingSame} onChange={e => setBillingSame(e.target.checked)} className="w-4 h-4 accent-[#23A6F0]"/>
            Same as shipping
          </label>
        </div>
        {!billingSame && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {addressList.map(a => (
              <AddressCard key={a.id} addr={a}
                selected={billingAddr === a.id}
                onSelect={() => setBillingAddr(a.id)}
                onEdit={(addr) => { setEditingAddr(addr); setShowForm(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
        {billingSame && shippingAddr && (
          <p className="text-sm text-[#737373] bg-gray-50 rounded-lg p-3">✓ Using same address as shipping</p>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <button disabled={!canProceed} onClick={() => canProceed && onNext()}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-colors ${!canProceed ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FF7B00] text-white hover:bg-[#e56e00]'}`}>
          Continue to Payment \u203a
        </button>
      </div>
    </div>
  );
};

/* CARD FORM */
const CardForm = ({initial=EMPTY_CARD, onSubmit, onCancel, loading}) => {
  const [form, setForm] = useState({...initial, card_no: initial.card_no ? String(initial.card_no) : ''});
  const inp = 'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#23A6F0] transition-colors';
  const lbl = 'block text-xs font-bold text-[#737373] mb-1 uppercase tracking-wide';
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit({...form, card_no: form.card_no.replace(/\s/g,''), expire_month: Number(form.expire_month), expire_year: Number(form.expire_year)});
    }} className="bg-gray-50 border border-gray-200 rounded-xl p-6 mt-4">
      <h3 className="font-bold text-[#252B42] mb-5">{initial.id ? 'Update Card' : 'Add New Card'}</h3>
      <div className="space-y-4">
        <div>
          <label className={lbl}>Card Number *</label>
          <input required
            value={formatCardNo(form.card_no)}
            onChange={(e) => setForm(p => ({...p, card_no: e.target.value.replace(/\s/g,'')}))}
            placeholder="1234 5678 9012 3456" maxLength={19}
            className={`${inp} tracking-widest font-mono`}
          />
        </div>
        <div>
          <label className={lbl}>Name on Card *</label>
          <input required value={form.name_on_card} onChange={(e) => setForm(p => ({...p, name_on_card: e.target.value}))} placeholder="Full name" className={inp}/>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className={lbl}>Month *</label>
            <select required value={form.expire_month} onChange={(e) => setForm(p => ({...p, expire_month: e.target.value}))} className={inp}>
              <option value="">MM</option>
              {MONTHS.map(m => <option key={m} value={m}>{String(m).padStart(2,'0')}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Year *</label>
            <select required value={form.expire_year} onChange={(e) => setForm(p => ({...p, expire_year: e.target.value}))} className={inp}>
              <option value="">YYYY</option>
              {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>CVV *</label>
            <input required type="password" maxLength={4} placeholder="•••" className={`${inp} tracking-widest`}/>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-5">
        <button type="submit" disabled={loading} className="flex-1 bg-[#23A6F0] text-white py-2.5 rounded-lg font-bold text-sm disabled:opacity-50">
          {loading ? 'Saving...' : (initial.id ? 'Update Card' : 'Save Card')}
        </button>
        <button type="button" onClick={onCancel} className="px-6 py-2.5 border border-gray-300 text-[#737373] rounded-lg font-bold text-sm hover:bg-gray-100">Cancel</button>
      </div>
    </form>
  );
};

const SavedCardItem = ({card, selected, onSelect, onEdit, onDelete}) => (
  <div onClick={onSelect} className={`relative flex items-center gap-4 border-2 rounded-xl p-4 cursor-pointer transition-all ${selected ? 'border-[#23A6F0] bg-blue-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
    <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${selected ? 'border-[#23A6F0] bg-[#23A6F0]' : 'border-gray-300'}`}>
      {selected && <Check className="w-3 h-3 text-white"/>}
    </div>
    <CreditCard className={`w-8 h-8 flex-shrink-0 ${selected ? 'text-[#23A6F0]' : 'text-[#737373]'}`}/>
    <div className="flex-1 min-w-0">
      <p className="font-bold text-[#252B42] text-sm font-mono tracking-wider">{maskCard(card.card_no)}</p>
      <p className="text-[#737373] text-xs">{card.name_on_card}</p>
      <p className="text-[#737373] text-xs">{String(card.expire_month).padStart(2,'0')}/{card.expire_year}</p>
    </div>
    <div className="flex gap-1 flex-shrink-0">
      <button onClick={(e)=>{e.stopPropagation(); onEdit(card);}} className="p-1.5 text-[#737373] hover:text-[#23A6F0]"><Edit2 className="w-4 h-4"/></button>
      <button onClick={(e)=>{e.stopPropagation(); onDelete(card.id);}} className="p-1.5 text-[#737373] hover:text-[#E74040]"><Trash2 className="w-4 h-4"/></button>
    </div>
  </div>
);

/* STEP 2 - PAYMENT */
const StepPayment = ({onBack, onCompleteOrder, orderLoading}) => {
  const dispatch    = useDispatch();
  const creditCards = useSelector(s => s.client.creditCards);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cvv, setCvv]                   = useState('');
  const [showForm, setShowForm]         = useState(false);
  const [editingCard, setEditingCard]   = useState(null);
  const [formLoading, setFormLoading]   = useState(false);

  useEffect(() => { dispatch(fetchCards()); }, [dispatch]);
  useEffect(() => {
    if (creditCards.length > 0 && !selectedCard) setSelectedCard(creditCards[0].id);
  }, [creditCards]);

  const handleFormSubmit = async (formData) => {
    setFormLoading(true);
    try {
      editingCard
        ? await dispatch(updateCard({id: editingCard.id, ...formData}))
        : await dispatch(createCard(formData));
      setShowForm(false);
      setEditingCard(null);
    } catch { alert('Failed to save card.'); }
    finally { setFormLoading(false); }
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this card?')) return;
    dispatch(deleteCard(id));
    if (selectedCard === id) setSelectedCard(null);
  };

  const card = creditCards.find(c => c.id === selectedCard);
  const canComplete = selectedCard && cvv.length >= 3;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-[#252B42] text-lg flex items-center gap-2"><CreditCard className="w-5 h-5 text-[#23A6F0]"/>Payment Method</h2>
        <button onClick={() => { setEditingCard(null); setShowForm(true); }} className="flex items-center gap-1.5 text-sm font-bold text-[#23A6F0] hover:underline">
          <Plus className="w-4 h-4"/>Add New Card
        </button>
      </div>

      {creditCards.length === 0 && !showForm ? (
        <div className="text-center py-8">
          <CreditCard className="w-10 h-10 text-gray-200 mx-auto mb-3"/>
          <p className="text-sm text-[#737373] mb-3">No saved cards yet.</p>
          <button onClick={() => setShowForm(true)} className="px-5 py-2 bg-[#23A6F0] text-white rounded-lg text-sm font-bold">Add Card</button>
        </div>
      ) : (
        <div className="flex flex-col gap-3 mb-4">
          {creditCards.map(c => (
            <SavedCardItem key={c.id} card={c}
              selected={selectedCard === c.id}
              onSelect={() => setSelectedCard(c.id)}
              onEdit={(cc) => { setEditingCard(cc); setShowForm(true); }}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <CardForm
          initial={editingCard || EMPTY_CARD}
          onSubmit={handleFormSubmit}
          onCancel={() => { setShowForm(false); setEditingCard(null); }}
          loading={formLoading}
        />
      )}

      {selectedCard && (
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          <label className="block text-xs font-bold text-[#737373] mb-2 uppercase tracking-wide">
            Enter CVV for selected card *
          </label>
          <input
            type="password" maxLength={4} value={cvv}
            onChange={e => setCvv(e.target.value.replace(/\D/g,''))}
            placeholder="&bull;&bull;&bull;"
            className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm tracking-widest font-mono focus:outline-none focus:border-[#23A6F0]"
          />
        </div>
      )}

      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
        <button onClick={onBack} className="text-sm text-[#737373] hover:text-[#252B42] font-medium">
          \u2190 Back to Address
        </button>
        <button
          disabled={!canComplete || orderLoading}
          onClick={() => card && onCompleteOrder({card, cvv})}
          className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold transition-colors ${!canComplete || orderLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#FF7B00] text-white hover:bg-[#e56e00]'}`}
        >
          {orderLoading ? 'Processing...' : 'Complete Order \u203a'}
        </button>
      </div>
    </div>
  );
};

/* SUCCESS SCREEN */
const OrderSuccess = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md w-full text-center">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-12 h-12 text-[#2DC071]"/>
      </div>
      <h1 className="text-2xl font-bold text-[#252B42] mb-3">Order Placed! \U0001f389</h1>
      <p className="text-[#737373] mb-2">Thank you! Your order has been successfully created.</p>
      <p className="text-sm text-[#BDBDBD] mb-8">You will receive a confirmation email shortly.</p>
      <div className="flex flex-col gap-3">
        <Link to="/" className="block w-full py-3 bg-[#23A6F0] text-white rounded-lg font-bold hover:bg-[#1a8ad1] transition-colors">
          Continue Shopping
        </Link>
        <Link to="/orders" className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 text-[#737373] rounded-lg font-bold hover:bg-gray-50">
          <ShoppingBag className="w-4 h-4"/>View My Orders
        </Link>
      </div>
    </div>
  </div>
);

/* MAIN ORDER PAGE */
const OrderPage = () => {
  const dispatch = useDispatch();
  const [step, setStep]                 = useState(1);
  const [shippingAddr, setShippingAddr] = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cart         = useSelector(s => s.shoppingCart.cart);
  const checkedItems = cart.filter(i => i.checked);
  const subtotal     = checkedItems.reduce((s,i) => s + i.product.price * i.count, 0);
  const isFree       = subtotal >= FREE_SHIPPING_THRESHOLD;
  const grandTotal   = subtotal + (isFree ? 0 : (subtotal > 0 ? SHIPPING_COST : 0));

  const handleCompleteOrder = async ({card, cvv}) => {
    setOrderLoading(true);
    try {
      const payload = {
        address_id:        shippingAddr,
        order_date:        new Date().toISOString(),
        card_no:           Number(String(card.card_no).replace(/\D/g,'')),
        card_name:         card.name_on_card,
        card_expire_month: Number(card.expire_month),
        card_expire_year:  Number(card.expire_year),
        card_ccv:          Number(cvv),
        price:             grandTotal,
        products:          checkedItems.map(item => ({
          product_id: item.product.id,
          count:      item.count,
          detail:     item.product.name || '',
        })),
      };
      await axiosInstance.post('/order', payload);
      dispatch(clearCart());
      setOrderSuccess(true);
    } catch (err) {
      console.error('Order error:', err);
      alert(err?.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setOrderLoading(false);
    }
  };

  if (orderSuccess) return <OrderSuccess/>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <nav className="flex items-center gap-2 text-sm mb-6">
          <span className="text-[#737373]">Cart</span>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]"/>
          <span className={step === 1 ? 'font-bold text-[#252B42]' : 'text-[#737373]'}>Address</span>
          <ChevronRight className="w-4 h-4 text-[#BDBDBD]"/>
          <span className={step === 2 ? 'font-bold text-[#252B42]' : 'text-[#737373]'}>Payment</span>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200 text-[#737373]'}`}>
              {step > 1 ? <Check className="w-4 h-4"/> : '1'}
            </div>
            <span className={`font-bold text-sm ${step >= 1 ? 'text-[#252B42]' : 'text-[#737373]'}`}>Address</span>
          </div>
          <div className={`flex-1 h-0.5 ${step > 1 ? 'bg-[#23A6F0]' : 'bg-gray-200'}`}/>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[#23A6F0] text-white' : 'bg-gray-200 text-[#737373]'}`}>2</div>
            <span className={`font-bold text-sm ${step >= 2 ? 'text-[#252B42]' : 'text-[#737373]'}`}>Payment</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1">
            {step === 1 && (
              <StepAddress shippingAddr={shippingAddr} setShippingAddr={setShippingAddr} onNext={() => setStep(2)}/>
            )}
            {step === 2 && (
              <StepPayment onBack={() => setStep(1)} onCompleteOrder={handleCompleteOrder} orderLoading={orderLoading}/>
            )}
          </div>
          <div className="lg:w-80 flex-shrink-0">
            <OrderSummary
              subtotal={subtotal}
              onAction={step === 1 ? () => setStep(2) : undefined}
              actionLabel={step === 1 ? 'Save & Continue' : 'Complete Order'}
              disabled={checkedItems.length === 0}
              loading={orderLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;