// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/addRecipe.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function AddRecipe() {
  const navigate = useNavigate();
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState({});
  const [inputData, setInputData] = useState({
    photo_url: '',
    title: '',
    ingredients: '',
    category_id: '',
  });

  useEffect(() => {
    let categoryUrl = `/category`;

    axios
      .get(base_url + categoryUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log('get category', res);
        setCategory(res.data);
      })
      .catch((err) => console.log(err));
    console.log('axios get category');
  }, []);

  useEffect(() => {
    console.log('Category ', category);
  }, [category]);

  const postData = (event) => {
    event.preventDefault();
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('title', inputData.title);
    bodyData.append('ingredients', inputData.ingredients);
    bodyData.append('id_category', inputData.category_id);

    axios
      .post(base_url + '/recipe', bodyData, {
        headers: {
          token: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('success input data!');
        console.log(res);
        navigate('/home');
      })
      .catch((err) => {
        console.log('failed input data!');
        console.log(err);
      });
  };

  const onChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
    console.log('input', e.target.name, e.target.value);
    console.log(inputData);
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] && setInputData({ ...inputData, photo_url: URL.createObjectURL(e.target.files[0]) });
    console.log(e.target.files[0]);
  };
  return (
    <div>
      <Navbar />
      <div className='container-fluid ff-poppins px-0'>
        <section className='container add-recipe'>
          <form onSubmit={postData} id='form-add-recipe'>
            <div className='d-flex add-photo form-control justify-content-center align-items-center mb-4'>
              {photo && <img src={inputData.photo_url} className='position-absolute w-100 h-100 object-fit-cover' />}
              <button className='btn btn-add-photo fw-medium'>
                Add Photo
                <input type='file' className='background-primary' width='100%' height='100%' name='photo' onChange={onChangePhoto} />
              </button>
            </div>
            <div className='mb-3'>
              <input type='text' className='form-control p-3' placeholder='Title' name='title' id='title' onChange={onChange} />
            </div>
            <div className='mb-3'>
              <textarea className='form-control p-3' placeholder='Ingredients' rows='10' name='ingredients' onChange={onChange}></textarea>
            </div>
            <div className='mb-3'>
              <select name='category_id' id='category' className='btn py-3' onChange={onChange}>
                {category.result?.map((items, index) => {
                  return (
                    <option value={parseInt(items.id_category)} key={index + 1}>
                      {items.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className='mb-3 d-flex justify-content-center'>
              <button type='submit' className='btn background-primary py-2 fw-medium text-white'>
                Post
              </button>
            </div>
          </form>
        </section>
      </div>
      <Footer />
    </div>
  );
}
