import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import useEntireSelectionList from '../../../hooks/useRecoList';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';

const EntireRecommendation: React.FC<UserSelectListProp> = ({
  userSelectList,
  setUserSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const entireRecoList: Recommendation[] = useEntireSelectionList();
  return (
    <Base>
      <Title>전체 운동 목록</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {entireRecoList.map((entireReco) => (
            <Card
              userSelectList={userSelectList}
              setUserSelectList={setUserSelectList}
              key={entireReco.id}
              id={entireReco.id}
              name={entireReco.name}
              imageURL={entireReco.imageURL}
              description={entireReco.description}
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

export default EntireRecommendation;
