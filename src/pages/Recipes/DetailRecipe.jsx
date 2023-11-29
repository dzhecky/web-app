// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';

import { getComments, postComments } from '../../redux/actions/comments';
import { getDetailRecipe, getCountRecipes, postEvent } from '../../redux/actions/recipes';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import '../../assets/styles/utility.css';
import '../../assets/styles/detailRecipe.css';
import iconBookmark from '../../../public/bookmark.svg';
import iconLike from '../../../public/like.svg';

export default function DetailRecipe() {
  const { id } = useParams();
  const [formComment, setFormComment] = useState({
    id_recipe: id,
    comment: '',
  });

  // pagination comments
  const [pageComments, setPageComments] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [limitComments, setLimitComments] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const comments = useSelector((state) => state.comments);
  const detailRecipe = useSelector((state) => state.detailRecipe);
  const countRecipes = useSelector((state) => state.countRecipes);

  useEffect(() => {
    showDate();
    dispatch(getCountRecipes(detailRecipe.data?.uuid_author));
    dispatch(getComments(id, pageComments, limitComments));
    dispatch(getDetailRecipe(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailRecipe.data?.uuid_author, id, pageComments, limitComments]);

  const changePage = (data) => {
    let currentPage = data.selected + 1;
    setPageComments(currentPage);
  };

  const onChangeInput = (e, field) => {
    setFormComment({
      ...formComment,
      [field]: e,
    });
    console.log(formComment);
  };

  const onSubmitComment = (e) => {
    e.preventDefault();

    if (formComment.comment === '') {
      Swal.fire({
        title: 'Failed!',
        text: `Comment is required`,
        icon: 'error',
      });
    } else {
      let data = {
        id_recipe: formComment.id_recipe,
        comment: formComment.comment,
      };
      dispatch(postComments(data));
      setFormComment({
        ...formComment,
        comment: '',
      });
    }
  };

  const handleEvent = (eventStatus) => {
    let data = {
      recipes_id: id,
      status: eventStatus,
    };
    dispatch(postEvent(data, navigate));
  };

  const clearFormComments = () => {
    document.getElementById('text-area-comments').value = '';
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
      {/* <!-- Hero Section Start --> */}
      <header className='container d-sm-flex align-items-center justify-content-between ff-poppins' id='hero'>
        <div className='d-flex align-items-center' id='users-avatar'>
          <span className='me-3 line-photo-user'></span>
          <img src={detailRecipe.data?.photo_author} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
          <div className='d-flex flex-column ms-3 h-100 justify-content-center'>
            <p className='mb-0 fw-medium'>{detailRecipe.data?.author}</p>
            <p className='text-recipe mb-0'>{countRecipes?.data.count} Recipes</p>
          </div>
        </div>
        <div className='text-sm-end text-sm-start fw-medium pt-3 ps-4' id='users-status'>
          <p className='my-0 fw-medium' id='date'></p>
          <p className='my-0 fw-medium'>
            {detailRecipe.data?.like} Likes - {comments?.data?.pagination?.totalRows} Comments
          </p>
        </div>
      </header>
      <section className='container detail-menu ff-poppins' id='detail-recipes'>
        <h1 className='text-center color-blue mt-5'>{detailRecipe.data?.title}</h1>
        <img src={detailRecipe.data?.photo} alt='detail-menu' className='rounded mx-auto d-block mt-5' />
        <div className='list-ingredients'>
          <h4 className='mt-3'>Ingredients:</h4>
          <ul>
            {detailRecipe.data?.ingredients?.map((items, index) => {
              return <li key={index}>- {items}</li>;
            })}
          </ul>
        </div>
      </section>
      {/* <!-- Comments Start --> */}
      <section className='container mt-5 ps-2 ff-poppins' id='section-comments'>
        <button className='btn-bookmark background-primary me-3' onClick={() => handleEvent('bookmark')}>
          <img src={iconBookmark} alt='bookmark' />
        </button>
        <button className='btn-like' onClick={() => handleEvent('like')}>
          <img src={iconLike} alt='like' />
        </button>
        <div className='box-comments mt-3'>
          {comments?.data?.data?.map((items) => {
            return (
              <div className='comments d-flex align-items-center mb-5 flex-wrap' key={items.id_comment}>
                <img src={items?.photo} alt='users-photo' width='64' height='64' className='d-inline-blok rounded-circle object-fit-cover ms-0' />
                <div className='commentators d-flex flex-column ms-3 h-100 justify-content-center'>
                  <p className='mb-0 fw-medium'>{items?.commenter}</p>
                  <p className='text-recipe mb-0'>{items?.total_recipes} Recipes</p>
                </div>
                <span className='ms-4 me-4 line-photo-user'></span>
                <p className='mb-0 fw-medium'>{items?.commentar}</p>
              </div>
            );
          })}
          <div className='container d-flex flex-column justify-content-center gap-2 mt-5' id='paging'>
            <span className='color-grey align-self-center'>Total Comments {comments?.data?.pagination?.totalRows} Comments</span>
            <span className='color-grey align-self-center'>
              Page {comments?.data?.pagination?.currentPage} of {comments?.data?.pagination?.totalPage}
            </span>
            <div className='container d-flex justify-content-center gap-4'>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                breakLabel={'...'}
                pageCount={Math.min(10, comments?.data?.pagination?.totalPage)}
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
        </div>
      </section>
      {/* <!-- Comments End --> */}

      {/* <!-- Create Comments Start --> */}
      <section className='container ff-poppins' id='create-comments'>
        <form onSubmit={onSubmitComment}>
          <div className='form-comment'>
            <textarea className='form-control py-4 px-4' id='text-area-comments' placeholder='Your comment here' rows='7' cols='70' name='comment' onChange={(e) => onChangeInput(e.target.value, 'comment')}></textarea>
            <button type='submit' className='btn btn-comment' onClick={clearFormComments}>
              Send a comment
            </button>
          </div>
        </form>
      </section>
      {/* <!-- Create Comments End --> */}
      <Footer />
    </div>
  );
}
