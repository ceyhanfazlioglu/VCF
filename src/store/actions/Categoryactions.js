import axiosInstance from '../../api/axiosInstance';
import { 
  FETCH_CATEGORIES_REQUEST, 
  FETCH_CATEGORIES_SUCCESS, 
  FETCH_CATEGORIES_FAILURE,
  SET_CATEGORIES 
} from './actionTypes';

// Fetch Categories Thunk Action
export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_CATEGORIES_REQUEST });
      
      const response = await axiosInstance.get('/categories');
      
      dispatch({ 
        type: FETCH_CATEGORIES_SUCCESS, 
        payload: response.data 
      });
      
      dispatch({
        type: SET_CATEGORIES,
        payload: response.data
      });
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Failed to fetch categories';
      
      dispatch({ 
        type: FETCH_CATEGORIES_FAILURE, 
        payload: errorMessage 
      });
      
      console.error('Error fetching categories:', errorMessage);
    }
  };
};