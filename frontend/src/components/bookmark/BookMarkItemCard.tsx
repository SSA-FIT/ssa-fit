import styled from '@emotion/styled';
import { useCallback, useEffect, useState } from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

// import { login as loginSagaStart } from '../../redux/modules/auth';

import { useDispatch, useSelector } from 'react-redux';
import {
  updateBookmarkInfo as BookmarkSagaUpdate,
  putBookmarkInfo as BookmarkSagaPut,
} from '../../redux/bookmark';
import { Recommendation } from '../../types/recommendationTypes';
import { RootState } from '../../types/authTypes';
import BookmarkService from '../../services/BookmarkService';

interface Props {
  bookMarkItem: Recommendation;
}
const BookMarkItemCard: React.FC<Props> = ({ bookMarkItem }) => {
  const [bookMarkChecked, setBookMarkChecked] = useState<boolean>(true);
  const [nowExerciseId, setNowExerciseId] = useState<number | null>();

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(BookmarkSagaPut());
  // }, [bookMarkChecked]);

  const updateBookmarkInfo = useCallback(
    (requestData) => {
      dispatch(BookmarkSagaUpdate(requestData));
    },
    [dispatch],
  );

  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );

  const handleExerciseBookMarkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setBookMarkChecked(true);
    } else {
      setBookMarkChecked(false);
      // console.log(event.target.value);

      // 기존
      // const targetId = event.target.value;
      // updateBookmarkInfo({ data: targetId, token });

      const exerciseId = event.target.value;
      updateBookmarkInfo({ exerciseId });
      // putBookmarkInfo();
    }
  };
  return (
    <>
      <Container>
        <Image src={bookMarkItem.imageURL} />
        <BookMarkWrapper>
          <BookMark
            type="checkbox"
            checked={bookMarkChecked}
            value={bookMarkItem.id}
            onChange={handleExerciseBookMarkChange}
          />
        </BookMarkWrapper>
        {bookMarkChecked === false ? (
          <BookMarkIconchecked sx={{ color: '#f8f8f8' }} />
        ) : (
          <>
            <div>
              <BookMarkIconchecked sx={{ color: '#6367ff' }} />
            </div>
          </>
        )}
        <NameWrapper>
          <Name>{bookMarkItem.name}</Name>
        </NameWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 303px;
  touch-action: manipulation;
  color: #1890ff;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
  transition: color 0.3s;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 6px;
  vertical-align: middle;
  border-style: none;

  @media (min-width: 992px) {
    max-width: 295px;
    min-height: 303px;
  }
`;

const NameWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-top: 10px;
`;

const Name = styled.span`
  font-weight: 400;
  font-size: 18px;
  color: rgb(48, 48, 51);
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
`;

const BookMarkWrapper = styled.div``;

const BookMark = styled.input`
  width: 3em;
  height: 3em;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 3;
  border: 0;
  //clip: rect(0 0 0 0);
  opacity: 0;
  margin-bottom: 30px;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;
`;

const BookMarkIconchecked = styled(StarRoundedIcon)`
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 2.5em;
  height: 2.5em;
  margin-bottom: 30px;
`;
export default BookMarkItemCard;
