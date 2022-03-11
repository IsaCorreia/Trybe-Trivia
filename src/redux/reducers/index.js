import { combineReducers } from 'redux';
import player from './playerReducer';
import token from './tokenReducer';
import userPictureURL from './userURLReducer'

const rootReducer = combineReducers({
  player,
  token,
  userPictureURL,
});

export default rootReducer;
