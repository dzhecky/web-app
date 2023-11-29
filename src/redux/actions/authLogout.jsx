export const logoutAction = () => async (dispatch) => {
  dispatch({ type: 'AUTH_LOGOUT' });
  localStorage.clear();
};
