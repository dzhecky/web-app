const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const editProfileReducers = (state = initialState, action) => {
  if (action.type === 'PUT_PROFILE_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'PUT_PROFILE_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'PUT_PROFILE_ERROR') {
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

export default editProfileReducers;
