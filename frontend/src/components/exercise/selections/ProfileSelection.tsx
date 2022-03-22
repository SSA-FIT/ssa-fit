import React, { useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useProfileRecList from '../../../hooks/useProfileRecList';

const ProfileSelections: React.FC<UserSelectListProp> = ({
  userSelectList,
  setUserSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profileRecoList: Recommendation[] = useProfileRecList();
  return (
    <Base>
      <Title>신체정보 기반 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider>
          {profileRecoList.map((profileReco) => (
            <Card
              userSelectList={userSelectList}
              setUserSelectList={setUserSelectList}
              key={profileReco.id}
              id={profileReco.id}
              name={profileReco.name}
              imageURL={profileReco.imageURL}
              description={profileReco.description}
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

export default ProfileSelections;
