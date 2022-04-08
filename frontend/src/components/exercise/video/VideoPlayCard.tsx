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
import Tooltip from '@mui/material/Tooltip';
import { push } from 'connected-react-router';
import { useDispatch } from 'react-redux';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import {
  recoRecord,
  recoRecordList,
  YoutubeVideo,
} from '../../../types/recommendationTypes';
import VideoPlayer from './VideoPlayer';
import useToken from '../../../hooks/useToken';
import RecommendationService from '../../../services/RecommendationService';
import NonUserDialog from '../NonUserDialog';

interface Props {
  userVideoSelectList: YoutubeVideo[];
}
const VideoPlayCard: React.FC<Props> = ({ userVideoSelectList }) => {
  const dispatch = useDispatch();
  const [duration, setDuration] = useState<string>('00:00:00');
  const [nonUserDialogOpen, setNonUserDialogOpen] = useState<boolean>(false);
  const token = useToken();
  const [videoIndex, setVideoIndex] = useState<number>(0);
  const [repeatCount, setRepeatCount] = useState<number>(0);
  const [bundleCount, setBundleCount] = useState<number>(0);

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

  const handleBundleCountOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setBundleCount(parseInt(event.target.value, 10));
    if (event.target.value === '') {
      setBundleCount(0);
    }
    if (event.target.value.length > 3) {
      setBundleCount(parseInt(event.target.value.slice(0, 3), 10));
    }
  };

  useEffect(() => {
    if ((repeatCount > 0 && bundleCount > 0) || duration !== '00:00:00') {
      setNextButtonDisabled(false);
    } else {
      setNextButtonDisabled(true);
    }
  }, [repeatCount, bundleCount, duration]);

  const resetRecordItem = () => {
    setRepeatCount(0);
    setBundleCount(0);
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
          countPerSet: repeatCount * bundleCount,
          setCount: bundleCount,
          durationTime: duration,
        },
      ]);
      return true;
    }
    const tempExerciseRecordList = [...exerciseRecordList];

    tempExerciseRecordList[findExerciseId] = {
      id: userVideoSelectList[videoIndex].id,
      countPerSet:
        exerciseRecordList[findExerciseId].countPerSet +
        repeatCount * bundleCount,
      setCount: exerciseRecordList[findExerciseId].setCount + bundleCount,
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
              html: `운동 성공! <br> 어제보다 건강해졌네요. <br> 내일 또 싸핏하러 오세요 🏃‍♂️`,
              showConfirmButton: false,
              timer: 3000,
            });
            dispatch(push('/'));
          })
          .catch((error) => {
            const { message } = error.response.data;
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
            {videoIndex + 1 !== userVideoSelectList.length && (
              <NextButton
                onClick={handleNextButton}
                disabled={nextButtonDisabled}
              >
                {nextButtonDisabled ? (
                  <Tooltip title="반복횟수/세트수 또는 시간을 입력해주세요.">
                    <ArrowForwardIosIcon />
                  </Tooltip>
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </NextButton>
            )}
            {videoIndex + 1 === userVideoSelectList.length &&
              (nextButtonDisabled ? (
                <Tooltip title="반복횟수/세트수 또는 시간을 입력해주세요.">
                  <span>
                    <FinishButton
                      onClick={handleNextButton}
                      disabled={nextButtonDisabled}
                    >
                      운동 완료
                      <WarningAmberRoundedIcon />
                    </FinishButton>
                  </span>
                </Tooltip>
              ) : (
                <FinishButton
                  onClick={handleNextButton}
                  disabled={nextButtonDisabled}
                >
                  운동 완료
                </FinishButton>
              ))}
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
                value={repeatCount}
                sx={{
                  color: '#00cdac',
                }}
              />
            </InputWrapper>
            <InputWrapper>
              <TextField
                onChange={handleBundleCountOnChange}
                id="outlined-number"
                label="세트 수"
                type="number"
                placeholder="5세트"
                InputLabelProps={{
                  shrink: true,
                }}
                value={bundleCount}
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
            <NonUserDialog
              nonUserDialogOpen={nonUserDialogOpen}
              exerciseRecordList={exerciseRecordList}
            />
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
    background-color: #00cdac;
    border-radius: 50%;
    cursor: pointer;
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
    background-color: #00cdac26;
    border-radius: 50%;
    cursor: pointer;
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
  color: #02aab0;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  background-color: white;
  border: none;
  cursor: pointer;

  &:hover {
    outline: 0;
    // border: 2px solid rgb(153, 51, 255);
    background-color: #02aab01a;
    border-radius: 0.3rem;
  }

  &:disabled {
    cursor: not-allowed;
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

export default VideoPlayCard;
