import { Route, Routes, HashRouter } from 'react-router-dom';

// pages
import Landing from './pages/Landing';
import Register from './pages/Register/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import DetailRecipe from './pages/Recipes/DetailRecipe';
import AddRecipe from './pages/Recipes/AddRecipe';
import EditRecipe from './pages/Recipes/EditRecipe';
import SearchRecipes from './pages/Recipes/SearchRecipes';
import Auth from './components/Auth';
import IsLogin from './components/IsLogin';
import Profile from './pages/Profile/Profile';
import ChangePassword from './pages/Profile/ChangePassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route
            path='/register'
            element={
              <IsLogin>
                <Register />
              </IsLogin>
            }
          />
          <Route
            path='/login'
            element={
              <IsLogin>
                <Login />
              </IsLogin>
            }
          />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route
            path='/home'
            element={
              <Auth>
                <Home />
              </Auth>
            }
          />
          <Route
            path='/recipe-detail/:id'
            element={
              <Auth>
                <DetailRecipe />
              </Auth>
            }
          />
          <Route
            path='/add-recipe'
            element={
              <Auth>
                <AddRecipe />
              </Auth>
            }
          />
          <Route
            path='/edit-recipe/:id'
            element={
              <Auth>
                <EditRecipe />
              </Auth>
            }
          />
          <Route
            path='/search-recipes'
            element={
              <Auth>
                <SearchRecipes />
              </Auth>
            }
          />
          <Route
            path='/profile/:id'
            element={
              <Auth>
                <Profile />
              </Auth>
            }
          />

          <Route
            path='/change-password/:id'
            element={
              <Auth>
                <ChangePassword />
              </Auth>
            }
          />

          <Route path='/reset-password' element={<ResetPassword />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
