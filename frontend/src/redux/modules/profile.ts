import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { go, push } from 'connected-react-router';

import Swal from 'sweetalert2';
import { userInfo } from 'os';
import TokenService from '../../services/TokenService';
import {
  ProfileRequest,
  ProfileResponse,
  UserInfo,
} from '../../types/profileTypes';
import ProfileService from '../../services/ProfileService';
import { SignUpResponse } from '../../types/commonTypes';

export interface ProfileState {
  info: UserInfo | null;
  loading: boolean;
  error: Error | null;
}

const initialState: ProfileState = {
  info: null,
  loading: false,
  error: null,
};

const prefix = 'ssafit/profile';

export const { pending, update, fail } = createActions(
  'PENDING',
  'UPDATE',
  'FAIL',
  { prefix },
);

const reducer = handleActions<ProfileState, UserInfo>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    UPDATE: (state, action) => ({
      ...state,
      // eslint-disable-next-line react/destructuring-assignment
      info: action.payload,
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
export const { putProfileInfo, updateProfileInfo } = createActions(
  'PUT_PROFILE_INFO',
  'UPDATE_PROFILE_INFO',
  {
    prefix,
  },
);

function* putProfileSaga() {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    const response: ProfileResponse = yield call(
      ProfileService.getUserInfo,
      token,
    );

    yield put(update(response.userInfo));
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    Swal.fire({
      icon: 'error',
      html: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

function* updateProfileSaga(action: Action<ProfileRequest>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    const response: SignUpResponse = yield call(ProfileService.updateUserInfo,
      data: action.payload,
      token,
    );

    yield put(update(action.payload));
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    Swal.fire({
      icon: 'error',
      html: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
