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
});

export default rootReducers;
