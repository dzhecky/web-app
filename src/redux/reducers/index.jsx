import { combineReducers } from 'redux';
import suggestionsRecipes from './suggestionsRecipes';
import newRecipes from './newRecipes';
import latestRecipes from './latestRecipes';
import myRecipes from './myRecipes';
import myBookmark from './myBookmark';
import myLike from './myLike';
import detailUser from './detailUser';
import deleteBookmark from './deleteBookmark';
import deleteMyLike from './deleteMyLike';
import category from './category';
import addRecipes from './addRecipes';
import detailRecipe from './detailRecipe';
import editRecipe from './editRecipe';
import authLogin from './authLogin';
import authLogout from './authLogout';
import allRecipes from './allRecipes';
import comments from './comments';
import countRecipes from './countRecipes';
import addBookmarkOrLike from './addBookmarkOrLike';
import addComments from './addComments';
import authRegister from './authRegister';
import authForgotPassword from './authForgotPassword';
import authResetPassword from './authResetPassword';
import editProfile from './editProfile';
import changePassword from './changePassword';
import putPassword from './putPassword';

const rootReducers = combineReducers({
  suggestionsRecipes,
  newRecipes,
  latestRecipes,
  myRecipes,
  myBookmark,
  myLike,
  detailUser,
  deleteBookmark,
  deleteMyLike,
  category,
  addRecipes,
  detailRecipe,
  editRecipe,
  authLogin,
  authLogout,
  allRecipes,
  comments,
  countRecipes,
  addBookmarkOrLike,
  addComments,
  authRegister,
  authForgotPassword,
  authResetPassword,
  editProfile,
  changePassword,
  putPassword,
});

export default rootReducers;
