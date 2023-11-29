import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const getComments = (id_recipe, pageComments, limitComments) => async (dispatch, getState) => {
  let commentRecipesUrl = `/comments/${id_recipe}?page=${pageComments}&limit=${limitComments}`;
  try {
    dispatch({ type: 'GET_COMMENTS_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + commentRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data, type: 'GET_COMMENTS_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_COMMENTS_ERROR' });
  }
};

export const postComments = (data) => async (dispatch, getState) => {
  let postCommentRecipesUrl = `/comments`;
  try {
    dispatch({ type: 'POST_COMMENTS_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.post(base_url + postCommentRecipesUrl, data, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data, type: 'POST_COMMENTS_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: `Success add comment!`,
      icon: 'success',
    });
    dispatch(getComments(data.id_recipe));
  } catch (err) {
    dispatch({ payload: err.message, type: 'POST_COMMENTS_ERROR' });
    dispatch(getComments(data.id_recipe));
  }
};
