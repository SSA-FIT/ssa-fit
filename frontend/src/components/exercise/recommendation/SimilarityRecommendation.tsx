import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useSimilarityRecList from '../../../hooks/useSmilarityRecList';

const SimilarityRecommendation: React.FC<UserSelectListProp> = ({
  userSelectList,
  setUserSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const similarityRecoList: Recommendation[] = useSimilarityRecList();
  return (
    <Base>
      <Title>싸핏 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {similarityRecoList.map((similarityReco) => (
            <Card
              userSelectList={userSelectList}
              setUserSelectList={setUserSelectList}
              key={similarityReco.id}
              id={similarityReco.id}
              name={similarityReco.name}
              imageURL={similarityReco.imageURL}
              description={similarityReco.description}
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
  font-weight: 700;
  line-height: 30px;
  padding: 12px 0 14px;
`;
export default SimilarityRecommendation;
