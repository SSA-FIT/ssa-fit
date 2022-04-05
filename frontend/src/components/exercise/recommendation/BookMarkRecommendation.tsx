import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useBookMarkList from '../../../hooks/useBookMarkList';
import useToken from '../../../hooks/useToken';
import ExerciseBackdrop from '../../common/ExerciseBackdrop';

const BookMarkRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const token = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const bookMarkRecoList: Recommendation[] = useBookMarkList(token);

  // useEffect(() => {
  //   if (bookMarkRecoList.length > 0) {
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(true);
  //   }
  // }, [bookMarkRecoList]);

  return (
    <Base>
      {/* <ExerciseBackdrop backDropOpen={isLoading} /> */}
      {bookMarkRecoList.length !== 0 && (
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
      {token !== null ? (
        bookMarkRecoList.length === 0 && (
          <DescriptionWrapper>
            <Description>
              현재 즐겨찾기한 운동이 없습니다. 운동 이력 조회 페이지에서
              즐겨찾기를 할 수 있습니다.
            </Description>
            <SignUpLink to="/exercise/history">
              운동 이력 조회 페이지로 이동🤸‍♂️
            </SignUpLink>
          </DescriptionWrapper>
        )
      ) : (
        <DescriptionWrapper>
          <Description>
            즐겨찾기 목록은 회원 전용 서비스입니다. <br /> 좋아하는 운동을
            기억하고 싶다면 회원가입을 진행해주세요.
          </Description>
          <SignUpLink css={differentBorderColor} to="/users/sign-up">
            싸핏 회원가입 하러 가기🤸‍♂️
          </SignUpLink>
        </DescriptionWrapper>
      )}
    </Base>
  );
};

const Base = styled.div`
  margin-bottom: 42px;
  position: relative;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 150px;
  background-color: #fafafa;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: #6367ffcc solid 1px;
`;

const Description = styled.h5`
  color: #6367ffcc;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: initial;

  @media (max-width: 575px) {
    font-size: 14px;
  }
  @media (max-width: 349px) {
    font-size: 13px;
  }
`;

const SignUpLink = styled(Link)`
  font-size: 20px;
  margin-top: 15px;

  &:hover {
    border-bottom: 1px solid #fff;
  }
  @media (max-width: 575px) {
    font-size: 14px;
  }
  @media (max-width: 349px) {
    font-size: 13px;
  }
`;

const differentBorderColor = css`
  &:hover {
    border-bottom: 1px solid #6367ff;
  }
`;
export default BookMarkRecommendation;
