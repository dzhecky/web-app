import axios from 'axios';
import Swal from 'sweetalert2';

const base_url = import.meta.env.VITE_BASE_URL;

export const loginAction = (email, password, navigate) => async (dispatch) => {
  let loginUrl = `/auth/login`;
  let bodyData = {
    email,
    password,
  };
  try {
    dispatch({ type: 'AUTH_LOGIN_PENDING' });
    const result = await axios.post(base_url + loginUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'AUTH_LOGIN_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    // Swal.fire({
    //   title: 'Success!',
    //   text: result.data.message,
    //   icon: 'success',
    // });
    navigate('/home');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'AUTH_LOGIN_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};

export const registerAction = (name, email, password, navigate) => async (dispatch) => {
  let registerUrl = `/auth/register`;
  let bodyData = {
    name,
    email,
    password,
  };
  try {
    dispatch({ type: 'AUTH_REGISTER_PENDING' });
    const result = await axios.post(base_url + registerUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'AUTH_REGISTER_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/activate-account');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'AUTH_REGISTER_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};

export const activateAccountAction = (uuid, otp, navigate) => async (dispatch) => {
  let activateUrl = `/auth/activate/${uuid}`;
  let bodyData = {
    otp,
  };
  try {
    dispatch({ type: 'AUTH_ACTIVATE_ACCOUNT_PENDING' });
    const result = await axios.post(base_url + activateUrl, bodyData, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'AUTH_ACTIVATE_ACCOUNT_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/login');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'AUTH_ACTIVATE_ACCOUNT_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};

export const forgotPasswordAction = (email, navigate) => async (dispatch) => {
  let forgotPasswordUrl = `/auth/forgot-password`;
  try {
    dispatch({ type: 'AUTH_FORGOT_PASSWORD_PENDING' });
    const result = await axios.post(base_url + forgotPasswordUrl, email, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'AUTH_FORGOT_PASSWORD_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/reset-password');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'AUTH_FORGOT_PASSWORD_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};

export const resetPasswordAction = (otp, password, navigate) => async (dispatch) => {
  let data = {
    otp,
    password,
  };
  let resetPasswordUrl = `/auth/reset-password`;
  try {
    dispatch({ type: 'AUTH_RESET_PASSWORD_PENDING' });
    const result = await axios.post(base_url + resetPasswordUrl, data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'AUTH_RESET_PASSWORD_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/login');
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'AUTH_RESET_PASSWORD_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  ${err.response.data.messsage || err.response.data.message} `,
      icon: 'error',
    });
  }
};
