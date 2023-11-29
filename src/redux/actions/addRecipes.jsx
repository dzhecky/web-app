import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const postRecipes = (bodyData, navigate) => async (dispatch, getState) => {
  let addRecipesUrl = `/recipe`;
  try {
    dispatch({ type: 'POST_RECIPES_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.post(base_url + addRecipesUrl, bodyData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_RECIPES_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/home');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'POST_RECIPES_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};
