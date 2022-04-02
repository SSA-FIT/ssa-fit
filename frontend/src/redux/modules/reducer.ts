import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import history from '../../history';
import auth from './auth';
import bookmark from '../bookmark';

const reducer = (history: History<any>) =>
  combineReducers({ auth, bookmark, router: connectRouter(history) });

export default reducer;
