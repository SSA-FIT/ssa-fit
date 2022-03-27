import { createActions, handleActions, Action } from 'redux-actions';
import { takeEvery, put, call } from 'redux-saga/effects';
import { go, push } from 'connected-react-router';
import TokenService from '../../services/TokenService';
import UserService from '../../services/UserService';
import {
  LogInApiResponse,
  LogInRequest,
  LogInResponse,
  UserInfo,
} from '../../types/authTypes';

interface AuthState {
  token: string | null;
  userInfo: UserInfo | null;
  loading: boolean;
  error: Error | null;
}

const initialState: AuthState = {
  token: null,
  userInfo: null,
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
      // eslint-disable-next-line react/destructuring-assignment
      userInfo: action.payload.userInfo,
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

function* loginSaga(action: Action<LogInRequest>) {
  try {
    alert('아');
    yield put(pending());

    const response: LogInApiResponse = yield call(UserService.userLogIn, {
      userId: action.payload.userId,
      password: action.payload.password,
    });

    const { token } = response;
    // localStorage
    TokenService.set(token);
    // push
    yield put(push('/'));
    yield put(success(response));
  } catch (error: any) {
    yield put(fail(new Error(error?.response?.data?.error || 'UNKNOWN ERROR')));
  }
}

function* logoutSaga() {
  yield put(push('/'));
}

export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
