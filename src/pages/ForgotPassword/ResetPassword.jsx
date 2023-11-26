// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const base_url = import.meta.env.VITE_BASE_URL;

export default function ResetPassword() {
  const [form, setForm] = useState({
    otp: '',
    password: '',
  });
  const navigate = useNavigate();

  const onChange = (e, field) => {
    setForm({
      ...form,
      [field]: e,
    });
    console.log(form);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (form.otp === '' || form.password === '') {
      return Swal.fire({
        title: 'Failed!',
        text: `Code OTP and Password is required`,
        icon: 'error',
      });
    }

    axios
      .post(
        base_url + `/auth/reset-password`,
        {
          otp: form.otp,
          password: form.password,
        },
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
        });
        return navigate('/login');
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Failed!',
          text: `error :  ${err.response.data.message}`,
          icon: 'error',
        });
      });
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
              <input type='password' className='form-control new-password' name='password' id='new-passsword' onChange={(e) => onChange(e.target.value, 'password')} />
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
