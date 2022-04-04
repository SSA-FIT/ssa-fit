import styled from '@emotion/styled';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoNotDisturbOnOutlinedIcon from '@mui/icons-material/DoNotDisturbOnOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import CircleIcon from '@mui/icons-material/Circle';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const [nonUserDialogOpen, setNonUserDialogOpen] = useState<boolean>(false);
  const token = useToken();
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<string>('0');
  const [setCount, setSetCount] = useState<string>('0');
  const [hour, setHour] = useState<string>('00');
  const [minute, setMinute] = useState<string>('00');
  const [second, setSecond] = useState<string>('00');
  const [exerciseRecords, setExerciseRecords] = useState<recoRecordList>();
  const [exerciseRecordList, setExerciseRecordList] = useState<recoRecord[]>(
    [],
  );
  const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(true);
  const handleRepeatCountOnChage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRepeatCount(event.target.value);
  };

  const handleSetCountOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSetCount(event.target.value);
  };

  const handleHourOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHour(event.target.value);
  };

  const handleMinuteOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(event.target.value);
  };

  const handleSecondOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecond(event.target.value);
  };

  // useEffect(() => {
  //   if (nonUserDialogOpen) {
  //     controlExerciseRecordList(videoIndex);
  //   }
  // }, [nonUserDialogOpen]);

  useEffect(() => {
    if (parseInt(repeatCount, 10) > 0) {
      if (!onlyNumberReg.test(repeatCount)) {
        setNextButtonDisabled(true);
      }
    }
    if (parseInt(setCount, 10) > 0) {
      if (!onlyNumberReg.test(setCount)) {
        setNextButtonDisabled(true);
      }
    }
    if (parseInt(hour, 10) > 0) {
      if (!onlyNumberReg.test(hour)) {
        setNextButtonDisabled(true);
      }
    }
    if (parseInt(minute, 10) > 0) {
      if (!onlyNumberReg.test(minute)) {
        setNextButtonDisabled(true);
      }
    }
    if (parseInt(second, 10) > 0) {
      if (!onlyNumberReg.test(second)) {
        setNextButtonDisabled(true);
      }
    }

    if (
      (parseInt(repeatCount, 10) > 0 && parseInt(setCount, 10) > 0) ||
      parseInt(hour + minute + second, 10) > 0
    ) {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }

    if (parseInt(repeatCount, 10) > 0) {
      if (parseInt(setCount, 10) > 0) {
        setNextButtonDisabled(false);
      } else {
        setNextButtonDisabled(true);
      }
    }

    if (parseInt(setCount, 10) > 0) {
      if (parseInt(repeatCount, 10) > 0) {
        setNextButtonDisabled(false);
      } else {
        setNextButtonDisabled(true);
      }
    }
  }, [repeatCount, setCount, hour, minute, second]);

  const handlePrevButton = (event: React.MouseEvent) => {
    setVideoIndex(videoIndex - 1);
  };

  const resetRecordItem = () => {
    setRepeatCount('0');
    setSetCount('0');
    setHour('0');
    setMinute('0');
    setSecond('0');
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
          countPerSet: `${parseInt(repeatCount, 10) * parseInt(setCount, 10)}`,
          setCount: parseInt(setCount, 10),
          durationTime: `${hour}:${minute}:${second}`,
        },
      ]);
      return true;
    }
    const tempExerciseRecordList = [...exerciseRecordList];

    tempExerciseRecordList[findExerciseId] = {
      id: userVideoSelectList[videoIndex].id,
      countPerSet: `${
        parseInt(exerciseRecordList[findExerciseId].countPerSet, 10) +
        parseInt(repeatCount, 10) * parseInt(setCount, 10)
      }`,
      setCount:
        exerciseRecordList[findExerciseId].setCount + parseInt(setCount, 10),
      durationTime: `${
        parseInt(hour, 10) +
        parseInt(
          exerciseRecordList[findExerciseId].durationTime.split(':')[0],
          10,
        )
      }:${
        parseInt(minute, 10) +
        parseInt(
          exerciseRecordList[findExerciseId].durationTime.split(':')[1],
          10,
        )
      }:${
        parseInt(second, 10) +
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
            {/* {videoIndex !== 0 ? (
              <PrevButton onClick={handlePrevButton}>
                <ArrowBackIosNewIcon />
              </PrevButton>
            ) : (
              <PrevButton disabled>
                <ArrowBackIosNewIcon />
              </PrevButton>
            )} */}
          </PrevButtonWrapper>
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
              <InputName>반복 횟수</InputName>
              <Input
                value={repeatCount}
                type="text"
                maxLength={3}
                onChange={handleRepeatCountOnChage}
              />
            </InputWrapper>
            <InputWrapper>
              <InputName>세트 수</InputName>
              <Input
                value={setCount}
                type="number"
                maxLength={3}
                onChange={handleSetCountOnChange}
              />
            </InputWrapper>
            <InputWrapper>
              <InputName>운동 시간</InputName>
              <TimeInputWrapper>
                <TimeInput
                  value={hour}
                  placeholder="시간"
                  type="number"
                  maxLength={2}
                  onChange={handleHourOnChange}
                />

                <TimeInput
                  value={minute}
                  placeholder="분"
                  type="number"
                  maxLength={2}
                  onChange={handleMinuteOnChange}
                />
                <TimeInput
                  value={second}
                  placeholder="초"
                  type="number"
                  maxLength={2}
                  onChange={handleSecondOnChange}
                />
              </TimeInputWrapper>
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
