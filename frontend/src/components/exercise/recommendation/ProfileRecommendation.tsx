import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  ProfileRecoWithoutTokenRequest,
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useProfileRecList from '../../../hooks/useProfileRecList';
import useToken from '../../../hooks/useToken';
import ExerciseBackdrop from '../../common/ExerciseBackdrop';

const ProfileRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const token: string | null = useToken();
  const location = useLocation();
  const state = location.state as ProfileRecoWithoutTokenRequest;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const profileRecoList: Recommendation[] = useProfileRecList(token, state);

  useEffect(() => {
    if (profileRecoList.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [profileRecoList]);

  return (
    <Base>
      {
        <>
          <ExerciseBackdrop backDropOpen={isLoading} />
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
      }
    </Base>
  );
};
const Base = styled.div`
  /* //margin-bottom: 42px;
  position: relative;
  background-color: #000; */
`;

export default ProfileRecommendation;
