// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { registerAction } from '../../redux/actions/auth';

import '../../assets/styles/utility.css';
import '../../assets/styles/auth.css';
import logoApp from '../../assets/icon/barbecue 1.svg';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    terms: '',
  });
  const dispatch = useDispatch();
  const authRegister = useSelector((state) => state.authRegister);

  if (authRegister.isLoading) {
    Swal.fire({
      title: 'Sending activation to your email...',
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
    } else if (form.name === '' || form.email === '' || form.password === '') {
      Swal.fire({
        title: 'Failed!',
        text: `Name, Email or Password is required!`,
        icon: 'error',
      });
    } else {
      dispatch(registerAction(form.name, form.email, form.password, navigate));
    }
  };
  return (
    <div>
      <div className='container-fluid d-flex flex-column justify-content-center register ff-poppins'>
        <header className='container auth-container d-flex flex-column align-items-center' id='header'>
          <img src={logoApp} alt='icon-app' className='mb-2' height='100' width='100' />
          <p className='fw-medium color-primary text-center'>Food Recipe</p>
          <h3 className='color-primary mt-4 fw-semibold text-center'>{`Let's Get Started`}</h3>
          <p className='text-new-account text-center'>Create new account to access all features</p>
          <span className='line'></span>
        </header>
        <div className='container auth-container'>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label className='form-label text-label'>Name</label>
              <input type='text' className='form-control p-3 text-input' id='name' placeholder='Name' onChange={(e) => onChangeInput(e.target.value, 'name')} />
            </div>
            <div className='mb-3'>
              <label className='form-label text-label'>E-mail</label>
              <input type='email' className='form-control p-3 text-input' id='email' placeholder='E-mail' onChange={(e) => onChangeInput(e.target.value, 'email')} />
            </div>
            <div className='mb-3'>
              <label className='form-label text-label'>Password</label>
              <div className='input-group'>
                <input type={showPassword ? 'text' : 'password'} className='form-control p-3 text-input' id='password' placeholder='Password' onChange={(e) => onChangeInput(e.target.value, 'password')} />
                <span className='input-group-text background-primary' id='showHide' onClick={() => setShowPassword(!showPassword)}>
                  <i className={showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}></i>
                </span>
              </div>
            </div>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='terms' onChange={(e) => onChangeInput(e.target.checked, 'terms')} />
              <label className='form-check-label text-label'>I agree to terms and conditions</label>
            </div>
            <button type='submit' className='btn background-primary w-100 text-light mb-2 p-3 text-white'>
              Register Account
            </button>
          </form>
          <p className='text-center text-secondary mt-4'>
            {`Already have account? `}
            <Link to='/login' className='color-primary text-decoration-none'>
              Log in Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
