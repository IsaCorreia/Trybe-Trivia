import { combineReducers } from 'redux';
import questions from './gameReducer';
import player from './playerReducer';
import token from './tokenReducer';

const rootReducer = combineReducers({
  player,
  token,
  questions,
});

export default rootReducer;
