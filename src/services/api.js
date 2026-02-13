import axios from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'https://workintech-fe-ecommerce.onrender.com';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
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

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const message = error.response.data?.message || 'An error occurred';
      toast.error(message);
    } else if (error.request) {
      toast.error('Network error. Please check your connection.');
    } else {
      toast.error('An unexpected error occurred');
    }
    return Promise.reject(error);
  }
);

export const apiService = {
  getProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  
  getCategories: () => api.get('/categories'),
  
  login: (credentials) => api.post('/login', credentials),
  signup: (userData) => api.post('/signup', userData),
  
  
  getUser: () => api.get('/user'),
  updateUser: (userData) => api.put('/user', userData),
  
  createOrder: (orderData) => api.post('/order', orderData),
  getOrders: () => api.get('/order'),
  
  getCart: () => api.get('/shopping-cart'),
  addToCart: (productId) => api.post('/shopping-cart', { product_id: productId }),
  updateCartItem: (itemId, quantity) => api.put(`/shopping-cart/${itemId}`, { quantity }),
  deleteCartItem: (itemId) => api.delete(`/shopping-cart/${itemId}`),
};

export default api;
