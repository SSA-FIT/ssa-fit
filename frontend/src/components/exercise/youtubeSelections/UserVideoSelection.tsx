import React, { useState } from 'react';
import styled from '@emotion/styled';
import { UserVideoSelectListProp } from '../../../types/recommendationTypes';
import YoutubeCard from '../../common/YoutubeCard';
import Slider from '../../common/Slider';

const UserVideoSelection: React.FC<UserVideoSelectListProp> = ({
  userVideoSelectList,
  setUserVideoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Base>
      <Title>오늘의 운동 영상</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
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
            />
          ))}
        </Slider>
      )}
    </Base>
  );
};

const Base = styled.div`
  margin-bottom: 21px;
  position: relative;
  background-color: #fafafa;
`;

const Title = styled.h4`
  font-size: 22px;
  //font-weight: 100;
  line-height: 30px;
  padding: 12px 0 14px;
`;
export default UserVideoSelection;
