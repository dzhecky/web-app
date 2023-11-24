/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/detailRecipe.css';
import iconBookmark from '../../../public/bookmark.svg';
import iconLike from '../../../public/like.svg';
import imgUser from '../../../public/user.png';

const base_url = import.meta.env.VITE_BASE_URL;

export default function DetailRecipe() {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [detailRecipe, setDetailRecipe] = useState({});
  const [countRecipe, setCountRecipe] = useState();

  const { id } = useParams();

  useEffect(() => {
    let item = {
      name: localStorage.getItem('name'),
      uuid: localStorage.getItem('uuid'),
      photo: localStorage.getItem('photo'),
      token: localStorage.getItem('token'),
      refreshToken: localStorage.getItem('refreshToken'),
    };
    localStorage.getItem('name') && setUser(item);
    showDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let menuUrl = `/recipe/show/myrecipes`;

    axios
      .get(base_url + menuUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log('axios get recipe menu');
  }, []);

  // get detail recipe
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
        setDetailRecipe(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log('axios get recipe menu');
  }, [id]);

  //get count recipes
  useEffect(() => {
    let countRecipeUrl = `/recipe/count/${detailRecipe.uuid_author}`;

    axios
      .get(base_url + countRecipeUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setCountRecipe(res.data.data);
      })
      .catch((err) => console.log(err));
    // console.log('axios get count recipe menu');
  }, [detailRecipe.uuid_author]);

  useEffect(() => {
    console.log(data);
    console.log('detail ', detailRecipe);
  }, [data, detailRecipe, countRecipe]);

  const handleEvent = (eventStatus) => {
    axios
      .post(
        base_url + `/event`,
        {
          recipes_id: id,
          status: eventStatus,
        },
        {
          headers: {
            token: `${localStorage.getItem('token')}`,
            'content-type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: `Recipe successfully ${res.data.data.status}ed`,
          icon: 'success',
        });
      })
      .catch((err) => {
        Swal.fire({
          title: 'Failed!',
          text: `error :  ${err.response.data.message}`,
          icon: 'error',
        });
      });
  };

  // Get date
  let date;
  let month;
  let year;

  const today = new Date();

  month = today.getMonth();
  date = today.getDate();
  year = today.getFullYear();

  switch (month) {
    case 0:
      month = 'January';
      break;
    case 1:
      month = 'February';
      break;
    case 2:
      month = 'March';
      break;
    case 3:
      month = 'April';
      break;
    case 4:
      month = 'Mei';
      break;
    case 5:
      month = 'June';
      break;
    case 6:
      month = 'July';
      break;
    case 7:
      month = 'August';
      break;
    case 8:
      month = 'September';
      break;
    case 9:
      month = 'October';
      break;
    case 10:
      month = 'November';
      break;
    case 11:
      month = 'December';
      break;
  }

  function showDate() {
    document.getElementById('date').innerHTML = `${date} ${month} ${year}`;
  }
  return (
    <div>
      <Navbar />
      {/* <!-- Hero Section Start --> */}
      <header className='container d-sm-flex align-items-center justify-content-between ff-poppins' id='hero'>
        <div className='d-flex align-items-center' id='users-avatar'>
          <span className='me-3 line-photo-user'></span>
          <img src={detailRecipe?.photo_author} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
          <div className='d-flex flex-column ms-3 h-100 justify-content-center'>
            <p className='mb-0 fw-medium'>{detailRecipe?.author}</p>
            <p className='text-recipe mb-0'>{countRecipe?.count} Recipes</p>
          </div>
        </div>
        <div className='text-sm-end text-sm-start fw-medium pt-3 ps-4' id='users-status'>
          <p className='my-0 fw-medium' id='date'></p>
          <p className='my-0 fw-medium'>20 Likes - 2 Comments</p>
        </div>
      </header>
      <section className='container detail-menu ff-poppins' id='detail-recipes'>
        <h1 className='text-center color-blue mt-5'>{detailRecipe.title}</h1>
        <img src={detailRecipe.photo} alt='detail-menu' className='rounded mx-auto d-block mt-5' />
        <div className='list-ingredients'>
          <h4 className='mt-3'>Ingredients:</h4>
          <ul>
            {detailRecipe.ingredients?.map((items, index) => {
              return <li key={index}>- {items}</li>;
            })}
          </ul>
        </div>
      </section>
      {/* <!-- Comments Start --> */}
      <section className='container mt-5 ps-2 ff-poppins' id='section-comments'>
        <button className='btn-bookmark background-primary me-3' onClick={() => handleEvent('bookmark')}>
          <img src={iconBookmark} alt='bookmark' />
        </button>
        <button className='btn-like' onClick={() => handleEvent('like')}>
          <img src={iconLike} alt='like' />
        </button>
        <div className='box-comments mt-3'>
          <div className='comments d-flex align-items-center mb-5 flex-wrap'>
            <img src={imgUser} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
            <div className='commentators d-flex flex-column ms-3 h-100 justify-content-center'>
              <p className='mb-0 fw-medium'>Karen</p>
              <p className='text-recipe mb-0'>20 Recipes</p>
            </div>
            <span className='ms-4 me-4 line-photo-user'></span>
            <p className='mb-0 fw-medium'>Wow, I just made this and it was delicious! Thanks for sharing!</p>
          </div>
          <div className='comments d-flex align-items-center mb-5 flex-wrap'>
            <img src={imgUser} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
            <div className='commentators d-flex flex-column ms-3 h-100 justify-content-center'>
              <p className='mb-0 fw-medium'>Ariel</p>
              <p className='text-recipe mb-0'>20 Recipes</p>
            </div>
            <span className='ms-4 me-4 line-photo-user'></span>
            <p className='mb-0 fw-medium'>So simple and delicious!</p>
          </div>
        </div>
      </section>
      {/* <!-- Comments End --> */}

      {/* <!-- Create Comments Start --> */}
      <section className='container ff-poppins' id='create-comments'>
        <form action=''>
          <div className='form-comment'>
            <textarea className='form-control py-4 px-4' placeholder='Your comment here' rows='7' cols='70'></textarea>
            <button className='btn btn-comment'>Send a comment</button>
          </div>
        </form>
      </section>
      {/* <!-- Create Comments End --> */}
      <Footer />
    </div>
  );
}
