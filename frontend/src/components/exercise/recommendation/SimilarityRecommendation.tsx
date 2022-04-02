import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  SimilarityRecommendationType,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useSimilarityRecList from '../../../hooks/useSmilarityRecList';

const SimilarityRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const similarityRecoList: SimilarityRecommendationType[] =
    useSimilarityRecList();
  return (
    <Base>
      <Title>싸핏 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider length={similarityRecoList.length}>
          {similarityRecoList.map((similarityReco) => (
            <Card
              userRecoSelectList={userRecoSelectList}
              setUserRecoSelectList={setUserRecoSelectList}
              key={similarityReco.id}
              id={similarityReco.id}
              name={similarityReco.name}
              imageURL={similarityReco.imageURL}
              score={similarityReco.score}
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
export default SimilarityRecommendation;
