// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/searchRecipes.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function SearchRecipes() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const getAllRecipe = () => {
    let recipeUrl = `/recipe?search=${keyword}&page=${page}&limit=${limit}`;

    axios
      .get(base_url + recipeUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.data.length === 0) {
          Swal.fire({
            title: 'Failed!',
            text: `error :  ${res.data.message} `,
            icon: 'error',
          });
        }
        setData(res.data.data);
        setPage(res.data.pagination.currentPage);
        setPages(res.data.pagination.totalPage);
        setRows(res.data.pagination.totalRows);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log('axios get all recipe');
  };

  useEffect(() => {
    getAllRecipe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, keyword]);

  const changePage = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
    if (currentPage === 10) {
      setMessage(`If you don't find the recipe you are looking for, please enter specific keywords`);
    } else {
      setMessage('');
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setKeyword(query);
  };

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
          <form onSubmit={searchData}>
            <div className='d-flex mt-3 search-recipes'>
              <input type='search' className='form-control' placeholder='Search Recipes' value={query} onChange={(e) => setQuery(e.target.value)} />
              <button type='submit' className='btn background-primary color-white ms-3'>
                Search
              </button>
            </div>
          </form>
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
                        <img src={items.photo} className='img-fluid rounded w-100 h-100 object-fit-cover' alt='img-recipe' />
                      </div>
                      <div className='container col-md-6 p-0'>
                        <div className='ms-md-4 card-body ps-1 pt-md-0 d-flex flex-column justify-content-between h-100'>
                          <h3 className='card-title mb-4 color-grey fw-medium'>{items.title}</h3>
                          <p className='card-text fw-medium mb-3 color-grey'>
                            <span className='fw-semibold'>Ingredients: </span> <br />
                            {items.ingredients.join(', ')}
                          </p>
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
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <span className='color-grey align-self-center'>Total Recipes {rows} Recipes</span>
            <span className='color-grey align-self-center'>
              Page {page} of {pages}
            </span>
            <span className='color-grey align-self-center'>{message}</span>
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, pages)}
                onPageChange={changePage}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                previousClassName={'page-item'}
                previousLinkClassName={'page-link background-primary text-white'}
                nextClassName={'page-item'}
                nextLinkClassName={'page-link background-primary text-white'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                activeClassName={'active'}
              />
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
