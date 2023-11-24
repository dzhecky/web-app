// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import '../assets/styles/utility.css';
import '../assets/styles/navbar.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function Navbar() {
  const [userLogin, setUserLogin] = useState();

  useEffect(() => {
    let detailUserUrl = `/users/${localStorage.getItem('uuid')}`;

    axios
      .get(base_url + detailUserUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        setUserLogin(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('axios get detail user');
  }, []);

  const handleLogout = () => {
    setUserLogin(null);
    localStorage.clear();
    return;
  };

  // Scroll Handler
  function scrollFunction() {
    let navbarTogglerStatus = document.querySelector('.navbar-toggler').classList.contains('collapsed');

    if (navbarTogglerStatus) {
      if (document.documentElement.scrollTop > 100) {
        changeNavbarBg();
      } else {
        changeNavbarBgTransparent();
      }
    }
  }

  function changeNavbarBg() {
    document.getElementById('navbar').classList.remove('bg-transparent');
    document.getElementById('navbar').classList.add('bg-white');
    document.getElementById('navbar').classList.add('nav-shadow');
  }

  function changeNavbarBgTransparent() {
    document.getElementById('navbar').classList.remove('bg-white');
    document.getElementById('navbar').classList.remove('nav-shadow');
    document.getElementById('navbar').classList.add('bg-transparent');
  }

  return (
    <div>
      <nav className='navbar fixed-top navbar-expand-md navbar-light bg-transparent ff-poppins p-md-0 p-sm-2' id='navbar'>
        <div className='container-fluid'>
          <a className='navbar-brand d-md-none' href='/index.html'>
            <span>Food Recipe</span>
          </a>
          <button
            className='navbar-toggler collapsed bg-light'
            onScroll={
              (window.onscroll = () => {
                scrollFunction();
              })
            }
            onClick={changeNavbarBg}
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5 ms-md-5'>
              <li className='nav-item me-5'>
                <NavLink to='/home' className='nav-link' aria-current='page'>
                  Home
                </NavLink>
              </li>
              <li className='nav-item me-5'>
                <NavLink to='/add-recipe' className='nav-link'>
                  Add Recipe
                </NavLink>
              </li>
              <li className='nav-item me-5'>
                <NavLink to='/search-recipes' className='nav-link' href='./searchRecipes.html'>
                  Search Recipes
                </NavLink>
              </li>
            </ul>
            <span className='me-3 line-photo'></span>
            <div className='contianer d-flex' id='users-logged'>
              <Link to='/home'>
                <img src={userLogin?.photo} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover' />
              </Link>
              <div className='d-flex-column ms-3 me-5 py-2'>
                <p className='mb-0 fw-medium'>{userLogin?.name}</p>
                <Link to='/' className='nav-link text-logout' onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
