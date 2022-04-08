import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import auth from './auth';
import profile from './profile';
import bookmark from '../bookmark';

const reducer = (history: History<any>) =>
  combineReducers({ auth, profile, bookmark, router: connectRouter(history) });

export default reducer;
