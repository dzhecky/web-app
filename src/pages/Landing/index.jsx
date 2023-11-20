import NavbarLanding from '../../components/NavbarLanding';
import Footer from '../../components/Footer';
import icSearch from '../../assets/icon/search.svg';
import heroImg from '../../assets/image/detail-menu.jpg';
import ellipse from '../../assets/icon/Ellipse 114.svg';
import suggestionImg from '../../assets/image/img-suggestion.jpg';
import newRecipeImg from '../../assets/image/new-recipe.jpg';
import popular from '../../assets/image/popular-1.jpg';
import '../../assets/styles/utility.css';
import '../../assets/styles/landing.css';

export default function Landing() {
  return (
    <>
      <NavbarLanding />
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
        <div className='row mx-0'>
          <div className='left col-12 col-md-6 d-flex justify-content-center'>
            <div className='ellipse d-none d-md-flex'>
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
              <img src={ellipse} alt='Ellipse' className='img-elipse' />
            </div>
            <img src={suggestionImg} alt='img-suggestion' className='mb-3 img-suggestion' />
            <div className='rectangle'></div>
          </div>
          <div className='right col-12 col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <div>
              <h1 className='mb-md-4 mb-xl-5'>Healthy Bone Broth Ramen (Quick & Easy)</h1>
              <p className='mb-md-4 mb-xl-5'>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
              <a href='/detailRecipe.html' className='btn background-primary text-white justify-content-start'>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Suggestion Section End --> */}

      {/* <!-- New Section Start --> */}
      <section className='new ff-poppins mb-5' id='new'>
        <div className='title-section py-3 px-3 mb-5'>
          <h2 className='fw-semibold'>New Recipe</h2>
        </div>
        <div className='row mx-0'>
          <div className='left col-12 col-md-6 d-flex justify-content-center'>
            <div className='new-decoration'></div>
            <img src={newRecipeImg} alt='img-new-recipe' className='mb-3 img-new' />
          </div>
          <div className='right col-12 col-md-6 d-flex flex-column justify-content-center align-items-center'>
            <div>
              <h1 className='mb-md-4 mb-xl-5'>Healthy Bone Broth Ramen (Quick & Easy)</h1>
              <p className='mb-md-4 mb-xl-5'>Quick + Easy Chicken Bone Broth Ramen- Healthy chicken ramen in a hurry? That’s right!</p>
              <a href='/detailRecipe.html' className='btn background-primary text-white justify-content-start'>
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- New Section End --> */}

      {/* <!-- Popular Section Start --> */}
      <section className='popular ff-poppins mb-5' id='popular'>
        <div className='title-section py-3 px-3 mb-5'>
          <h2 className='fw-semibold'>Popular Recipe</h2>
        </div>
        <div className='container-fluid wrapper-popular'>
          <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4'>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card'>
                  <p className='title text-dark fw-medium'>Chicken Kare</p>
                  <img src={popular} className='card-img-top' alt='Chicken-Kare' />
                </div>
              </a>
            </div>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card align-items-center'>
                  <p className='title text-dark fw-medium'>Bomb Chiken</p>
                  <img src='/assets/image/popular-2.jpg' className='card-img-top' alt='Bomb-Chiken' />
                </div>
              </a>
            </div>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card align-items-center'>
                  <p className='title text-dark fw-medium'>Banana Smothie Pop</p>
                  <img src='/assets/image/popular-3.jpg' className='card-img-top' alt='Banana-Smothie-Pop' />
                </div>
              </a>
            </div>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card align-items-center'>
                  <p className='title text-dark fw-medium'>Coffee Lava Cake</p>
                  <img src='/assets/image/popular-4.jpg' className='card-img-top' alt='Coffee-Lava-Cake' />
                </div>
              </a>
            </div>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card align-items-center'>
                  <p className='title text-dark fw-medium'>Sugar Salmon</p>
                  <img src='/assets/image/popular-5.jpg' className='card-img-top' alt='Sugar-Salmon' />
                </div>
              </a>
            </div>
            <div className='col'>
              <a href='/detailRecipe.html'>
                <div className='card align-items-center'>
                  <p className='title text-dark fw-medium'>Indian Salad</p>
                  <img src='/assets/image/popular-6.jpg' className='card-img-top' alt='Indian-Salad' />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Popular Section End --> */}

      <Footer />
    </>
  );
}
