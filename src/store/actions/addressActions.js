import axiosInstance from '../../api/axiosInstance';

export const SET_ADDRESS_LIST = 'SET_ADDRESS_LIST';

// GET /user/address
export const fetchAddresses = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/user/address');
    dispatch({ type: SET_ADDRESS_LIST, payload: res.data });
  } catch (err) {
    console.error('fetchAddresses error:', err);
  }
};

// POST /user/address
export const createAddress = (data) => async (dispatch) => {
  try {
    await axiosInstance.post('/user/address', data);
    dispatch(fetchAddresses()); // listeyi güncelle
  } catch (err) {
    console.error('createAddress error:', err);
    throw err;
  }
};

// PUT /user/address
export const updateAddress = (data) => async (dispatch) => {
  try {
    await axiosInstance.put('/user/address', data);
    dispatch(fetchAddresses());
  } catch (err) {
    console.error('updateAddress error:', err);
    throw err;
  }
};

// DELETE /user/address/:id
export const deleteAddress = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/address/${id}`);
    dispatch(fetchAddresses());
  } catch (err) {
    console.error('deleteAddress error:', err);
  }
};