import React from 'react';

import '../../assets/styles/utility.css';
import '../../assets/styles/auth.css';
import logoApp from '../../assets/icon/barbecue 1.svg';
import { Link } from 'react-router-dom';

export default function Register() {
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
          <form action='' method='post'>
            <div className='mb-3'>
              <label className='form-label text-label'>Name</label>
              <input type='text' className='form-control p-3 text-input' id='name' placeholder='Name' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-label'>E-mail</label>
              <input type='email' className='form-control p-3 text-input' id='email' placeholder='E-mail' />
            </div>
            <div className='mb-3'>
              <label className='form-label text-label'>Password</label>
              <input type='password' className='form-control p-3 text-input' id='password' placeholder='Password' />
            </div>
            <div className='mb-3 form-check'>
              <input type='checkbox' className='form-check-input' id='terms' />
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
