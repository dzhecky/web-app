// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { getCategory } from '../../redux/actions/category';
import { getAllRecipes } from '../../redux/actions/recipes';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/searchRecipes.css';

export default function SearchRecipes() {
  const [page, setPage] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [keyword, setKeyword] = useState('');
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [idCategory, setIdCategory] = useState();
  const [popular, setPopular] = useState();
  const [toggleBtnCategory, setToggleBtnCategory] = useState();

  const dispatch = useDispatch();
  const category = useSelector((state) => state.category);
  const allRecipes = useSelector((state) => state.allRecipes);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCategory());
    dispatch(getAllRecipes(keyword, page, limit, idCategory, popular));
  }, [dispatch, page, keyword, idCategory, limit, popular]);

  const changePage = (data) => {
    setKeyword('');
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

  const handleCategory = (id_category) => {
    setToggleBtnCategory(id_category);
    setKeyword('');
    setPage(0);
    setIdCategory(id_category);
    setPopular('');
  };

  const handleNewRecipes = (index) => {
    setToggleBtnCategory(index);
    setKeyword('');
    setPage(0);
    setIdCategory('');
    setPopular('');
  };

  const handlePopular = (index) => {
    setToggleBtnCategory(index);
    setKeyword('');
    setPage(0);
    setIdCategory('');
    setPopular('popular');
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
            <button className={toggleBtnCategory === 3 ? 'btn background-primary color-white px-3 btn-active' : 'btn background-primary color-white px-3'} onClick={() => handleNewRecipes(3)}>
              New
            </button>
            <button className={toggleBtnCategory === 4 ? 'btn background-primary color-white px-3 btn-active' : 'btn background-primary color-white px-3'} onClick={() => handlePopular(4)}>
              Popular
            </button>
            {category.data?.map((items) => {
              return (
                <button
                  className={toggleBtnCategory === items.id_category ? 'btn background-green color-white px-3 btn-active' : 'btn background-green color-white px-3'}
                  key={items.id_category}
                  value={items.id_category}
                  onClick={() => handleCategory(items.id_category)}
                >
                  {items.name}
                </button>
              );
            })}
          </div>
        </section>
        {/* <!-- Hero Section End--> */}

        <section className='menu-search-recipes row g-0' id='recipes'>
          {allRecipes.data?.data.length !== 0 ? (
            <div className='content-left-search col-md-11' id='result-recipes'>
              {allRecipes.isLoading ? (
                <div className='d-flex flex-column align-items-center'>
                  <div className='spinner-grow text-warning' role='status'></div>
                  <span className='text-warning mt-1'>Loading</span>
                </div>
              ) : null}
              {allRecipes.isSuccess
                ? allRecipes.data?.data?.map((items) => {
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
                                  <span>{items.liked} Likes</span>
                                  <span>-</span>
                                  <span>{items.comments} Comment</span>
                                  <span>-</span>
                                  <span>{items.bookmark} bookmark</span>
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
                  })
                : null}
            </div>
          ) : (
            <div className='text-center'>
              <h1 className='mt-5'>{allRecipes?.data?.message}</h1>
            </div>
          )}

          <div className='content-right col-1 d-md-flex flex-column d-sm-none'>
            <div className='h-50 background-primary align-self-end line-decoration'></div>
            <div className='h-50 background-primary align-self-end line-decoration'></div>
          </div>
          {allRecipes.data?.data.length !== 0 ? (
            <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
              <span className='color-grey align-self-center'>Total Recipes {allRecipes.data?.data?.length > 0 ? allRecipes.data?.pagination.totalRows : 0} Recipes</span>
              <span className='color-grey align-self-center'>
                Page {allRecipes.data?.pagination.currentPage} of {allRecipes.data?.pagination.currentPage ? allRecipes.data?.pagination.totalPage : 0}
              </span>
              <span className='color-grey align-self-center'>{message}</span>
              <div className='container d-flex justify-content-center gap-4 mb-5' key={allRecipes.data?.pagination.totalPage}>
                <ReactPaginate
                  previousLabel={'Prev'}
                  nextLabel={'Next'}
                  breakLabel={'...'}
                  pageCount={Math.min(10, allRecipes.data?.pagination.currentPage ? allRecipes.data?.pagination.totalPage : 0)}
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
          ) : null}
        </section>
      </div>
      <Footer />
    </div>
  );
}
