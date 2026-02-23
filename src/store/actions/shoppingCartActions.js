import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
} from './actionTypes';

// T17: Ürün ekle (aynı ürün tekrar eklenirse count artar)
export const addToCart = (product, count = 1) => ({
  type: ADD_TO_CART,
  payload: { product, count },
});

// T17: Ürünü sepetten kaldır
export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId,
});

// T17: count veya checked güncelle
export const updateCartItem = (productId, updates) => ({
  type: UPDATE_CART_ITEM,
  payload: { productId, updates },
});

// T17: checkbox toggle
export const toggleCartItem = (productId) => ({
  type: TOGGLE_CART_ITEM,
  payload: productId,
});

// T17: Sepeti tamamen temizle
export const clearCart = () => ({
  type: CLEAR_CART,
});

// Mevcut action creators
export const setCart    = (cart)    => ({ type: SET_CART,    payload: cart });
export const setPayment = (payment) => ({ type: SET_PAYMENT, payload: payment });
export const setAddress = (address) => ({ type: SET_ADDRESS, payload: address });