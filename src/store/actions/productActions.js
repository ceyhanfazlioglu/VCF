import axiosInstance from '../../api/axiosInstance';
import { 
  FETCH_PRODUCTS_REQUEST, 
  FETCH_PRODUCTS_SUCCESS, 
  FETCH_PRODUCTS_FAILURE,
  SET_PRODUCT_LIST,
  SET_TOTAL,
  SET_FETCH_STATE,
  SET_LIMIT,
  SET_OFFSET,
  SET_CURRENT_PRODUCT,
} from './actionTypes';

// ── Fetch Products with Query Parameters + Pagination ──
export const fetchProducts = (params = {}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PRODUCTS_REQUEST });
      dispatch({ type: SET_FETCH_STATE, payload: 'FETCHING' });

      const { category, sort, filter, limit = 25, offset = 0 } = params;
      const queryParams = new URLSearchParams();

      if (category) queryParams.append('category', category);
      if (sort)     queryParams.append('sort', sort);
      if (filter)   queryParams.append('filter', filter);
      queryParams.append('limit', limit);
      queryParams.append('offset', offset);

      const response = await axiosInstance.get(`/products?${queryParams.toString()}`);

      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
      dispatch({ type: SET_PRODUCT_LIST,       payload: response.data.products });
      dispatch({ type: SET_TOTAL,              payload: response.data.total });
      dispatch({ type: SET_LIMIT,              payload: limit });
      dispatch({ type: SET_OFFSET,             payload: offset });
      dispatch({ type: SET_FETCH_STATE,        payload: 'FETCHED' });

    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch products';
      dispatch({ type: FETCH_PRODUCTS_FAILURE, payload: errorMessage });
      dispatch({ type: SET_FETCH_STATE,        payload: 'FAILED' });
      console.error('Error fetching products:', errorMessage);
    }
  };
};

// ── Fetch Single Product → saves to Redux currentProduct ──
export const fetchSingleProduct = (productId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: SET_FETCH_STATE,    payload: 'FETCHING' });
      dispatch({ type: SET_CURRENT_PRODUCT, payload: null });   // reset previous

      const response = await axiosInstance.get(`/products/${productId}`);

      dispatch({ type: SET_CURRENT_PRODUCT, payload: response.data }); // ← Redux'a kaydet
      dispatch({ type: SET_FETCH_STATE,     payload: 'FETCHED' });

      return response.data;

    } catch (error) {
      dispatch({ type: SET_FETCH_STATE, payload: 'FAILED' });
      console.error('Error fetching product:', error);
      throw error;
    }
  };
};