import { combineReducers } from 'redux';
import questions from './gameReducer';
import player from './playerReducer';
import token from './tokenReducer';
import userPictureURL from './userURLReducer';
import answerSelected from './aswerSelected';
import isNextVisible from './ButtonNextReducer';
import timerInfo from './timerReducer';

const rootReducer = combineReducers({
  player,
  token,
  questions,
  answerSelected,
  userPictureURL,
  isNextVisible,
  timerInfo,
});

export default rootReducer;
