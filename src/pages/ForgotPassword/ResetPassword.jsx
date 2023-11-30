// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { resetPasswordAction } from '../../redux/actions/auth';

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    otp: '',
    password: '',
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authResetPassword = useSelector((state) => state.authResetPassword);

  const onChange = (e, field) => {
    setForm({
      ...form,
      [field]: e,
    });
    console.log(form);
  };

  if (authResetPassword.isLoading) {
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

    if (form.otp === '' || form.password === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `Code OTP and Password is required`,
        icon: 'error',
      });
    }

    dispatch(resetPasswordAction(form.otp, form.password, navigate));
  };
  return (
    <div>
      <div className='container-fluid edit-profile ff-poppins px-0'>
        <div className='container d-flex justify-content-center align-items-center'>
          <form onSubmit={(e) => onSubmit(e)}>
            <h4 className='text-center color-primary fw-semibold mt-5 pt-5 mb-5'>Reset Your Password Here</h4>
            <div className='mb-3 name mx-auto'>
              <label className='form-label'>Code OTP</label>
              <input type='text' name='otp' className='form-control old-password' id='old-password' placeholder='Your Code OTP' onChange={(e) => onChange(e.target.value, 'otp')} />
            </div>
            <div className='mb-3 email mx-auto'>
              <label className='form-label'>New Password</label>
              <div className='input-group'>
                <input type={showPassword ? 'text' : 'password'} className='form-control new-password' name='password' id='new-passsword' onChange={(e) => onChange(e.target.value, 'password')} />
                <span className='input-group-text background-primary' id='showHide' onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}></i>
                </span>
              </div>
            </div>
            <div className='mb-3 change-password mx-auto'>
              <button type='submit' className='btn btn-update-profile background-primary text-white'>
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
