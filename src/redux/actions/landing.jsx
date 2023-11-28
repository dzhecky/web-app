import axios from 'axios';
const base_url = import.meta.env.VITE_BASE_URL;

let recipeUrl = '/recipe?limit=9';
let latestRecipeUrl = `/recipe/latest`;
let suggestionsRecipeUrl = `/recipe/suggestion`;

export const getLatestRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_LATEST_RECIPES_PENDING' });
    const result = await axios.get(base_url + recipeUrl);
    dispatch({ payload: result.data.data, type: 'GET_LATEST_RECIPES_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_LATEST_RECIPES_ERROR' });
  }
};

export const getNewRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_NEW_RECIPES_PENDING' });
    const result = await axios.get(base_url + latestRecipeUrl);
    dispatch({ payload: result.data.data, type: 'GET_NEW_RECIPES_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_NEW_RECIPES_ERROR' });
  }
};

export const getSuggestionsRecipes = () => async (dispatch) => {
  try {
    dispatch({ type: 'GET_SUGGESTIONS_RECIPES_PENDING' });
    const result = await axios.get(base_url + suggestionsRecipeUrl);
    dispatch({ payload: result.data.data, type: 'GET_SUGGESTIONS_RECIPES_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_SUGGESTIONS_RECIPES_ERROR' });
  }
};
