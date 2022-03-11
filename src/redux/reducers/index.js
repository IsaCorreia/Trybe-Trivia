import { combineReducers } from 'redux';
import player from './playerReducer';
import token from './tokenReducer';
import questions from './gameReducer'

const rootReducer = combineReducers({
  player,
  token,
  questions,
});

export default rootReducer;
