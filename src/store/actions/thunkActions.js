import { apiService } from '../../services/api';
import { setProducts, setLoading, setError, clearError } from './actions';
import { toast } from 'react-toastify';

// Fetch Products (Thunk Action)
export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await apiService.getProducts();
      dispatch(setProducts(response.data));
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error('Failed to fetch products');
    }
  };
};

// Fetch Single Product (Thunk Action)
export const fetchProduct = (productId) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await apiService.getProduct(productId);
      dispatch(setLoading(false));
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error('Failed to fetch product');
      throw error;
    }
  };
};

// Login (Thunk Action)
export const loginUser = (credentials) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await apiService.login(credentials);
      const { token, user } = response.data;
      
      // Store token
      localStorage.setItem('token', token);
      
      // Update user in store
      dispatch({ type: 'SET_USER', payload: user });
      dispatch(setLoading(false));
      
      toast.success('Login successful!');
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error('Login failed');
      throw error;
    }
  };
};

// Signup (Thunk Action)
export const signupUser = (userData) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(clearError());
    
    try {
      const response = await apiService.signup(userData);
      dispatch(setLoading(false));
      toast.success('Signup successful! Please login.');
      return response.data;
    } catch (error) {
      dispatch(setError(error.message));
      dispatch(setLoading(false));
      toast.error('Signup failed');
      throw error;
    }
  };
};
