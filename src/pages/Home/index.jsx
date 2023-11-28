// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import Paginations from '../../components/Paginations';
import { useSelector, useDispatch } from 'react-redux';

import { getMyRecipes, getMyBookmark, getMyLike, deleteMyRecipe, deleteMyBookmark, deleteMyLike } from '../../redux/actions/home';
import { getDetailUser } from '../../redux/actions/user';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/home.css';

export default function Home() {
  const [page, setPage] = useState(0);
  const [pageBookmark, setPageBookmark] = useState(0);
  const [pageLike, setPageLike] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [toggleTabs, setToggleTabs] = useState(1);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const myRecipes = useSelector((state) => state.myRecipes);
  const myBookmark = useSelector((state) => state.myBookmark);
  const myLike = useSelector((state) => state.myLike);
  const detailUser = useSelector((state) => state.detailUser);

  useEffect(() => {
    dispatch(getMyRecipes(page, limit));
    dispatch(getMyBookmark(pageBookmark, limit));
    dispatch(getMyLike(pageLike, limit));
    dispatch(getDetailUser());
    showDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, pageBookmark, pageLike]);

  const changePage = (data) => {
    let currentPage = data.selected + 1;
    setPage(currentPage);
  };

  const changePageBookmark = (data) => {
    let currentPage = data.selected + 1;
    setPageBookmark(currentPage);
  };

  const changePageLike = (data) => {
    let currentPage = data.selected + 1;
    setPageLike(currentPage);
  };

  const handleDeleteRecipe = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to delete this recipe?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMyRecipe(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  const handleDeleteBookmark = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to delete this recipe from bookmarked?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMyBookmark(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  const handleDeleteLike = (id) => {
    Swal.fire({
      icon: 'warning',
      title: 'Confirmation',
      text: 'Are you sure want to delete this recipe from Liked?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteMyLike(id));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        return false;
      }
    });
  };

  const toDetailRecipe = (id) => {
    navigate(`/recipe-detail/${id}`);
  };

  const toEditRecipe = (id) => {
    navigate(`/edit-recipe/${id}`);
  };

  const toDetailPorifile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleTabActive = (index) => {
    setToggleTabs(index);
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
          {/* <a className='text-decoration-none text-dark'> */}
          <div className='d-flex align-items-center' id='users-avatar' onClick={() => toDetailPorifile(localStorage.getItem('uuid'))}>
            <span className='me-3 line-photo-user'></span>
            <img src={detailUser.data?.photo} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
            <div className='d-flex flex-column ms-3 h-100 justify-content-center'>
              <p className='mb-0 fw-medium'>{detailUser.data?.name}</p>
              <p className='text-recipe mb-0'>{myRecipes.data?.data.length !== 0 ? myRecipes.data?.pagination?.totalRows : 0} Recipes</p>
            </div>
          </div>
          {/* </a> */}
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
                  <p className={toggleTabs === 1 ? 'nav-link px-0 tab-active color-gray' : 'nav-link px-0 color-gray'} onClick={() => handleTabActive(1)}>
                    Recipes
                  </p>
                </h4>
              </li>
              <li className='nav-item'>
                <h4>
                  <p className={toggleTabs === 2 ? 'nav-link px-0 tab-active color-gray' : 'nav-link px-0 color-gray'} onClick={() => handleTabActive(2)}>
                    Bookmarked
                  </p>
                </h4>
              </li>
              <li className='nav-item'>
                <h4>
                  <p className={toggleTabs === 3 ? 'nav-link px-0 tab-active color-gray' : 'nav-link px-0 color-gray'} onClick={() => handleTabActive(3)}>
                    Liked
                  </p>
                </h4>
              </li>
            </ul>
          </div>
        </section>
        {/* <!-- Tab End --> */}

        {/* <!-- Recipes Start --> */}
        <section className={toggleTabs === 1 ? 'menu-recipes container active-content' : 'menu-recipes container'} id='recipes'>
          <div className='content-left' id='my-recipes'>
            <div className='card mb-3 mt-5 card-menu border-0'>
              {myRecipes.isLoading ? (
                <div className='d-flex flex-column align-items-center'>
                  <div className='spinner-grow text-warning' role='status'></div>
                  <span className='text-warning mt-1'>Loading</span>
                </div>
              ) : null}
              {myRecipes.isSuccess
                ? myRecipes.data?.data.length !== 0
                  ? myRecipes.data.data?.map((items) => {
                      return (
                        <div className='row g-0 mb-5' key={items.id_recipe}>
                          <div className='col-md-6' onClick={() => toDetailRecipe(items.id_recipe)}>
                            <img src={items.photo} className='img-fluid rounded w-100 img-my-recipes object-fit-cover' alt='image-recipe' />
                          </div>
                          <div className='container col-md-6 p-0 recipe-info'>
                            <div className='ms-md-4 card-body ps-1 pt-md-0 d-flex flex-column h-100 justify-content-between'>
                              <h3 className='card-title mb-4 color-grey fw-medium' onClick={() => toDetailRecipe(items.id_recipe)}>
                                {items.title}
                              </h3>
                              <p className='card-text fw-medium mb-3 color-grey'>
                                <span className='fw-semibold'>Ingredients:</span> <br />
                                {items.ingredients.join(', ')}
                              </p>
                              <a onClick={() => toDetailRecipe(items.id_recipe)} className='text-decoration-none text-dark'>
                                <div className='status d-flex background-primary text-white justify-content-around py-2 btn'>
                                  <span>{items.like} Likes</span>
                                  <span>-</span>
                                  <span>{items.comments} Comment</span>
                                  <span>-</span>
                                  <span>{items.bookmark} bookmark</span>
                                </div>
                              </a>
                              <div className='d-flex mt-4'>
                                <a className='btn btn-primary me-4' onClick={() => toEditRecipe(items.id_recipe)}>
                                  Edit Recipe
                                </a>
                                <button className='btn btn-danger' type='button' onClick={() => handleDeleteRecipe(items.id_recipe)}>
                                  Delete Recipe
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : myRecipes.data.message
                : null}
              {myRecipes.isError ? <div className='text-center'>{myRecipes?.errorMessage}</div> : null}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations
              rows={myRecipes.data?.data.length !== 0 ? myRecipes.data?.pagination?.totalRows : 0}
              page={myRecipes.data?.data.length !== 0 ? myRecipes.data?.pagination?.currentPage : 0}
              pages={myRecipes.data?.data.length !== 0 ? myRecipes.data?.pagination?.totalPage : 0}
            />
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, myRecipes.data?.pagination?.totalPage)}
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
        {/* <!-- Recipes End --> */}

        {/* Bookmarked Start */}
        <section className={toggleTabs === 2 ? 'menu-recipes container active-content' : 'menu-recipes container'} id='recipes'>
          <div className='content-left' id='my-recipes'>
            <div className='card mb-3 mt-5 card-menu border-0'>
              {myBookmark.isLoading ? (
                <div className='d-flex flex-column align-items-center'>
                  <div className='spinner-grow text-warning' role='status'></div>
                  <span className='text-warning mt-1'>Loading</span>
                </div>
              ) : null}
              {myBookmark.isSuccess
                ? myBookmark.data?.data.length !== 0
                  ? myBookmark.data.data?.map((items) => {
                      return (
                        <div className='row g-0 mb-5' key={items.id_recipe}>
                          <div className='col-md-6' onClick={() => toDetailRecipe(items.id_recipe)}>
                            <img src={items.photo} className='img-fluid rounded w-100 img-my-recipes object-fit-cover' alt='image-recipe' />
                          </div>
                          <div className='container col-md-6 p-0 recipe-info'>
                            <div className='ms-md-4 card-body ps-1 pt-md-0 d-flex flex-column h-100 justify-content-between'>
                              <h3 className='card-title mb-4 color-grey fw-medium' onClick={() => toDetailRecipe(items.id_recipe)}>
                                {items.title}
                              </h3>
                              <p className='card-text fw-medium mb-3 color-grey'>
                                <span className='fw-semibold'>Ingredients:</span> <br />
                                {items.ingredients.join(', ')}
                              </p>
                              <a onClick={() => toDetailRecipe(items.id_recipe)} className='text-decoration-none text-dark'>
                                <div className='status d-flex background-primary text-white justify-content-around py-2 btn'>
                                  <span>{items.like} Likes</span>
                                  <span>-</span>
                                  <span>{items.comments} Comment</span>
                                  <span>-</span>
                                  <span>{items.bookmark} bookmark</span>
                                </div>
                              </a>
                              <div className='d-flex mt-4'>
                                <button className='btn btn-danger' type='button' onClick={() => handleDeleteBookmark(items.id)}>
                                  Delete From Bookmark
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : myBookmark.data?.message
                : null}
              {myBookmark.isError ? <div className='text-center'>{myBookmark?.errorMessage}</div> : null}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations
              rows={myBookmark.data?.data.length !== 0 ? myBookmark.data?.pagination?.totalRows : 0}
              page={myBookmark.data?.data.length !== 0 ? myBookmark.data?.pagination?.currentPage : 0}
              pages={myBookmark.data?.data.length !== 0 ? myBookmark.data?.pagination?.totalPage : 0}
            />
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, myBookmark.data?.data.length !== 0 ? myBookmark.data?.pagination?.totalPage : 0)}
                onPageChange={changePageBookmark}
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
        {/* Bookmarked End */}

        {/* Liked Start */}
        <section className={toggleTabs === 3 ? 'menu-recipes container active-content' : 'menu-recipes container'} id='recipes'>
          <div className='content-left' id='my-recipes'>
            <div className='card mb-3 mt-5 card-menu border-0'>
              {myLike.isLoading ? (
                <div className='d-flex flex-column align-items-center'>
                  <div className='spinner-grow text-warning' role='status'></div>
                  <span className='text-warning mt-1'>Loading</span>
                </div>
              ) : null}
              {myLike.isSuccess
                ? myLike.data?.data.length !== 0
                  ? myLike.data.data?.map((items) => {
                      return (
                        <div className='row g-0 mb-5' key={items.id_recipe}>
                          <div className='col-md-6' onClick={() => toDetailRecipe(items.id_recipe)}>
                            <img src={items.photo} className='img-fluid rounded w-100 img-my-recipes object-fit-cover' alt='image-recipe' />
                          </div>
                          <div className='container col-md-6 p-0 recipe-info'>
                            <div className='ms-md-4 card-body ps-1 pt-md-0 d-flex flex-column h-100 justify-content-between'>
                              <h3 className='card-title mb-4 color-grey fw-medium' onClick={() => toDetailRecipe(items.id_recipe)}>
                                {items.title}
                              </h3>
                              <p className='card-text fw-medium mb-3 color-grey'>
                                <span className='fw-semibold'>Ingredients:</span> <br />
                                {items.ingredients.join(', ')}
                              </p>
                              <a onClick={() => toDetailRecipe(items.id_recipe)} className='text-decoration-none text-dark'>
                                <div className='status d-flex background-primary text-white justify-content-around py-2 btn'>
                                  <span>{items.like} Likes</span>
                                  <span>-</span>
                                  <span>{items.comments} Comment</span>
                                  <span>-</span>
                                  <span>{items.bookmark} bookmark</span>
                                </div>
                              </a>
                              <div className='d-flex mt-4'>
                                <button className='btn btn-danger' type='button' onClick={() => handleDeleteLike(items.id)}>
                                  Delete From Like
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : myLike.data.message
                : null}
              {myLike.isError ? <div className='text-center'>{myLike?.errorMessage}</div> : null}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations
              rows={myLike.data?.data.length !== 0 ? myLike.data?.pagination?.totalRows : 0}
              page={myLike.data?.data.length !== 0 ? myLike.data?.pagination?.currentPage : 0}
              pages={myLike.data?.data.length !== 0 ? myLike.data?.pagination?.totalPage : 0}
            />
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, myLike.data?.data.length !== 0 ? myLike.data?.pagination?.totalPage : 0)}
                onPageChange={changePageLike}
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
        {/* Liked End */}

        <Footer />
      </div>
    </div>
  );
}
