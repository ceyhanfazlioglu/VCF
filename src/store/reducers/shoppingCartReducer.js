import {
  SET_CART,
  SET_PAYMENT,
  SET_ADDRESS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART_ITEM,
  TOGGLE_CART_ITEM,
  CLEAR_CART,
} from '../actions/actionTypes';

/**
 * T17 Cart item format:
 * { count: 1, checked: true, product: { id, name, price, images, ... } }
 */

const initialState = {
  cart: [],       // [{ count, checked, product }]
  payment: {},
  address: {},
};

const shoppingCartReducer = (state = initialState, action) => {
  switch (action.type) {

    // Tüm cart'ı set et (örn. API'den yükleme)
    case SET_CART:
      return { ...state, cart: action.payload };

    // T17: Ürün ekle — zaten varsa count artır, yoksa yeni item ekle
    case ADD_TO_CART: {
      const { product, count = 1 } = action.payload;
      const exists = state.cart.find(item => item.product.id === product.id);

      if (exists) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.product.id === product.id
              ? { ...item, count: item.count + count }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { count, checked: true, product }],
      };
    }

    // T17: Ürünü sepetten kaldır
    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.product.id !== action.payload),
      };

    // T17: count veya checked güncelle
    case UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload.productId
            ? { ...item, ...action.payload.updates }
            : item
        ),
      };

    // T17: checked toggle (checkbox)
    case TOGGLE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.product.id === action.payload
            ? { ...item, checked: !item.checked }
            : item
        ),
      };

    // T17: Sepeti temizle
    case CLEAR_CART:
      return { ...state, cart: [] };

    case SET_PAYMENT:
      return { ...state, payment: action.payload };

    case SET_ADDRESS:
      return { ...state, address: action.payload };

    default:
      return state;
  }
};

export default shoppingCartReducer;