import axiosInstance from '../../api/axiosInstance';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SET_USER } from './actionTypes';
import { toast } from 'react-toastify';

// Login User Thunk Action
export const loginUser = (credentials, rememberMe = false) => {
  return async (dispatch) => {
    try {
      dispatch({ type: LOGIN_REQUEST });
      
      const response = await axiosInstance.post('/login', credentials);
      const { token, ...user } = response.data;
      
      // Set token in axios headers (NO Bearer prefix!)
      if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = token;
      }
      
      // Save user to Redux
      dispatch({ type: LOGIN_SUCCESS, payload: user });
      dispatch({ type: SET_USER, payload: user });
      
      // Save token to localStorage if remember me is checked
      if (rememberMe && token) {
        localStorage.setItem('token', token);
      }
      
      toast.success('Successfully logged in!');
      return { success: true };
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      
      dispatch({ 
        type: LOGIN_FAILURE, 
        payload: errorMessage 
      });
      
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  };
};

// Logout User Action
export const logoutUser = () => {
  return (dispatch) => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    
    // Clear token from axios headers
    delete axiosInstance.defaults.headers.common['Authorization'];
    
    // Clear user from Redux
    dispatch({ type: LOGOUT });
    dispatch({ type: SET_USER, payload: {} });
    
    toast.info('Logged out successfully');
  };
};

// Verify Token (for auto-login on app start)
export const verifyToken = (token) => {
  return async (dispatch) => {
    try {
      // Set token in axios headers (NO Bearer prefix!)
      axiosInstance.defaults.headers.common['Authorization'] = token;
      
      // Verify token by fetching user data
      const response = await axiosInstance.get('/verify');
      
      // Save user to Redux
      dispatch({ type: SET_USER, payload: response.data });
      
      // Renew token in localStorage
      localStorage.setItem('token', token);
      
    } catch (error) {
      // Token is invalid, remove it
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      dispatch({ type: LOGOUT });
    }
  };
};