import SelectInput from '@mui/material/Select/SelectInput';
import { response } from 'msw';
import { createActions, handleActions, Action } from 'redux-actions';

import { takeEvery, put, call, select } from 'redux-saga/effects';
import Swal from 'sweetalert2';
import BookmarkService from '../services/BookmarkService';
import RecommendationService from '../services/RecommendationService';
import {
  BookmarkRecommendation,
  Recommendation,
  RecommendationBookmarkRec,
} from '../types/recommendationTypes';

export interface BookmarkState {
  bookmarks: Recommendation[] | null;
  loading: boolean | null;
  error: Error | null;
}

export const initialState: BookmarkState = {
  bookmarks: null,
  loading: false,
  error: null,
};

const prefix = 'ssafit/bookmark';

export const { pending, updateBookmark, fail } = createActions(
  'PENDING',
  'UPDATE_BOOKMARK',
  'FAIL',
  { prefix },
);

const reducer = handleActions<BookmarkState, Recommendation[]>(
  {
    PENDING: (state) => ({ ...state, loading: true, error: null }),
    UPDATE_BOOKMARK: (state, action) => ({
      ...state,
      // eslint-disable-next-line react/destructuring-assignment
      bookmarks: action.payload,
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

export const { putBookmarkInfo, updateBookmarkInfo } = createActions(
  'PUT_BOOKMARK_INFO',
  'UPDATE_BOOKMARK_INFO',
  { prefix },
);

function* putBookmarkInfoSaga() {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    // 가장 최신 DB 값 가져오기
    const response: RecommendationBookmarkRec = yield call(
      RecommendationService.getBookmark,
      token,
    );

    yield put(updateBookmark(response.bookmark));
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

function* updateBookmarkInfoSaga(action: Action<number>) {
  try {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    const response: RecommendationBookmarkRec = yield call(
      BookmarkService.updateBookmark,
      action.payload,
      token,
    );
  } catch (error: any) {
    yield put(fail(error?.response?.data || 'UNKNOWN ERROR'));

    Swal.fire({
      icon: 'error',
      html: error.response.data.message,
      showConfirmButton: false,
      timer: 1500,
    });
  } finally {
    yield put(pending());

    const token: string = yield select((state) => state.auth.token);

    const response: RecommendationBookmarkRec = yield call(
      RecommendationService.getBookmark,
      token,
    );

    yield put(updateBookmark(response.bookmark));
  }
}
