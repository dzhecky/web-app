import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

export const getCategory = () => async (dispatch, getState) => {
  let categoryUrl = `/category`;
  try {
    dispatch({ type: 'GET_CATEGORY_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + categoryUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data.result, type: 'GET_CATEGORY_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_CATEGORY_ERROR' });
  }
};
