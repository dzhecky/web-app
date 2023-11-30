// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { loginAction } from '../../redux/actions/auth';

import '../../assets/styles/utility.css';
import '../../assets/styles/auth.css';
import logoApp from '../../assets/icon/barbecue 1.svg';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
    terms: '',
  });
  const dispatch = useDispatch();
  const authLogin = useSelector((state) => state.authLogin);

  if (authLogin.isLoading) {
    Swal.fire({
      title: 'Login...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const onChangeInput = (e, field) => {
    setForm({
      ...form,
      [field]: e,
    });
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.terms !== true) {
      Swal.fire({
        title: 'Failed!',
        text: `You must agree terms & conditions`,
        icon: 'error',
      });
    } else if (form.email === '' || form.password === '') {
      Swal.fire({
        title: 'Failed!',
        text: `Email and Password is required!`,
        icon: 'error',
      });
    } else {
      dispatch(loginAction(form.email, form.password, navigate));
    }
  };

  return (
    <div>
      <div className='container-fluid d-flex flex-column justify-content-center login ff-poppins'>
        <header className='container auth-container d-flex flex-column align-items-center'>
          <img src={logoApp} alt='icon-app' className='mb-2' height='100' width='100' />
          <p className='fw-medium color-primary text-center'>Food Recipe</p>
          <h3 className='color-primary mt-4 fw-semibold text-center'>Welcome!</h3>
          <p className='text-new-account text-center'>Log in into your existing account</p>
          <span className='line'></span>
        </header>
        <div className='container auth-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label className='form-label text-label'>E-mail</label>
              <input type='email' className='form-control p-3 text-input' id='email' placeholder='E-mail' onChange={(e) => onChangeInput(e.target.value, 'email')} />
            </div>
            <div className='mb-3'>
              <label className='form-label text-label'>Password</label>
              <div className='input-group'>
                <input type={showPassword ? 'text' : 'password'} className='form-control p-3 text-input input-group' id='password' placeholder='Password' onChange={(e) => onChangeInput(e.target.value, 'password')} />
                <span className='input-group-text background-primary' id='showHide' onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}></i>
                </span>
              </div>
            </div>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='terms' onChange={(e) => onChangeInput(e.target.checked, 'terms')} />
              <label htmlFor='terms' className='form-check-label text-label'>
                I agree to terms and conditions
              </label>
            </div>
            <input type='submit' value='Login' className='btn background-primary w-100 text-light mb-2 p-3 text-white' />
          </form>
          <p className='text-secondary mb-5 fw-medium'>
            {`Forgot your password? `}
            <Link to='/forgot-password' className='color-primary text-decoration-none'>
              Click here
            </Link>
          </p>
          <p className='text-center text-secondary mt-4 fw-medium'>
            {`Don't have an account? `}
            <Link to='/register' className='color-primary text-decoration-none'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
