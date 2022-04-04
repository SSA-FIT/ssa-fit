import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';
import useBookMarkList from '../../../hooks/useBookMarkList';
import useToken from '../../../hooks/useToken';

const BookMarkRecommendation: React.FC<UserSelectListProp> = ({
  userRecoSelectList,
  setUserRecoSelectList,
}) => {
  const token = useToken();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const bookMarkRecoList: Recommendation[] = useBookMarkList(token);
  return (
    <Base>
      <Title>내가 즐겨찾기한 운동</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        bookMarkRecoList.length !== 0 && (
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
        )
      )}
      {token !== null ? (
        bookMarkRecoList.length === 0 && (
          <DescriptionWrapper>
            <Description>
              현재 즐겨찾기한 운동이 없습니다. 운동 이력 조회 페이지에서
              즐겨찾기를 할 수 있습니다!
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
  background-color: #fafafa;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Description = styled.h5`
  color: #6367ffcc;
  text-align: center;
  margin-top: 15px;
  font-weight: 200;
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
export default BookMarkRecommendation;
