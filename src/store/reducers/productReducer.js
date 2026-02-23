import { 
  SET_CATEGORIES, 
  SET_PRODUCT_LIST, 
  SET_TOTAL, 
  SET_FETCH_STATE, 
  SET_LIMIT, 
  SET_OFFSET, 
  SET_FILTER,
  SET_CURRENT_PRODUCT,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  productList: [],
  currentProduct: null,        // ← YENİ: tek ürün detayı
  total: 0,
  limit: 25,
  offset: 0,
  filter: '',
  fetchState: 'NOT_FETCHED'   // "NOT_FETCHED" | "FETCHING" | "FETCHED" | "FAILED"
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, fetchState: 'FETCHING' };

    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, fetchState: 'FETCHED' };

    case FETCH_CATEGORIES_FAILURE:
      return { ...state, fetchState: 'FAILED' };

    case SET_CATEGORIES:
      return { ...state, categories: action.payload };

    case SET_PRODUCT_LIST:
      return { ...state, productList: action.payload };

    case SET_TOTAL:
      return { ...state, total: action.payload };

    case SET_FETCH_STATE:
      return { ...state, fetchState: action.payload };

    case SET_LIMIT:
      return { ...state, limit: action.payload };

    case SET_OFFSET:
      return { ...state, offset: action.payload };

    case SET_FILTER:
      return { ...state, filter: action.payload };

    case SET_CURRENT_PRODUCT:                   // ← YENİ
      return { ...state, currentProduct: action.payload };

    default:
      return state;
  }
};

export default productReducer;