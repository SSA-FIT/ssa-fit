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
  message: string | null;
  status: string | null;
  token: string | null;
  userInfo: UserInfo | null;
  error: Error | null;
}

const initialState: AuthState = {
  message: null,
  status: null,
  token: null,
  userInfo: null,
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
    PENDING: (state) => ({ ...state, error: null }),
    SUCCESS: (state, action) => ({
      ...state,
      message: action.payload.message,
      token: action.payload.token,
      userInfo: action.payload.userInfo,
    }),
    FAIL: (state, action: any) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
  { prefix },
);

export default reducer;

// saga
export const { login, logout } = createActions('LOGIN', 'LOGOUT', prefix);

function* loginSaga(action: Action<LogInRequest>) {
  try {
    yield put(pending());
    const response: LogInApiResponse = yield call(
      UserService.userLogIn,
      action.payload,
    );
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
