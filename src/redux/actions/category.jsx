import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

export const getCategory = () => async (dispatch) => {
  let categoryUrl = `/category`;
  try {
    dispatch({ type: 'GET_CATEGORY_PENDING' });
    const result = await axios.get(base_url + categoryUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.result, type: 'GET_CATEGORY_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_CATEGORY_ERROR' });
  }
};
