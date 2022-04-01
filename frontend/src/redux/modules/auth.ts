import { createActions, handleActions, Action } from 'redux-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { go, push } from 'connected-react-router';

import Swal from 'sweetalert2';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import {
  LogInApiResponse,
  LogInRequest,
  LogInRequestIdCheck,
  LogInResponse,
  UserInfo,
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
      // eslint-disable-next-line react/destructuring-assignment
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
  yield put(push('/'));
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
