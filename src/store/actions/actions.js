export const addToCart = (product) => ({
  type: 'ADD_TO_CART',
  payload: product,
});

export const removeFromCart = (productId) => ({
  type: 'REMOVE_FROM_CART',
  payload: productId,
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});

export const setUser = (user) => ({
  type: 'SET_USER',
  payload: user,
});

export const logout = () => ({
  type: 'LOGOUT',
});

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  payload: product,
});

export const setLoading = (isLoading) => ({
  type: 'SET_LOADING',
  payload: isLoading,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
});
