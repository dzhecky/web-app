// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { putPofile } from '../../redux/actions/user';

import '../../assets/styles/utility.css';
import '../../assets/styles/profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
  const [photo, setPhoto] = useState();
  const [form, setForm] = useState({
    photo: '',
    name: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const detailUser = useSelector((state) => state.detailUser);
  const editProfile = useSelector((state) => state.editProfile);

  useEffect(() => {
    setForm({
      ...form,
      photo: detailUser?.data?.photo,
      name: detailUser?.data?.name,
    });
    console.log(form);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log('input', e.target.name, e.target.value);
    console.log(form);
  };

  if (editProfile.isLoading) {
    Swal.fire({
      title: 'Updating your profile...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  const putData = () => {
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('name', form.name);

    dispatch(putPofile(id, bodyData, navigate));
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
        navigate('/home');
        return false;
      }
    });
  };

  // const toChangePassword = (id) => {
  //   navigate(`/change-password/${id}`);
  // };

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
              <input type='email' className='form-control input-email' id='exampleInputEmail1' value={detailUser?.data?.email} aria-describedby='emailHelp' disabled />
            </div>
            <div className='mb-3 change-password mx-auto'>
              <p>
                Change password?
                <Link to={`/change-password/${detailUser.data.uuid}`} className='color-primary ms-1'>
                  Click here
                </Link>
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
