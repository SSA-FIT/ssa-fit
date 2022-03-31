import React, { useState } from 'react';
import styled from '@emotion/styled';
import { VideoListProp } from '../../../types/recommendationTypes';
import YoutubeCard from '../../common/YoutubeCard';
import Slider from '../../common/Slider';

const VideoList: React.FC<VideoListProp> = ({
  youtubeVideoList,
  userVideoSelectList,
  setUserVideoSelectList,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <Base>
      <Title>{youtubeVideoList[0].searchName} 운동 영상</Title>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Slider length={youtubeVideoList.length}>
          {youtubeVideoList.map((youtubeVideoItem) => (
            <YoutubeCard
              userVideoSelectList={userVideoSelectList}
              setUserVideoSelectList={setUserVideoSelectList}
              key={youtubeVideoItem.videoId}
              searchName={youtubeVideoItem.searchName}
              videoId={youtubeVideoItem.videoId}
              title={youtubeVideoItem.title}
              thumbnails={youtubeVideoItem.thumbnails}
              id={youtubeVideoItem.id}
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
export default VideoList;
