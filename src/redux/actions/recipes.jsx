import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const getDetailRecipe = (id) => async (dispatch, getState) => {
  let detailRecipeUrl = `/recipe/detail/${id}`;
  try {
    dispatch({ type: 'GET_DETAIL_RECIPE_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + detailRecipeUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data.data, type: 'GET_DETAIL_RECIPE_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_DETAIL_RECIPE_ERROR' });
  }
};

export const postEvent = (data) => async (dispatch, getState) => {
  let eventUrl = `/event`;
  try {
    dispatch({ type: 'POST_EVENT_RECIPE_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.post(base_url + eventUrl, data, {
      headers: {
        token,
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data.data, type: 'POST_EVENT_RECIPE_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: `Recipe successfully ${result.data.data.status}ed`,
      icon: 'success',
    });
    dispatch(getDetailRecipe(data.recipes_id));
  } catch (err) {
    dispatch({ payload: err.message, type: 'POST_EVENT_RECIPE_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.message}`,
      icon: 'error',
    });
    dispatch(getDetailRecipe(data.recipes_id));
  }
};

export const getCountRecipes = (id) => async (dispatch, getState) => {
  let countRecipesUrl = `/recipe/count/${id}`;
  try {
    dispatch({ type: 'GET_COUNT_RECIPES_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + countRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data.data, type: 'GET_COUNT_RECIPES_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_COUNT_RECIPES_ERROR' });
  }
};

export const updateRecipe = (id, bodyData, navigate) => async (dispatch, getState) => {
  let updateRecipeUrl = `/recipe/${id}`;
  try {
    dispatch({ type: 'PUT_RECIPE_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.put(base_url + updateRecipeUrl, bodyData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ payload: result.data.data, type: 'PUT_RECIPE_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/home');
  } catch (err) {
    dispatch({ payload: err.message, type: 'PUT_RECIPE_ERROR' });
  }
};

export const getAllRecipes = (keyword, page, limit, idCategory, popular) => async (dispatch, getState) => {
  let allRecipesUrl = `/recipe?search=${keyword}&page=${page}&limit=${limit}&category=${idCategory}&popular=${popular}`;
  try {
    dispatch({ type: 'GET_ALL_RECIPES_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + allRecipesUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data, type: 'GET_ALL_RECIPES_SUCCESS' });
    if (result.data.data?.length === 0) {
      Swal.fire({
        title: 'Failed!',
        text: `error :  ${result.data.message} `,
        icon: 'error',
      });
    }
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_ALL_RECIPES_ERROR' });
  }
};
