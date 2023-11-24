// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
export default function Paginations({ rows, page, pages }) {
  return (
    <>
      <span className='color-grey align-self-center'>Total Recipes {rows} Recipes</span>
      <span className='color-grey align-self-center'>
        Page {page} of {pages}
      </span>
    </>
  );
}
