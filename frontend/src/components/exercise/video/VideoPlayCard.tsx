import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import React, { useState } from 'react';
import {
  recoRecord,
  recoRecordList,
  YoutubeVideo,
} from '../../../types/recommendationTypes';
import VideoPlayer from './VideoPlayer';

interface Props {
  userVideoSelectList: YoutubeVideo[];
}
const VideoPlayCard: React.FC<Props> = ({ userVideoSelectList }) => {
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [exerciseRecords, setExerciseRecords] = useState<recoRecordList>();
  const [exerciseRecordList, setExerciseRecordList] = useState<recoRecord[]>(
    [],
  );

  const handlePrevButton = (event: React.MouseEvent) => {
    setVideoIndex(videoIndex - 1);
  };
  const handleNextButton = (event: React.MouseEvent) => {
    setVideoIndex(videoIndex + 1);
  };
  return (
    <>
      <Wrapper>
        <ExerciseNameWrapper>
          <ExerciseName>
            {userVideoSelectList[videoIndex].searchName}({videoIndex + 1}/
            {userVideoSelectList.length})
          </ExerciseName>
        </ExerciseNameWrapper>
        <VideoWrapper>
          <PrevButtonWrapper>
            {videoIndex !== 0 ? (
              <PrevButton onClick={handlePrevButton}>
                <ArrowBackIosNewIcon />
              </PrevButton>
            ) : (
              <PrevButton disabled>
                <ArrowBackIosNewIcon />
              </PrevButton>
            )}
          </PrevButtonWrapper>
          <PlayerWrapper>
            <VideoPlayer videoId={userVideoSelectList[videoIndex].videoId} />
          </PlayerWrapper>
          <NextButtonWrapper>
            {videoIndex + 1 !== userVideoSelectList.length ? (
              <NextButton onClick={handleNextButton}>
                <ArrowForwardIosIcon />
              </NextButton>
            ) : (
              <FinishButton>운동 완료</FinishButton>
            )}
          </NextButtonWrapper>
        </VideoWrapper>
        <InputAndButtonWrapper>
          <InputsWrapper>
            <InputWrapper>
              <InputName>반복 횟수</InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>세트 수</InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>운동 시간</InputName>
              <TimeInputWrapper>
                <TimeInput placeholder="시간" />

                <TimeInput placeholder="분" />
                <TimeInput placeholder="초" />
              </TimeInputWrapper>
            </InputWrapper>
          </InputsWrapper>
          <StopButtonWrapper>
            {videoIndex + 1 !== userVideoSelectList.length ? (
              <StopButton>운동 중단</StopButton>
            ) : undefined}
          </StopButtonWrapper>
        </InputAndButtonWrapper>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ExerciseNameWrapper = styled.div`
  text-align: center;
  margin-bottom: 24px;
`;

const ExerciseName = styled.h1`
  font-size: 22px;
  font-weight: 700;
`;

const VideoWrapper = styled.div`
  height: 470px;
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`;

const PrevButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const PrevButton = styled.button`
  background-color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    outline: 0;
    background-color: rgb(235, 224, 246);
    border-radius: 50%;
  }

  &:disabled {
    cursor: not-allowed;
    outline: 0;
    background-color: white;
    border-radius: 50%;
  }
`;

const PlayerWrapper = styled.div`
  width: 70%;
`;

const NextButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15%;
`;

const NextButton = styled.button`
  background-color: white;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    outline: 0;
    background-color: rgb(235, 224, 246);
    border-radius: 50%;
  }
`;

const FinishButton = styled.button`
  font-size: 20px;
  color: rgb(153, 51, 255);
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  background-color: white;
  border: none;

  &:hover {
    outline: 0;
    // border: 2px solid rgb(153, 51, 255);
    background-color: rgb(235, 224, 246);
    border-radius: 0.3rem;
  }
`;
const InputAndButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const InputsWrapper = styled.div`
  width: 70%;
  display: flex;

  justify-content: space-between;
  /* background-color: purple; */
`;

const InputWrapper = styled.div``;

const StopButtonWrapper = styled.div`
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StopButton = styled.button`
  font-size: 20px;
  color: rgb(153, 51, 255);
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  background-color: white;
  border: none;

  &:hover {
    outline: 0;
    // border: 2px solid rgb(153, 51, 255);
    background-color: rgb(235, 224, 246);
    border-radius: 0.3rem;
  }
`;

const InputName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 8px;
`;

const Input = styled.input`
  margin-right: 8px;
  border: 0;
  border-bottom: 1px solid #00256c;
  border-radius: 0;
  text-align: center;
`;

const TimeInputWrapper = styled.div`
  width: 100%;
  margin-right: 8px;
  display: flex;
  justify-content: space-between;
`;

const TimeInput = styled.input`
  border: 0;
  border-bottom: 1px solid #00256c;
  border-radius: 0;
  margin-right: 8px;
  text-align: center;
`;

export default VideoPlayCard;
