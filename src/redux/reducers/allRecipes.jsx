const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const allRecipesReducers = (state = initialState, action) => {
  if (action.type === 'GET_ALL_RECIPES_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'GET_ALL_RECIPES_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'GET_ALL_RECIPES_ERROR') {
    return {
      ...state,
      isLoading: false,
      isSuccess: false,
      isError: true,
      errorMessage: action.payload,
    };
  } else {
    return state;
  }
};

export default allRecipesReducers;
