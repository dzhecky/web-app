/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';

import { getCategory } from '../../redux/actions/category';
import { getDetailRecipe, updateRecipe } from '../../redux/actions/recipes';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/editRecipe.css';

export default function EditRecipe() {
  const [photo, setPhoto] = useState();
  const [form, setForm] = useState({
    photo: '',
    title: '',
    ingredients: '',
    id_category: '',
  });

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const detailRecipe = useSelector((state) => state.detailRecipe);
  const editRecipe = useSelector((state) => state.editRecipe);
  const navigate = useNavigate();

  const { id } = useParams();

  if (editRecipe.isLoading) {
    Swal.fire({
      title: 'Updating...',
      html: 'Please wait...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getDetailRecipe(id));
  }, [dispatch]);

  useEffect(() => {
    setForm({
      ...form,
      photo: detailRecipe.data?.photo,
      title: detailRecipe.data?.title,
      ingredients: detailRecipe.data?.ingredients,
      id_category: detailRecipe.data?.id_category,
    });
  }, [detailRecipe]);

  const putData = () => {
    let bodyData = new FormData();
    bodyData.append('photo', photo);
    bodyData.append('title', form.title);
    bodyData.append('ingredients', form.ingredients);
    bodyData.append('id_category', form.id_category);

    dispatch(updateRecipe(id, bodyData, navigate));
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to update this recipe?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        putData();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
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
        <form onSubmit={handleUpdate}>
          <div className='d-flex edit-photo align-items-center justify-content-center mb-4 ps-0'>
            {form.photo && <img src={form?.photo} alt='image-recipe' className='rounded' />}
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
              {category.isSuccess
                ? category.data?.map((items, index) => {
                    return (
                      <option value={parseInt(items.id_category)} key={index + 1}>
                        {items.name}
                      </option>
                    );
                  })
                : null}
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
