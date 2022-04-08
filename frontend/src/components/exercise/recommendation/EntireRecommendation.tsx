import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import useEntireSelectionList from '../../../hooks/useRecoList';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import ExerciseBackdrop from '../../common/ExerciseBackdrop';

const EntireRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const entireRecoList: Recommendation[] = useEntireSelectionList();

  useEffect(() => {
    if (entireRecoList.length > 0) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [entireRecoList]);

  return (
    <Base>
      {/* <Title>전체 운동 목록</Title> */}
      <ExerciseBackdrop backDropOpen={isLoading} />
      {entireRecoList.length !== 0 && (
        <Slider length={entireRecoList.length}>
          {entireRecoList.map((entireReco) => (
            <Card
              userRecoSelectList={userRecoSelectList}
              setUserRecoSelectList={setUserRecoSelectList}
              key={entireReco.id}
              id={entireReco.id}
              name={entireReco.name}
              imageURL={entireReco.imageURL}
              score={null}
              selection={false}
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

  @media (max-width: 667px) {
    margin-bottom: 0px;
  }
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 400;
  line-height: 30px;
  padding: 12px 0 14px;
`;

export default EntireRecommendation;
