import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useProfileRecList from '../../../hooks/useProfileRecList';

const ProfileRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profileRecoList: Recommendation[] = useProfileRecList();
  return (
    <Base>
      <Title>신체정보 기반 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider length={profileRecoList.length}>
          {profileRecoList.map((profileReco) => (
            <Card
              userRecoSelectList={userRecoSelectList}
              setUserRecoSelectList={setUserRecoSelectList}
              key={profileReco.id}
              id={profileReco.id}
              name={profileReco.name}
              imageURL={profileReco.imageURL}
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

export default ProfileRecommendation;
