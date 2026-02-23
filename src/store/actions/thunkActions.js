import axiosInstance from '../../api/axiosInstance';
import { setRoles } from './clientActions';

// Thunk Action Creator to fetch roles
export const fetchRoles = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get('/roles');
      dispatch(setRoles(response.data));
    } catch (error) {
      console.error('Error fetching roles:', error);
      // Optionally dispatch error action
    }
  };
};
