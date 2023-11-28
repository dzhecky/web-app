const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const deleteLikeReducers = (state = initialState, action) => {
  if (action.type === 'DELETE_LIKE PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'DELETE_LIKE SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      data: action.payload,
    };
  } else if (action.type === 'DELETE_LIKE ERROR') {
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

export default deleteLikeReducers;
