// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/home.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const base_url = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  useEffect(() => {
    console.log(data);
  }, [data]);

  const toDetailRecipe = (id) => {
    navigate(`/recipe-detail/${id}`);
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
      <div className='container-fluid ff-poppins px-0'>
        {/* <!-- Hero Section Start --> */}
        <header className='container d-sm-flex align-items-center justify-content-between' id='hero'>
          <a href='editProfile.html' className='text-decoration-none text-dark'>
            <div className='d-flex align-items-center' id='users-avatar'>
              <span className='me-3 line-photo-user'></span>
              <img src={user?.photo} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
              <div className='d-flex flex-column ms-3 h-100 justify-content-center'>
                <p className='mb-0 fw-medium'>{user?.name}</p>
                <p className='text-recipe mb-0'>{data.length} Recipes</p>
              </div>
            </div>
          </a>
          <div className='text-sm-end text-sm-start fw-medium pt-3 ps-4'>
            <p className='my-0 fw-medium' id='date'></p>
          </div>
        </header>
        {/* <!-- Hero Section End--> */}

        {/* <!-- Tab Start --> */}
        <section className='container mt-5' id='tab-menu'>
          <div className='tab-status'>
            <ul className='nav nav-tabs d-flex justify-content-between'>
              <li className='nav-item'>
                <h4 className='px-0'>
                  <a className='nav-link px-0 tab-active color-grey' aria-current='page' href='detailProfile.html'>
                    Recipes
                  </a>
                </h4>
              </li>
              <li className='nav-item'>
                <h4>
                  <a className='nav-link px-0 color-gray' href='bookmarked.html'>
                    Bookmarked
                  </a>
                </h4>
              </li>
              <li className='nav-item'>
                <h4>
                  <a className='nav-link px-0 color-gray' href='liked.html'>
                    Liked
                  </a>
                </h4>
              </li>
            </ul>
          </div>
        </section>
        {/* <!-- Tab End --> */}

        {/* <!-- Recipes Start --> */}
        <section className='menu-recipes container' id='recipes'>
          <div className='content-left' id='my-recipes'>
            <div className='card mb-3 mt-5 card-menu border-0'>
              {data?.map((items) => {
                return (
                  <div className='row g-0 mb-5' key={items.id_recipe} onClick={() => toDetailRecipe(items.id_recipe)}>
                    <div className='col-md-6'>
                      <img src={items.photo} className='img-fluid rounded-start w-100 img-my-recipes object-fit-cover' alt='...' />
                    </div>
                    <div className='container col-md-6 p-0 recipe-info'>
                      <div className='ms-md-4 card-body ps-1 pt-md-0 d-flex flex-column h-100 justify-content-between'>
                        <h3 className='card-title mb-4 color-grey fw-medium'>{items.title}</h3>
                        <p className='card-text fw-medium mb-3 color-grey'>
                          <span className='fw-semibold'>Ingredients:</span> <br />
                          {items.ingredients.join(', ')}
                        </p>
                        <a href='detailRecipe.html' className='text-decoration-none text-dark'>
                          <div className='status d-flex background-primary text-white justify-content-around py-2 btn'>
                            <span>10 Likes</span>
                            <span>-</span>
                            <span>12 Comment</span>
                            <span>-</span>
                            <span>3 bookmark</span>
                          </div>
                        </a>
                        <div className='d-flex mt-4 justify-content-between'>
                          <a className='btn btn-primary' href='editRecipe.html'>
                            Edit Recipe
                          </a>
                          <button className='btn btn-danger'>Delete Recipe</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className='container d-flex justify-content-center gap-4 mt-5 mb-5' id='paging'>
            <button className='btn background-primary text-white align-self-center'>Prev</button>
            <span className='color-grey align-self-center'>Show 6-10 from 10</span>
          </div>
        </section>
        {/* <!-- Recipes End --> */}

        <Footer />
      </div>
    </div>
  );
}
