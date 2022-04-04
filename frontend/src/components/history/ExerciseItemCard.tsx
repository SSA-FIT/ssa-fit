import styled from '@emotion/styled';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { exerciseItemRecord } from '../../types/historyTypes';
import {
  putBookmarkInfo as BookmarkSagaPut,
  updateBookmarkInfo as BookmarkSagaUpdate,
} from '../../redux/bookmark';
import { Recommendation } from '../../types/recommendationTypes';
import { RootState } from '../../types/authTypes';

interface Props {
  exerciseItem: exerciseItemRecord;
}

const ExerciseItemCard: React.FC<Props> = ({ exerciseItem }) => {
  const bookMarkFromRedux = useSelector<RootState, Recommendation[] | null>(
    (state) => state.bookmark.bookmarks,
  );

  const dispatch = useDispatch();

  const updateBookmarkInfo = useCallback(
    (requestData) => {
      dispatch(BookmarkSagaUpdate(requestData));
    },
    [dispatch],
  );

  const [bookMarkChecked, setBookMarkChecked] = useState<boolean>(
    exerciseItem.bookmark,
  );

  const findExerciseId = bookMarkFromRedux?.findIndex(
    (bookmark) => bookmark.id === exerciseItem.exerciseId,
  );

  useEffect(() => {
    if (findExerciseId === -1) {
      setBookMarkChecked(false);
    } else {
      setBookMarkChecked(true);
    }
  }, [bookMarkFromRedux]);

  const handleExerciseBookMarkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setBookMarkChecked(true);
    } else {
      setBookMarkChecked(false);
    }

    updateBookmarkInfo({ exerciseId: exerciseItem.exerciseId });
  };
  return (
    <>
      <ExerciseItemWrapper>
        <ExerciseItem>
          <Exercise>
            <ExerciseImage src={exerciseItem.imageURL} />
            <ExerciseBookMarkWrapper>
              <ExerciseBookMark
                type="checkbox"
                checked={bookMarkChecked}
                onChange={handleExerciseBookMarkChange}
              />
            </ExerciseBookMarkWrapper>
            {bookMarkChecked === false ? (
              <ExerciseBookMarkIconchecked sx={{ color: '#fafafa' }} />
            ) : (
              <ExerciseBookMarkIconchecked sx={{ color: '#6367ff' }} />
            )}
          </Exercise>
        </ExerciseItem>
        <ExerciseDescription>{exerciseItem.getName}</ExerciseDescription>
        <ExerciseDescription className="record" key={exerciseItem.exerciseId}>
          {exerciseItem.countPerSet !== null && exerciseItem.setCount !== null
            ? `총 ${parseFloat(exerciseItem.countPerSet)} 회 (${(
                parseFloat(exerciseItem.countPerSet) / exerciseItem.setCount
              ).toFixed(1)}회 x ${exerciseItem.setCount}세트) `
            : undefined}
          {exerciseItem.durationTime !== null
            ? `${exerciseItem.durationTime} 소요`
            : undefined}
        </ExerciseDescription>
      </ExerciseItemWrapper>
    </>
  );
};

const ExerciseItemWrapper = styled.a`
  overflow: hidden;
  display: block;
  touch-action: manipulation;
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
`;

const ExerciseItem = styled.div`
  position: relative;
  margin-bottom: 10px;
  border-radius: 5px;
  overflow: hidden;
`;

const Exercise = styled.div`
  // object-fit: cover;
  position: relative;
  height: 0px;
  padding-top: 56.3333%;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    transition: background-color 0.3s ease 0s;
  }
`;

const ExerciseImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  //z-index: 1;
  object-fit: contain;
  vertical-align: middle;
  border-style: none;
`;

const ExerciseBookMarkWrapper = styled.div``;

const ExerciseBookMark = styled.input`
  width: 3em;
  height: 3em;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 3;
  border: 0;
  //clip: rect(0 0 0 0);
  opacity: 0;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
`;

const ExerciseBookMarkIconchecked = styled(StarRoundedIcon)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 2.5em;
  height: 2.5em;
`;

const ExerciseDescription = styled.p`
  font-size: 18px;
  line-height: 1.5;
  color: #303033;
  margin: 0px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &.record {
    font-size: 14px;
  }
`;

export default ExerciseItemCard;
