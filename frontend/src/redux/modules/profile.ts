import { Action, createActions, handleActions } from 'redux-actions';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { go, push } from 'connected-react-router';

import Swal from 'sweetalert2';
import TokenService from '../../services/TokenService';
import { ProfileResponse, UserInfo } from '../../types/profileTypes';

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
export const { editProfileInfo, updateProfileInfo } = createActions(
  'EDIT_PROFILE_INFO',
  'UPDATE_PROFILE_INFO',
  {
    prefix,
  },
);

function* editProfileSaga() {
    try {
        yield put(pending());

        const token:string=yield select((state)=>state.profile.token);

        const response:ProfileResponse=yield call
    }
}