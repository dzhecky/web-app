import React from 'react';
import '../assets/styles/utility.css';
import '../assets/styles/footer.css';

export default function Footer() {
  return (
    <div>
      <footer className='ff-poppins background-primary color-blue mt-5' id='footer'>
        <div className='top'>
          <h1 className='display-5 mb-4 fw-medium'>Eat, Cook, Repeat</h1>
          <p className='mx-3 text-center color-grey fw-medium'>Share your best recipe by uploading here !</p>
        </div>
        <div className='bottom'>
          <ul className='m-0 p-0'>
            <li>
              <a className='color-grey' href='#'>
                Product
              </a>
            </li>
            <li>
              <a className='color-grey' href='#'>
                Company
              </a>
            </li>
            <li>
              <a className='color-grey' href='#'>
                Learn More
              </a>
            </li>
            <li>
              <a className='color-grey' href='#'>
                Get In Touch
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}
