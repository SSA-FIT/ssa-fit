import { createActions, handleActions, Action } from 'redux-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import Swal from 'sweetalert2';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import {
  LogInApiResponse,
  LogInRequestIdCheck,
  LogInResponse,
} from '../../types/authTypes';

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = 'ssafit/auth';

export const { pending, success, fail } = createActions(
  'PENDING',
  'SUCCESS',
  'FAIL',
  { prefix },
);

const reducer = handleActions<AuthState, LogInResponse>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', { prefix });

function* loginSaga(action: Action<LogInRequestIdCheck>) {
  try {
    yield put(pending());

    const response: LogInApiResponse = yield call(UserService.userLogIn, {
      userId: action.payload.userId,
      password: action.payload.password,
    });

    const { token } = response;
    // localStorage
    TokenService.set(token);

    if (action.payload.idCheck) {
      localStorage.setItem('ssafit-id', action.payload.userId);
    } else {
      localStorage.removeItem('ssafit-id');
    }

    Swal.fire({
      icon: 'success',
      text: response.message,
      showConfirmButton: false,
      timer: 1500,
    });

    // push
    yield put(success(response));
    yield put(push('/'));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
    // alert(error.response.data.message);
    Swal.fire({
      icon: 'error',
      text: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    TokenService.remove();

    Swal.fire({
      icon: 'success',
      text: '로그아웃 되었습니다.',
      showConfirmButton: false,
      timer: 1500,
    });

    yield put(success(initialState));
    yield put(push('/'));
  } catch (error: any) {
    Swal.fire({
      icon: 'error',
      text: '로그아웃 실패',
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
