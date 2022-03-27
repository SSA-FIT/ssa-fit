import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import history from '../../history';
import auth from './auth';

const reducer = () => combineReducers({ auth, router: connectRouter(history) });

export default reducer;
