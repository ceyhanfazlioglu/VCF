import axiosInstance from '../../api/axiosInstance';

export const SET_CARD_LIST = 'SET_CARD_LIST';

// GET /user/card
export const fetchCards = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get('/user/card');
    dispatch({ type: SET_CARD_LIST, payload: res.data });
  } catch (err) {
    console.error('fetchCards error:', err);
  }
};

// POST /user/card
// { card_no, expire_month, expire_year, name_on_card }
export const createCard = (data) => async (dispatch) => {
  try {
    await axiosInstance.post('/user/card', data);
    dispatch(fetchCards());
  } catch (err) {
    console.error('createCard error:', err);
    throw err;
  }
};

// PUT /user/card
// { id, card_no, expire_month, expire_year, name_on_card }
export const updateCard = (data) => async (dispatch) => {
  try {
    await axiosInstance.put('/user/card', data);
    dispatch(fetchCards());
  } catch (err) {
    console.error('updateCard error:', err);
    throw err;
  }
};

// DELETE /user/card/:id
export const deleteCard = (id) => async (dispatch) => {
  try {
    await axiosInstance.delete(`/user/card/${id}`);
    dispatch(fetchCards());
  } catch (err) {
    console.error('deleteCard error:', err);
  }
};