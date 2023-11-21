// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/searchRecipes.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function SearchRecipes() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let recipeUrl = `/recipe`;

    axios
      .get(base_url + recipeUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
    console.log('axios get all recipe');
  }, []);

  const toDetailRecipe = (id) => {
    navigate(`/recipe-detail/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className='container-fluid ff-poppins px-0'>
        {/* <!-- Hero Section Start --> */}
        <section className='hero-search px-3 px-md-0' id='hero'>
          <h1 className='color-blue'>Discover Recipe & Delicious Food</h1>
          <div className='d-flex mt-3 search-recipes'>
            <input type='search' className='form-control' placeholder='Search Recipes' />
            <button className='btn background-primary color-white ms-3'>Search</button>
          </div>
          <div className='d-flex flex-wrap mt-3 tag gap-3'>
            <button className='btn background-primary color-white px-3'>New</button>
            <button className='btn background-primary color-white px-3'>Popular</button>
            <button className='btn background-green color-white px-3'>Vegetarian</button>
            <button className='btn background-green color-white px-3'>Breakfast</button>
          </div>
        </section>
        {/* <!-- Hero Section End--> */}

        <section className='menu-recipes row g-0' id='recipes'>
          <div className='content-left-search col-md-11' id='result-recipes'>
            {data?.map((items) => {
              return (
                <div className='card mb-3 mt-5 card-menu-search border-0 mx-3' key={items.id_recipe}>
                  <a className='text-decoration-none' onClick={() => toDetailRecipe(items.id_recipe)}>
                    <div className='row g-0'>
                      <div className='col-md-6'>
                        <img src={items.photo} className='img-fluid rounded-start w-100' alt='...' />
                      </div>
                      <div className='container col-md-6 p-0'>
                        <div className='ms-md-4 card-body ps-1 pt-md-0'>
                          <h3 className='card-title mb-4 color-grey fw-medium'>{items.title}</h3>
                          <p className='card-text fw-medium mb-0 color-grey'>Ingredients:</p>
                          <p className='card-text fw-medium color-grey'>{items.ingredients.join(', ')}</p>
                          <div className='status d-flex background-primary text-white justify-content-around py-2 btn'>
                            <span>10 Likes</span>
                            <span>-</span>
                            <span>12 Comment</span>
                            <span>-</span>
                            <span>3 bookmark</span>
                          </div>
                          <div className='d-flex mt-4'>
                            <img src={items.photo_author} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover' />
                            <p className='ms-3 my-auto fw-medium color-grey'>{items.author}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              );
            })}
          </div>
          <div className='content-right col-1 d-md-flex flex-column d-sm-none'>
            <div className='h-50 background-primary align-self-end line-decoration'></div>
            <div className='h-50 background-primary align-self-end line-decoration'></div>
          </div>
          <div className='container d-flex justify-content-center gap-4 mt-5 mb-5' id='paging'>
            <span className='color-grey align-self-center'>Show 1-5 from 20</span>
            <button className='btn background-primary text-white align-self-center'>Next</button>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
