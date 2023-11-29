const initialState = {
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  errorMessage: '',
};

const authLogoutReducers = (state = initialState, action) => {
  if (action.type === 'AUTH_LOGOUT') {
    return {
      ...state,
      data: null,
      isError: false,
      isSuccess: false,
      isLoading: false,
      errorMessage: '',
    };
  } else {
    return state;
  }
};

export default authLogoutReducers;
