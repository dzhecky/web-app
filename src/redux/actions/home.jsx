import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const getMyRecipes = (page, limit) => async (dispatch) => {
  let myRecipesUrl = `/recipe/show/myrecipes?page=${page}&limit=${limit}`;
  try {
    dispatch({ type: 'GET_MY_RECIPES_PENDING' });
    const result = await axios.get(base_url + myRecipesUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'GET_MY_RECIPES_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_MY_RECIPES_ERROR' });
  }
};

export const getMyBookmark = (page, limit) => async (dispatch) => {
  let myBookmarkUrl = `/event/bookmarked?page=${page}&limit=${limit}`;
  try {
    dispatch({ type: 'GET_MY_BOOKMARK_PENDING' });
    const result = await axios.get(base_url + myBookmarkUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'GET_MY_BOOKMARK_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_MY_BOOKMARK_ERROR' });
  }
};

export const getMyLike = (page, limit) => async (dispatch) => {
  let myLikeUrl = `/event/liked?page=${page}&limit=${limit}`;
  try {
    dispatch({ type: 'GET_MY_LIKE_PENDING' });
    const result = await axios.get(base_url + myLikeUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'GET_MY_LIKE_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_MY_LIKE_ERROR' });
  }
};

export const deleteMyRecipe = (id) => async (dispatch) => {
  let deleteRecipeUrl = `/recipe/${id}`;
  try {
    dispatch({ type: 'DELETE_RECIPES_PENDING' });
    const result = await axios.delete(base_url + deleteRecipeUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'DELETE_RECIPES_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    dispatch(getMyRecipes());
  } catch (err) {
    dispatch({ payload: err.message, type: 'DELETE_RECIPES_ERROR' });
  }
};

export const deleteMyBookmark = (id) => async (dispatch) => {
  let deleteBookmarkUrl = `/event/bookmark/${id}`;
  try {
    dispatch({ type: 'DELETE_BOOKMARK_PENDING' });
    const result = await axios.delete(base_url + deleteBookmarkUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'DELETE_BOOKMARK_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    dispatch(getMyBookmark());
  } catch (err) {
    dispatch({ payload: err.message, type: 'DELETE_BOOKMARK_ERROR' });
  }
};

export const deleteMyLike = (id) => async (dispatch) => {
  let deleteLikeUrl = `/event/like/${id}`;
  try {
    dispatch({ type: 'DELETE_LIKE_PENDING' });
    const result = await axios.delete(base_url + deleteLikeUrl, {
      headers: {
        token: `${localStorage.getItem('token')}`,
      },
    });
    dispatch({ payload: result.data, type: 'DELETE_LIKE_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    dispatch(getMyLike());
  } catch (err) {
    dispatch({ payload: err.message, type: 'DELETE_LIKE_ERROR' });
  }
};
