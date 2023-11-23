import { Route, Routes, BrowserRouter } from 'react-router-dom';

// pages
import Landing from './pages/Landing';
// import Register from './pages/register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import DetailRecipe from './pages/Recipes/DetailRecipe';
import AddRecipe from './pages/Recipes/AddRecipe';
import EditRecipe from './pages/Recipes/EditRecipe';
import SearchRecipes from './pages/Recipes/SearchRecipes';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
          {/* <Route path='/register' element={<Register />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/recipe-detail/:id' element={<DetailRecipe />} />
          <Route path='/add-recipe' element={<AddRecipe />} />
          <Route path='/edit-recipe/:id' element={<EditRecipe />} />
          <Route path='/search-recipes' element={<SearchRecipes />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
