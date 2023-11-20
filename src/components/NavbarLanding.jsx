// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/utility.css';
import '../assets/styles/navbar.css';

export default function NavbarLanding() {
  window.onscroll = () => {
    scrollFunction();
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
      <nav className='navbar fixed-top navbar-expand-md navbar-light bg-transparent ff-poppins' id='navbar'>
        <div className='container-fluid'>
          <a className='navbar-brand d-md-none' href='/index.html'>
            <span>Food Recipe</span>
          </a>
          <button className='navbar-toggler collapsed bg-light' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav' aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-lg-5 ms-md-5'>
              <li className='nav-item me-5'>
                <Link to='/register' className='nav-link' aria-current='page'>
                  <span>Register</span>
                </Link>
              </li>
              <li className='nav-item me-5'>
                <Link to='/login' className='nav-link'>
                  <span>Login</span>
                </Link>
              </li>
              <li className='nav-item me-5'>
                <a className='nav-link' href='/searchRecipes.html'>
                  <span className='active'>Search Recipes</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
