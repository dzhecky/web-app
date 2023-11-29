import axios from 'axios';
import Swal from 'sweetalert2';

import { logoutAction } from './authLogout';

const base_url = import.meta.env.VITE_BASE_URL;

export const getDetailUser = () => async (dispatch, getState) => {
  let uuid = await getState().authLogin.data.uuid;
  let detailUserUrl = `/users/${uuid}`;
  try {
    dispatch({ type: 'GET_DETAIL_USER_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.get(base_url + detailUserUrl, {
      headers: {
        token,
      },
    });
    dispatch({ payload: result.data.result, type: 'GET_DETAIL_USER_SUCCESS' });
  } catch (err) {
    dispatch({ payload: err.message, type: 'GET_DETAIL_USER_ERROR' });
  }
};

export const putPofile = (id, bodyData, navigate) => async (dispatch, getState) => {
  // let uuid = await getState().authLogin.data.uuid;
  let putUserUrl = `/users/${id}`;
  try {
    dispatch({ type: 'PUT_PROFILE_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.put(base_url + putUserUrl, bodyData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ payload: result.data.data, type: 'PUT_PROFILE_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: result.data.message,
      icon: 'success',
    });
    navigate('/home');
  } catch (err) {
    dispatch({ payload: err.message, type: 'PUT_PROFILE_ERROR' });
  }
};

export const putPassword = (bodyData) => async (dispatch, getState) => {
  let uuid = await getState().authLogin.data.uuid;
  let putPassword = `/users/${uuid}`;
  try {
    dispatch({ type: 'PUT_PASSWORD_PENDING' });
    let token = await getState().authLogin.data.token.accessToken;
    const result = await axios.put(base_url + putPassword, bodyData, {
      headers: {
        token,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch({ payload: result.data.data, type: 'PUT_PASSWORD_SUCCESS' });
    Swal.fire({
      title: 'Success!',
      text: 'Change password success, please login with new password',
      icon: 'success',
    });
    dispatch(logoutAction());
  } catch (err) {
    dispatch({ payload: err.message, type: 'PUT_PASSWORD_ERROR' });
  }
};

export const changePasswordAction = (email, password, bodyData) => async (dispatch) => {
  let loginUrl = `/auth/login`;
  let data = {
    email,
    password,
  };
  try {
    dispatch({ type: 'CHANGE_PASSWORD_PENDING' });
    const result = await axios.post(base_url + loginUrl, data, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
    });
    dispatch({ payload: result.data, type: 'CHANGE_PASSWORD_SUCCESS' });
    dispatch(putPassword(bodyData));
  } catch (err) {
    dispatch({ payload: err.response.data, type: 'CHANGE_PASSWORD_ERROR' });
    Swal.fire({
      title: 'Failed!',
      text: `error :  Incorrect old password, please enter the correct old password `,
      icon: 'error',
    });
  }
};
