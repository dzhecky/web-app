const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const authForgotPasswordReducers = (state = initialState, action) => {
  if (action.type === 'AUTH_FORGOT_PASSWORD_PENDING') {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === 'AUTH_FORGOT_PASSWORD_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      isSuccess: true,
      isError: false,
      data: action.payload,
    };
  } else if (action.type === 'AUTH_FORGOT_PASSWORD_ERROR') {
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

export default authForgotPasswordReducers;
