const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const myLikeReducers = (state = initialState, action) => {
  if (action.type === 'GET_MY_LIKE_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'GET_MY_LIKE_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'GET_MY_LIKE_ERROR') {
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

export default myLikeReducers;
