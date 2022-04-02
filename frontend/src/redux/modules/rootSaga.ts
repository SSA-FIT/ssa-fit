import { all } from 'redux-saga/effects';
import { bookmarkSaga } from '../bookmark';
import { authSaga } from './auth';

export default function* rootSaga() {
  yield all([authSaga(), bookmarkSaga()]);
}
