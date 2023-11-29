const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const newRecipesReducers = (state = initialState, action) => {
  if (action.type === 'GET_NEW_RECIPES_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'GET_NEW_RECIPES_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'GET_NEW_RECIPES_ERROR') {
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

export default newRecipesReducers;
