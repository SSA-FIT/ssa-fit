import React, { useState } from 'react';
import styled from '@emotion/styled';
import { UserVideoSelectListProp } from '../../../types/recommendationTypes';
import YoutubeCard from '../../common/YoutubeCard';
import Slider from '../../common/Slider';

const UserVideoSelection: React.FC<UserVideoSelectListProp> = ({
  userVideoSelectList,
  setUserVideoSelectList,
}) => {
  return (
    <Base>
      <Title>오늘의 운동 영상</Title>
      {userVideoSelectList.length > 0 ? (
        <Slider length={userVideoSelectList.length}>
          {userVideoSelectList.map((userVideoSelectItem) => (
            <YoutubeCard
              userVideoSelectList={userVideoSelectList}
              setUserVideoSelectList={setUserVideoSelectList}
              key={userVideoSelectItem.videoId}
              searchName={userVideoSelectItem.searchName}
              videoId={userVideoSelectItem.videoId}
              title={userVideoSelectItem.title}
              thumbnails={userVideoSelectItem.thumbnails}
              id={userVideoSelectItem.id}
              selection={true}
            />
          ))}
        </Slider>
      ) : (
        <DescriptionWrapper>
          <Description>오늘 하고 싶은 운동 영상을 골라보세요.🤸‍♂️</Description>
        </DescriptionWrapper>
      )}
    </Base>
  );
};

const Base = styled.div`
  margin-bottom: 21px;
  position: relative;
  padding: 10px;
  /* background-color: #fafafa; */
`;

const Title = styled.h4`
  font-size: 22px;
  //font-weight: 100;
  line-height: 30px;
  padding: 12px 0 14px;
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
  color: #02aab0;
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
export default UserVideoSelection;
