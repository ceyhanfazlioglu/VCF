import axios from 'axios';
import { toast } from 'react-toastify';

// Base API URL - Update this with your actual API URL
const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add auth token if exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message);
    } else if (error.request) {
      // Request made but no response
      toast.error('Network error. Please check your connection.');
    } else {
      // Something else happened
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

// API Methods
export const apiService = {
  // Products
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  
  // Categories
  getCategories: () => api.get('/categories'),
  
  // Auth
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  
  // User
  getUser: () => api.get('/user'),
  updateUser: (userData) => api.put('/user', userData),
  
  // Orders
  createOrder: (orderData) => api.post('/order', orderData),
  getOrders: () => api.get('/order'),
  
  // Cart
  getCart: () => api.get('/shopping-cart'),
  addToCart: (productId) => api.post('/shopping-cart', { product_id: productId }),
  updateCartItem: (itemId, quantity) => api.put(`/shopping-cart/${itemId}`, { quantity }),
  deleteCartItem: (itemId) => api.delete(`/shopping-cart/${itemId}`),
};

export default api;
