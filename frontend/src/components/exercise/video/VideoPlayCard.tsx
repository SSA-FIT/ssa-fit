import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import React, { FormEventHandler, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { text } from 'stream/consumers';
import TimeField from 'react-simple-timefield';
import {
  recoRecord,
  recoRecordList,
  YoutubeVideo,
} from '../../../types/recommendationTypes';
import VideoPlayer from './VideoPlayer';
import { onlyNumberReg } from '../../../utils/RegExpressions';
import useToken from '../../../hooks/useToken';
import RecommendationService from '../../../services/RecommendationService';
import NonUserDialog from '../NonUserDialog';

interface Props {
  userVideoSelectList: YoutubeVideo[];
}
const VideoPlayCard: React.FC<Props> = ({ userVideoSelectList }) => {
  const [duration, setDuration] = useState<string>('00:00:00');
  const location = useLocation();
  const [nonUserDialogOpen, setNonUserDialogOpen] = useState<boolean>(false);
  const token = useToken();
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<number>(0);
  const [setCount, setSetCount] = useState<number>(0);

  const [exerciseRecords, setExerciseRecords] = useState<recoRecordList>();
  const [exerciseRecordList, setExerciseRecordList] = useState<recoRecord[]>(
    [],
  );
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);

  const handleRepeatCountOnChage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatCount(parseInt(event.target.value, 10));
    if (event.target.value === '') {
      setRepeatCount(0);
    }
    if (event.target.value.length > 3) {
      setRepeatCount(parseInt(event.target.value.slice(0, 3), 10));
    }
  };

  // useEffect(()={
  //   if (repeatCount> 3) {
  //     setRepeatCount(repeatCount.slice(0, 3));
  //   }
  // },[repeatCount])
  const handleSetCountOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSetCount(parseInt(event.target.value, 10));
    if (event.target.value === '') {
      setRepeatCount(0);
    }
  };

  // useEffect(() => {
  //   if (nonUserDialogOpen) {
  //     controlExerciseRecordList(videoIndex);
  //   }
  // }, [nonUserDialogOpen]);

  useEffect(() => {
    if ((repeatCount > 0 && setCount > 0) || duration !== '00:00:00') {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }

    // if (repeatCount > 0 && setCount > 0) {
    //   setNextButtonDisabled(false);
    // } else {
    //   setNextButtonDisabled(true);
    // }
  }, [repeatCount, setCount, duration]);

  const handlePrevButton = (event: React.MouseEvent) => {
    setVideoIndex(videoIndex - 1);
  };

  const resetRecordItem = () => {
    setRepeatCount(0);
    setSetCount(0);
    setDuration('00:00:00');
  };

  const [last, setLast] = useState<boolean>(false);
  const handleNextButton = (event: React.MouseEvent) => {
    if (controlExerciseRecordList(videoIndex)) {
      if (videoIndex + 1 !== userVideoSelectList.length) {
        setVideoIndex(videoIndex + 1);
        resetRecordItem();
      } else {
        setLast(true);
      }
    }
  };

  const controlExerciseRecordList = (recordVideoId: number) => {
    const findExerciseId = exerciseRecordList.findIndex(
      (exercisesItem) =>
        exercisesItem.id === userVideoSelectList[recordVideoId].id,
    );

    if (findExerciseId === -1) {
      setExerciseRecordList([
        ...exerciseRecordList,
        {
          id: userVideoSelectList[videoIndex].id,
          countPerSet: repeatCount * setCount,
          setCount,
          durationTime: duration,
        },
      ]);
      return true;
    }
    const tempExerciseRecordList = [...exerciseRecordList];

    tempExerciseRecordList[findExerciseId] = {
      id: userVideoSelectList[videoIndex].id,
      countPerSet:
        exerciseRecordList[findExerciseId].countPerSet + repeatCount * setCount,
      setCount: exerciseRecordList[findExerciseId].setCount + setCount,
      durationTime: `${
        parseInt(duration.split(':')[0], 10) +
        parseInt(
          exerciseRecordList[findExerciseId].durationTime.split(':')[0],
          10,
        )
      }:${
        parseInt(duration.split(':')[1], 10) +
        parseInt(
          exerciseRecordList[findExerciseId].durationTime.split(':')[1],
          10,
        )
      }:${
        parseInt(duration.split(':')[2], 10) +
        parseInt(
          exerciseRecordList[findExerciseId].durationTime.split(':')[2],
          10,
        )
      }`,
    };

    setExerciseRecordList(tempExerciseRecordList);
    return true;
  };

  useEffect(() => {
    if (last) {
      handleExerciseFinishButtonClick();
    }
  }, [last]);

  const handleExerciseFinishButtonClick = () => {
    if (last) {
      if (token !== null) {
        RecommendationService.saveExerciseRecords(
          { exercises: exerciseRecordList },
          token,
        )
          .then(({ message }) => {
            Swal.fire({
              icon: 'success',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((error) => {
            const { status, message } = error.response.data;
            Swal.fire({
              icon: 'error',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
      } else {
        setNonUserDialogOpen(true);
      }
    }
  };

  const handleDurationTimeOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDuration(event.target.value);
  };

  console.log(repeatCount, setCount, duration);
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
          <PrevButtonWrapper />
          <PlayerWrapper>
            <VideoPlayer videoId={userVideoSelectList[videoIndex].videoId} />
          </PlayerWrapper>
          <NextButtonWrapper>
            {videoIndex + 1 !== userVideoSelectList.length ? (
              <NextButton
                onClick={handleNextButton}
                disabled={nextButtonDisabled}
              >
                <ArrowForwardIosIcon />
              </NextButton>
            ) : (
              <FinishButton
                onClick={handleNextButton}
                disabled={nextButtonDisabled}
              >
                운동 완료
              </FinishButton>
            )}
          </NextButtonWrapper>
        </VideoWrapper>
        <InputAndButtonWrapper>
          <InputsWrapper>
            <InputWrapper>
              <TextField
                onChange={handleRepeatCountOnChage}
                id="outlined-number"
                label="반복 횟수"
                type="number"
                placeholder="15회"
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue="0"
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                onChange={handleSetCountOnChange}
                id="outlined-number"
                label="세트 수"
                type="number"
                placeholder="5세트"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <TimeField
                value={duration}
                onChange={handleDurationTimeOnChange}
                input={
                  <TextField
                    id="outlined-number"
                    label="시간"
                    type="text"
                    placeholder="5세트"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                }
                colon=":"
                showSeconds
              />
            </InputWrapper>
          </InputsWrapper>
          <StopButtonWrapper>
            {videoIndex + 1 !== userVideoSelectList.length ? (
              // <StopButton
              //   disabled={nextButtonDisabled}
              //   onClick={handleExerciseFinishButtonClick}
              // >
              //   운동 중단
              // </StopButton>
              <NonUserDialog
                nonUserDialogOpen={nonUserDialogOpen}
                exerciseRecordList={exerciseRecordList}
              />
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

  &:disabled {
    cursor: not-allowed;
    outline: 0;
    background-color: white;
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
