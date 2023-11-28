import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

export const getDetailUser = () => async (dispatch) => {
  let detailUserUrl = `/users/${localStorage.getItem('uuid')}`;
  try {
    dispatch({ type: 'GET_DETAIL_USER_PENDING' });
    const result = await axios.get(base_url + detailUserUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data.result, type: 'GET_DETAIL_USER_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_DETAIL_USER_ERROR' });
  }
};
