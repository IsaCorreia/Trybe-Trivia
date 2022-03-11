import { combineReducers } from 'redux';
import player from './playerReducer';
import token from './tokenReducer';
import trivia from './gameReducer'

const rootReducer = combineReducers({
  player,
  token,
  trivia,
});

export default rootReducer;
