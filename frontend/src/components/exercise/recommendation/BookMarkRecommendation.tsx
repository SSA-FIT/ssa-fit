import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useBookMarkList from '../../../hooks/useBookMarkList';

const BookMarkRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bookMarkRecoList: Recommendation[] = useBookMarkList();
  return (
    <Base>
      <Title>OOO님이 좋아했던 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider length={bookMarkRecoList.length}>
          {bookMarkRecoList.map((bookMarkReco) => (
            <Card
              userRecoSelectList={userRecoSelectList}
              setUserRecoSelectList={setUserRecoSelectList}
              key={bookMarkReco.id}
              id={bookMarkReco.id}
              name={bookMarkReco.name}
              imageURL={bookMarkReco.imageURL}
              score={null}
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

const Base = styled.div`
  margin-bottom: 42px;
  position: relative;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 400;
  line-height: 30px;
  padding: 12px 0 14px;
`;

export default BookMarkRecommendation;
