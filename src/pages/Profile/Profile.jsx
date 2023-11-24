// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import '../../assets/styles/utility.css';
import '../../assets/styles/profile.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState([]);
  const [photo, setPhoto] = useState();
  const [form, setForm] = useState({
    photo: '',
    name: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  const getDetailUser = () => {
    let detailUserUrl = `/users/${id}`;

    axios
      .get(base_url + detailUserUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUser(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('axios get detail user');
  };

  useEffect(() => {
    getDetailUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setForm({
      ...form,
      photo: user.photo,
      name: user.name,
    });
    console.log(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log('input', e.target.name, e.target.value);
    console.log(form);
  };

  const putData = () => {
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('name', form.name);

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
          text: res.data.message,
          icon: 'success',
        });
        navigate('/home');
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

  const handleUpdate = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to update?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        putData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        getDetailUser();
        return false;
      }
    });
  };

  const toChangePassword = (id) => {
    navigate(`/change-password/${id}`);
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] && setForm({ ...form, photo: URL.createObjectURL(e.target.files[0]) });
    console.log(e.target.files[0]);
    console.log('form photo ', form);
  };

  return (
    <>
      <div className='container-fluid edit-profile ff-poppins px-0'>
        <div className='container'>
          <form onSubmit={handleUpdate}>
            <div className='mb-3'>
              {form.photo && <img src={form.photo} className='d-block img-user mx-auto rounded-circle object-fit-cover' width='250' height='250' />}

              <div className='d-flex justify-content-center mb-3'>
                <button className='btn-change-photo-profile fw-medium color-blue'>
                  Change Profile Picture
                  <input type='file' className='background-primary' width='100%' height='100%' onChange={onChangePhoto} />
                </button>
              </div>
            </div>
            <div className='mb-3 name mx-auto'>
              <label htmlFor='name' className='form-label'>
                Name
              </label>
              <input type='text' name='name' className='form-control input-name' id='name' value={form.name} onChange={onChange} />
            </div>
            <div className='mb-3 email mx-auto'>
              <label htmlFor='exampleInputEmail1' className='form-label'>
                Email
              </label>
              <input type='email' className='form-control input-email' id='exampleInputEmail1' value={user?.email} aria-describedby='emailHelp' />
            </div>
            <div className='mb-3 change-password mx-auto'>
              <p>
                Change password?
                <a className='color-primary ms-1' onClick={() => toChangePassword(localStorage.getItem('uuid'))}>
                  Click here
                </a>
              </p>
              <button type='submit' className='btn btn-update-profile background-primary text-white'>
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
