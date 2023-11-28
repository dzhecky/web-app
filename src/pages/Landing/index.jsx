// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getSuggestionsRecipes, getNewRecipes, getLatestRecipes } from '../../redux/actions/landing';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import icSearch from '../../assets/icon/search.svg';
import heroImg from '../../assets/image/hero.jpg';
import ellipse from '../../assets/icon/Ellipse 114.svg';
import '../../assets/styles/utility.css';
import '../../assets/styles/landing.css';

export default function Landing() {
  const dispatch = useDispatch();
  const suggestionsRecipes = useSelector((state) => state.suggestionsRecipes);
  const newRecipes = useSelector((state) => state.newRecipes);
  const latestRecipes = useSelector((state) => state.latestRecipes);

  useEffect(() => {
    dispatch(getSuggestionsRecipes());
    dispatch(getNewRecipes());
    dispatch(getLatestRecipes());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />
      <div className='container-fluid ff-poppins'>
        {/* <!-- Hero Section Start --> */}
        <section className='hero row' id='hero'>
          <div className='content col-10 col-sm-9 d-flex flex-column justify-content-center'>
            <h1 className='color-blue fw-medium display-5'>Discover Recipe & Delicious Food</h1>
            <div className='d-flex mt-3 search align-items-center'>
              <label className='py-3 ps-4 rounded'>
                <img src={icSearch} alt='' />
              </label>
              <input type='search' className='form-control py-3' placeholder='Search Recipes' />
            </div>
          </div>
          <div className='decoration col-2 col-sm-3 d-flex background-primary align-items-center'>
            <img src={heroImg} alt='hero-image' className='d-none d-md-block' />
          </div>
        </section>
        {/* <!-- Hero Section End--> */}
      </div>

      {/* <!-- Suggestion Section Start --> */}
      <section className='suggestion ff-poppins' id='suggestion'>
        <div className='title-section py-3 px-3 mb-5'>
          <h2 className='fw-semibold'>Popular For You!</h2>
        </div>
        {suggestionsRecipes.isLoading ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='spinner-grow text-warning' role='status'></div>
            <span className='text-warning mt-1'>Loading</span>
          </div>
        ) : null}
        {suggestionsRecipes.isSuccess
          ? suggestionsRecipes.data?.map((items) => {
              return (
                <div className='row mx-0' key={items.id_recipe}>
                  <div className='left col-12 col-md-6 d-flex justify-content-center'>
                    <div className='ellipse d-none d-md-flex'>
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                      <img src={ellipse} alt='Ellipse' className='img-elipse' />
                    </div>
                    <img src={items.photo} alt='img-suggestion' className='mb-3 img-suggestion' />
                    <div className='rectangle'></div>
                  </div>
                  <div className='right col-12 col-md-6 d-flex flex-column justify-content-center align-items-center'>
                    <div>
                      <h1 className='mb-md-4 mb-xl-5'>{items.title}</h1>
                      <p className='mb-md-4 mb-xl-5'>
                        <span className='fw-medium'>Ingredients:</span>
                        <br />
                        {items.ingredients}
                      </p>
                      <Link to='/login' className='btn background-primary text-white justify-content-start'>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        {suggestionsRecipes.isError ? <div className='text-center'>{suggestionsRecipes?.errorMessage}</div> : null}
      </section>
      {/* <!-- Suggestion Section End --> */}

      {/* <!-- New Section Start --> */}
      <section className='new ff-poppins mb-5' id='new'>
        <div className='title-section py-3 px-3 mb-5'>
          <h2 className='fw-semibold'>New Recipe</h2>
        </div>
        {newRecipes.isLoading ? (
          <div className='d-flex flex-column align-items-center'>
            <div className='spinner-grow text-warning' role='status'></div>
            <span className='text-warning mt-1'>Loading</span>
          </div>
        ) : null}
        {newRecipes.isSuccess
          ? newRecipes.data?.map((items) => {
              return (
                <div className='row mx-0' key={items.id_recipe}>
                  <div className='left col-12 col-md-6 d-flex justify-content-center'>
                    <div className='new-decoration'></div>
                    <img src={items.photo} alt='img-new-recipe' className='mb-3 img-new' />
                  </div>
                  <div className='right col-12 col-md-6 d-flex flex-column justify-content-center align-items-center'>
                    <div>
                      <h1 className='mb-md-4 mb-xl-5'>{items.title}</h1>
                      <p className='mb-md-4 mb-xl-5'>
                        <span className='fw-medium'>Ingredients:</span>
                        <br />
                        {items.ingredients}
                      </p>
                      <Link to='/login' className='btn background-primary text-white justify-content-start'>
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
        {newRecipes.isError ? <div className='text-center'>{newRecipes?.errorMessage}</div> : null}
      </section>
      {/* <!-- New Section End --> */}

      {/* <!-- Popular Section Start --> */}
      <section className='popular ff-poppins mb-5' id='popular'>
        <div className='title-section py-3 px-3 mb-5'>
          <h2 className='fw-semibold'>Latest Recipe</h2>
        </div>
        <div className='container-fluid wrapper-popular'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
            {latestRecipes?.isLoading ? (
              <div className='d-flex flex-column align-items-center'>
                <div className='spinner-grow text-warning' role='status'></div>
                <span className='text-warning mt-1'>Loading</span>
              </div>
            ) : null}
            {latestRecipes.isSuccess
              ? latestRecipes.data.map((items) => {
                  return (
                    <div className='col' key={items.id_recipe}>
                      <Link to='/login'>
                        <div className='card'>
                          <p className='title text-dark fw-bold'>{items.title}</p>
                          <img src={items.photo} className='card-img-top' alt='image-recipe' />
                        </div>
                      </Link>
                    </div>
                  );
                })
              : null}
            {latestRecipes.isError ? <div className='text-center'>{latestRecipes.errorMessage}</div> : null}
          </div>
        </div>
      </section>
      {/* <!-- Popular Section End --> */}

      <Footer />
    </>
  );
}
