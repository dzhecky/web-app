/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/editRecipe.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function EditRecipe() {
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState();
  const [category, setCategory] = useState({});
  const [form, setForm] = useState({
    photo: '',
    title: '',
    ingredients: '',
    id_category: '',
  });
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    let detailRecipeUrl = `/recipe/detail/${id}`;

    axios
      .get(base_url + detailRecipeUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log('axios get detail recipe');
  }, [id]);

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

  useEffect(() => {
    setForm({
      ...form,
      photo: data.photo,
      title: data.title,
      ingredients: data.ingredients,
      id_category: data.id_category,
    });
  }, [data]);

  const putData = (event) => {
    event.preventDefault();
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('title', form.title);
    bodyData.append('ingredients', form.ingredients);
    bodyData.append('id_category', form.id_category);

    axios
      .put(base_url + `/recipe/${id}`, bodyData, {
        headers: {
          token: `${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log('success update data!');
        alert('success update data!');
        console.log(res);
        navigate('/home');
      })
      .catch((err) => {
        console.log('failed update data!');
        console.log(err);
      });
  };

  const onChangePhoto = (e) => {
    setPhoto(e.target.files[0]);
    e.target.files[0] && setForm({ ...form, photo: URL.createObjectURL(e.target.files[0]) });
    console.log(e.target.files[0]);
  };

  return (
    <div>
      <Navbar />
      <section className='container edit-recipe'>
        <form onSubmit={putData}>
          <div className='d-flex edit-photo align-items-center justify-content-center mb-4 ps-0'>
            {form.photo && <img src={form.photo} alt='image-recipe' className='rounded' />}
            <button className='btn btn-change-photo fw-medium'>
              Change Photo
              <input type='file' className='background-primary' width='100%' height='100%' onChange={onChangePhoto} />
            </button>
          </div>
          <div className='mb-3'>
            <input type='text' className='form-control p-3' placeholder='Title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          </div>
          <div className='mb-3'>
            <textarea className='form-control p-3' placeholder='Ingredients' rows='10' value={form.ingredients} onChange={(e) => setForm({ ...form, ingredients: e.target.value })}></textarea>
          </div>
          <div className='mb-3'>
            <select name='category_id' id='category' className='btn py-3' value={form.id_category} onChange={(e) => setForm({ ...form, id_category: e.target.value })}>
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
            <button type='submit' className='btn btn-update background-primary py-2 fw-medium text-white'>
              Update
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </div>
  );
}
