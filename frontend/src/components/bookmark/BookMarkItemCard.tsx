import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { useDispatch } from 'react-redux';
import {
  updateBookmarkInfo as BookmarkSagaUpdate,
  putBookmarkInfo as BookmarkSagaPut,
} from '../../redux/bookmark';
import { Recommendation } from '../../types/recommendationTypes';

interface Props {
  bookMarkItem: Recommendation;
}
const BookMarkItemCard: React.FC<Props> = ({ bookMarkItem }) => {
  const [bookMarkChecked, setBookMarkChecked] = useState<boolean>(true);

  const dispatch = useDispatch();

  const updateBookmarkInfo = useCallback(
    (requestData) => {
      dispatch(BookmarkSagaUpdate(requestData));
    },
    [dispatch],
  );

  const handleExerciseBookMarkChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked) {
      setBookMarkChecked(true);
    } else {
      setBookMarkChecked(false);

      const exerciseId = event.target.value;
      updateBookmarkInfo({ exerciseId });
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
              <BookMarkIconchecked sx={{ color: '#00cdac' }} />
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
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  background-color: #02aab012;
  padding: 10px;
  border-radius: 15px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 5px;
  vertical-align: middle;
  border-style: none;
  height: 310px;
  object-fit: cover;
  background-color: #fafafa;
  @media (min-width: 992px) {
    max-width: 295px;
  }
`;

const NameWrapper = styled.div`
  //display: flex;
  //width: 100%;
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
  margin-bottom: 40px;
  margin-right: 20px;
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
  padding: 0;
  margin-bottom: 40px;
  margin-right: 20px;
`;
export default BookMarkItemCard;
