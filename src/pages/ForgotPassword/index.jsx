// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { forgotPasswordAction } from '../../redux/actions/auth';

import '../../assets/styles/utility.css';
import '../../assets/styles/auth.css';
import logoApp from '../../assets/icon/barbecue 1.svg';

export default function ForgotPassword() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authForgotPassword = useSelector((state) => state.authForgotPassword);

  const changeEmail = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  if (authForgotPassword.isLoading) {
    Swal.fire({
      title: 'Sending code OTP to your email...',
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

    if (email === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `Email is required`,
        icon: 'error',
      });
    } else {
      dispatch(forgotPasswordAction({ email }, navigate));
    }
  };

  return (
    <div>
      <div className='container-fluid d-flex flex-column justify-content-center forgot-password ff-poppins'>
        <header className='container auth-container d-flex flex-column align-items-center'>
          <img src={logoApp} alt='icon-app' className='mb-2' height='100' width='100' />
          <p className='fw-medium color-primary text-center'>Food Recipe</p>
          <h3 className='color-primary mt-4 fw-semibold text-center'>Forgot Password</h3>
          <p className='text-new-account text-center'>Send OTP to your email!</p>
          <span className='line'></span>
        </header>
        <div className='container auth-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-5'>
              <label className='form-label text-label'>E-mail</label>
              <input type='email' name='email' className='form-control p-3 text-input' id='email' placeholder='E-mail' onChange={changeEmail} />
            </div>
            <button type='submit' className='btn background-primary w-100 text-light mb-2 p-3 text-white'>
              Send OTP
            </button>
          </form>
          <p className='text-secondary fw-medium'>
            {`Login instead? `}
            <Link to='/login' className='color-primary text-decoration-none'>
              Click here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
