// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../assets/styles/utility.css';
import '../../assets/styles/profile.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function ChangePassword() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPasswword] = useState({
    password: '',
  });

  const [oldPassword, setOldpassword] = useState({
    email: localStorage.getItem('email'),
    password: '',
  });

  const onChangeNewPassword = (e, field) => {
    setNewPasswword({
      ...newPassword,
      [field]: e,
    });
    console.log(newPassword);
  };

  const onChangeOldPassword = (e, field) => {
    setOldpassword({
      ...oldPassword,
      [field]: e,
    });
    console.log(oldPassword);
  };

  const changePassword = (id) => {
    let bodyData = new FormData();
    bodyData.append('password', newPassword.password);

    axios
      .put(base_url + `/users/${id}`, bodyData, {
        headers: {
          token: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('success update data!');
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: 'Success update data, please login with new password',
          icon: 'success',
        });
        localStorage.clear();
        navigate('/login');
      })
      .catch((err) => {
        console.log('failed update data!');
        console.log(err);
        Swal.fire({
          title: 'Failed!',
          text: `error :  ${err.response.data.messsage}`,
          icon: 'error',
        });
      });
  };

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

    axios
      .post(
        base_url + `/auth/login`,
        {
          email: oldPassword.email,
          password: oldPassword.password,
        },
        { headers: { 'content-type': 'application/x-www-form-urlencoded' } }
      )
      .then((res) => {
        console.log(res);
        changePassword(id);
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: 'Failed!',
          text: `error :  Incorrect old password, please enter the correct old password`,
          icon: 'error',
        });
      });
  };

  return (
    <div>
      <div className='container-fluid edit-profile ff-poppins px-0'>
        <div className='container d-flex justify-content-center align-items-center'>
          <form onSubmit={(e) => onSubmit(e)}>
            <h4 className='text-center color-primary fw-semibold mt-5 pt-5 mb-5'>Change Your Password Here</h4>
            <div className='mb-3 name mx-auto'>
              <label className='form-label'>Old Password</label>
              <input type='password' name='password' className='form-control old-password' id='old-password' onChange={(e) => onChangeOldPassword(e.target.value, 'password')} />
            </div>
            <div className='mb-3 email mx-auto'>
              <label className='form-label'>New Password</label>
              <input type='password' className='form-control new-password' name='password' id='new-passsword' onChange={(e) => onChangeNewPassword(e.target.value, 'password')} />
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
