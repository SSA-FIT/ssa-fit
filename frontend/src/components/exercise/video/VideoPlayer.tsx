import styled from '@emotion/styled';
import React from 'react';
import ReactPlayer from 'react-player/youtube';

interface Props {
  videoId: string;
}
const VideoPlayer: React.FC<Props> = ({ videoId }) => {
  return (
    <>
      <ReactPlayer
        className="react-player"
        url={`https://www.youtube.com/watch?v=${videoId}`}
        width="100%"
        height="100%"
        muted
        playing
        loop
      />
    </>
  );
};

const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;
  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
export default VideoPlayer;
