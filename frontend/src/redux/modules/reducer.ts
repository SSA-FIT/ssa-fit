import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { History } from 'history';
import history from '../../history';
import auth from './auth';
import profile from './profile';

const reducer = (history: History<any>) =>
  combineReducers({ auth, profile, router: connectRouter(history) });

export default reducer;
