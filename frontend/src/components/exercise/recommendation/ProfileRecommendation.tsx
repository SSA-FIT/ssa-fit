import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  NonUser,
  ProfileRecoWithoutTokenRequest,
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useProfileRecList from '../../../hooks/useProfileRecList';
import useToken from '../../../hooks/useToken';

const ProfileRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const token: string | null = useToken();
  const location = useLocation();
  const state = location.state as ProfileRecoWithoutTokenRequest;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profileRecoList: Recommendation[] = useProfileRecList(token, state);
  console.log(profileRecoList);
  return (
    <Base>
      <Title>신체정보 기반 운동 추천</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {profileRecoList?.length !== 0 ? (
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
          ) : undefined}
        </>
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
