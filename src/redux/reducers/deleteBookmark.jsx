const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const deleteBookmarkReducers = (state = initialState, action) => {
  if (action.type === 'DELETE_BOOKMARK PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'DELETE_BOOKMARK SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      data: action.payload,
    };
  } else if (action.type === 'DELETE_BOOKMARK ERROR') {
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

export default deleteBookmarkReducers;
