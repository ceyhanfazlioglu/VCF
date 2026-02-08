import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Initial State
const initialState = {
  cart: [],
  user: null,
  products: [],
  loading: false,
  error: null,
};

// Cart Reducer
const cartReducer = (state = initialState.cart, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

// User Reducer
const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

// Products Reducer
const productsReducer = (state = initialState.products, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return action.payload;
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    default:
      return state;
  }
};

// Loading Reducer
const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return action.payload;
    default:
      return state;
  }
};

// Error Reducer
const errorReducer = (state = initialState.error, action) => {
  switch (action.type) {
    case 'SET_ERROR':
      return action.payload;
    case 'CLEAR_ERROR':
      return null;
    default:
      return state;
  }
};

// Combine Reducers
const rootReducer = combineReducers({
  cart: cartReducer,
  user: userReducer,
  products: productsReducer,
  loading: loadingReducer,
  error: errorReducer,
});

// Create Store
export const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
