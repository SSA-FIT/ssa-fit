import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  SimilarityRecommendationType,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useSimilarityRecList from '../../../hooks/useSmilarityRecList';
import useToken from '../../../hooks/useToken';
import ExerciseBackdrop from '../../common/ExerciseBackdrop';

const SimilarityRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const token = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const similarityRecoList: SimilarityRecommendationType[] =
    useSimilarityRecList(token);

  // useEffect(() => {
  //   if (similarityRecoList.length > 0) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [similarityRecoList]);

  return (
    <Base>
      <>
        {/* <ExerciseBackdrop backDropOpen={isLoading} /> */}
        {similarityRecoList.length !== 0 ? (
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
                selection={false}
              />
            ))}
          </Slider>
        ) : undefined}
      </>
      {token !== null ? (
        similarityRecoList.length === 0 && (
          <DescriptionWrapper>
            <Description>
              운동 기록을 기반으로 당신을 위한 추천 운동이 만들어지고 있습니다.
              🕵️‍♂️
            </Description>
          </DescriptionWrapper>
        )
      ) : (
        <DescriptionWrapper>
          <Description>
            싸핏 체험판에서는 사용자 운동 기록을 기반으로 맞춤 추천 목록은
            제공되지 않습니다. <br /> 개인의 운동 기록을 기반으로 하는 추천을
            보고 싶다면 회원가입을 진행해주세요
          </Description>
          <SignUpLink to="/users/sign-up">싸핏 회원가입 하러 가기🏃‍♀️</SignUpLink>
        </DescriptionWrapper>
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

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #6367ffcc;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Description = styled.h5`
  color: #fff;
  text-align: center;
  margin-top: 15px;
  font-weight: 100;
  font-size: 20px;
  line-height: initial;
`;

const SignUpLink = styled(Link)`
  font-size: 20px;
  margin-top: 15px;

  &:hover {
    border-bottom: 1px solid #fff;
  }
`;
export default SimilarityRecommendation;
