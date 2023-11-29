const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const myBookmarkReducers = (state = initialState, action) => {
  if (action.type === 'GET_MY_BOOKMARK_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'GET_MY_BOOKMARK_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'GET_MY_BOOKMARK_ERROR') {
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

export default myBookmarkReducers;
