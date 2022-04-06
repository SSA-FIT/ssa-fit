import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Slider from '../../common/Slider';
import Card from '../../common/Card';
import {
  Recommendation,
  UserSelectListProp,
} from '../../../types/recommendationTypes';

const UserSelection: React.FC<UserSelectListProp> = ({
  setUserRecoSelectList,
  userRecoSelectList,
}) => {
  const [userSelections, setUserSelctions] =
    useState<Recommendation[]>(userRecoSelectList);

  useEffect(() => {
    setUserSelctions(userRecoSelectList);
  }, [userRecoSelectList]);

  return (
    <Base>
      <Title>오늘의 운동</Title>
      {userSelections.length > 0 ? (
        <Slider length={userSelections.length}>
          {userSelections.map((userSelection) => (
            <Card
              userRecoSelectList={userRecoSelectList}
              setUserRecoSelectList={setUserRecoSelectList}
              key={userSelection.id}
              id={userSelection.id}
              name={userSelection.name}
              imageURL={userSelection.imageURL}
              score={null}
              selection={true}
            />
          ))}
        </Slider>
      ) : (
        <DescriptionWrapper>
          <Description>오늘 하고 싶은 운동을 골라보세요.🤸‍♂️</Description>
        </DescriptionWrapper>
      )}
    </Base>
  );
};

const Base = styled.div`
  position: relative;
  bottom: 0;
  padding: 10px;
`;

const Title = styled.h4`
  font-size: 22px;
  font-weight: 300;
  line-height: 30px;
  padding: 12px 0 14px;
  margin-left: 5px;
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 150px;

  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: #fff solid 1px;

  background-color: #fff;
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

export default UserSelection;
