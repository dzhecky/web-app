// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector, useStore } from 'react-redux';

import { changePasswordAction } from '../../redux/actions/user';

import '../../assets/styles/utility.css';
import '../../assets/styles/profile.css';

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const { id } = useParams();
  const [newPassword, setNewPasswword] = useState({
    password: '',
  });

  const store = useStore();
  const dispatch = useDispatch();
  const changePassword = useSelector((state) => state.changePassword);
  let email = store.getState().authLogin.data.email;

  const [oldPassword, setOldpassword] = useState({
    email,
    password: '',
  });

  const onChangeNewPassword = (e, field) => {
    setNewPasswword({
      ...newPassword,
      [field]: e,
    });
  };

  const onChangeOldPassword = (e, field) => {
    setOldpassword({
      ...oldPassword,
      [field]: e,
    });
  };

  if (changePassword.isLoading) {
    Swal.fire({
      title: 'Updating your password...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (oldPassword.password === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `Old Password is required!`,
        icon: 'error',
      });
    }

    if (newPassword.password === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `New Password is required!`,
        icon: 'error',
      });
    }

    let bodyData = new FormData();
    bodyData.append('password', newPassword.password);

    dispatch(changePasswordAction(oldPassword.email, oldPassword.password, bodyData));
  };

  return (
    <div>
      <div className='container-fluid edit-profile ff-poppins px-0'>
        <div className='container d-flex justify-content-center align-items-center'>
          <form onSubmit={(e) => onSubmit(e)}>
            <h4 className='text-center color-primary fw-semibold mt-5 pt-5 mb-5'>Change Your Password Here</h4>
            <div className='mb-3 name mx-auto'>
              <label className='form-label'>Old Password</label>
              <div className='input-group'>
                <input type={showPassword ? 'text' : 'password'} name='password' className='form-control old-password' id='old-password' onChange={(e) => onChangeOldPassword(e.target.value, 'password')} />
                <span className='input-group-text background-primary' id='showHide' onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}></i>
                </span>
              </div>
            </div>
            <div className='mb-3 email mx-auto'>
              <label className='form-label'>New Password</label>
              <div className='input-group'>
                <input type={showNewPassword ? 'text' : 'password'} className='form-control new-password' name='password' id='new-passsword' onChange={(e) => onChangeNewPassword(e.target.value, 'password')} />
                <span className='input-group-text background-primary' id='showHide' onClick={() => setShowNewPassword(!showNewPassword)}>
                  <i className={showNewPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}></i>
                </span>
              </div>
            </div>
            <div className='mb-3 change-password mx-auto'>
              <p>
                Back to edit porfile
                <Link to={`/profile/${id}`} className='color-primary ms-1'>
                  Click here
                </Link>
              </p>
              <button type='submit' className='btn btn-update-profile background-primary text-white'>
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
