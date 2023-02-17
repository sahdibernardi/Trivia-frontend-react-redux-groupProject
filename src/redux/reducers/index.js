import { combineReducers } from 'redux';
import player from './player';
import timer from './timer';
import question from './question';
import settings from './settings';

const reducer = combineReducers({ player, timer, question, settings });

export default reducer;
