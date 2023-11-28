import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const postRecipes = (bodyData) => async (dispatch) => {
  let addRecipesUrl = `/recipe`;
  try {
    dispatch({ type: 'POST_RECIPES_PENDING' });
    const result = await axios.post(base_url + addRecipesUrl, bodyData, {
      headers: {
        token: `${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_RECIPES_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'POST_RECIPES_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};
