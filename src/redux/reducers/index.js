import { combineReducers } from 'redux';
import questions from './gameReducer';
import player from './playerReducer';
import token from './tokenReducer';
import userPictureURL from './userURLReducer';
import answerSelected from './aswerSelected';
import isNextVisible from './ButtonNextReducer';

const rootReducer = combineReducers({
  player,
  token,
  questions,
  answerSelected,
  userPictureURL,
  isNextVisible,
});

export default rootReducer;
