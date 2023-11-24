// eslint-disable-next-line no-unused-vars
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import Swal from 'sweetalert2';
import Paginations from '../../components/Paginations';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/home.css';

const base_url = import.meta.env.VITE_BASE_URL;

export default function Home() {
  const [userLogin, setUserLogin] = useState();
  const [data, setData] = useState([]);
  const [bookmark, setBookmark] = useState([]);
  const [like, setLike] = useState([]);
  const [page, setPage] = useState(0);
  const [pageBookmark, setPageBookmark] = useState(0);
  const [pageLike, setPageLike] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(5);
  const [pages, setPages] = useState(0);
  const [pagesBookmark, setPagesBookmark] = useState(0);
  const [pagesLike, setPagesLike] = useState(0);
  const [rows, setRows] = useState(0);
  const [rowsBookmark, setRowsBookmark] = useState(0);
  const [rowsLike, setRowsLike] = useState(0);
  const [toggleTabs, setToggleTabs] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    showDate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const getMyRecipes = () => {
    let menuUrl = `/recipe/show/myrecipes?page=${page}&limit=${limit}`;

    axios
      .get(base_url + menuUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setData(res.data.data);
        setPage(res.data.pagination.currentPage);
        setPages(res.data.pagination.totalPage);
        setRows(res.data.pagination.totalRows);
      })
      .catch((err) => console.log(err));
  };

  const getBookmarked = () => {
    let menuUrl = `event/bookmarked?page=${pageBookmark}&limit=${limit}`;

    axios
      .get(base_url + menuUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setBookmark(res.data.data);
        setPageBookmark(res.data.pagination.currentPage);
        setPagesBookmark(res.data.pagination.totalPage);
        setRowsBookmark(res.data.pagination.totalRows);
      })
      .catch((err) => console.log(err));
  };

  const getLiked = () => {
    let menuUrl = `event/liked?page=${pageLike}&limit=${limit}`;

    axios
      .get(base_url + menuUrl, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        // console.log(res);
        setLike(res.data.data);
        setPageLike(res.data.pagination.currentPage);
        setPagesLike(res.data.pagination.totalPage);
        setRowsLike(res.data.pagination.totalRows);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMyRecipes();
    getBookmarked();
    getLiked();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, page, pageBookmark, pageLike]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  const deleteRecipe = (id) => {
    axios
      .delete(base_url + `/recipe/${id}`, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
        });
        getMyRecipes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBookmark = (id) => {
    axios
      .delete(base_url + `/event/bookmark/${id}`, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
        });
        getBookmarked();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteLike = (id) => {
    axios
      .delete(base_url + `/event/like/${id}`, {
        headers: {
          token: `${localStorage.getItem('token')}`,
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: 'Success!',
          text: res.data.message,
          icon: 'success',
        });
        getLiked();
      })
      .catch((err) => {
        console.log(err);
      });
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
        deleteRecipe(id);
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
        deleteBookmark(id);
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
        deleteLike(id);
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
    getMyRecipes();
    getBookmarked();
    getLiked();
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
            <img src={userLogin?.photo} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
            <div className='d-flex flex-column ms-3 h-100 justify-content-center'>
              <p className='mb-0 fw-medium'>{userLogin?.name}</p>
              <p className='text-recipe mb-0'>{rows} Recipes</p>
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
              {data?.map((items) => {
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
                            <span>10 Likes</span>
                            <span>-</span>
                            <span>12 Comment</span>
                            <span>-</span>
                            <span>3 bookmark</span>
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
              })}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations rows={rows} page={page} pages={pages} />
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
        {/* <!-- Recipes End --> */}

        {/* Bookmarked Start */}
        <section className={toggleTabs === 2 ? 'menu-recipes container active-content' : 'menu-recipes container'} id='recipes'>
          <div className='content-left' id='my-recipes'>
            <div className='card mb-3 mt-5 card-menu border-0'>
              {bookmark?.map((items) => {
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
                            <span>10 Likes</span>
                            <span>-</span>
                            <span>12 Comment</span>
                            <span>-</span>
                            <span>3 bookmark</span>
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
              })}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations rows={rowsBookmark} page={pageBookmark} pages={pagesBookmark} />
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, pagesBookmark)}
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
              {like?.map((items) => {
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
                            <span>10 Likes</span>
                            <span>-</span>
                            <span>12 Comment</span>
                            <span>-</span>
                            <span>3 bookmark</span>
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
              })}
            </div>
          </div>
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5 mb-5' id='paging'>
            <Paginations rows={rowsLike} page={pageLike} pages={pagesLike} />
            <div className='container d-flex justify-content-center gap-4 mb-5'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, pagesLike)}
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
