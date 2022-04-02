import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  setLevel: (level: string) => void;
}

const ExerciseModal: React.FC<Props> = ({ open, setOpen, setLevel }) => {
  const [levelScore, setLevelScore] = useState<number>(1);
  const [countScore, setCountScore] = useState<number>(1);
  const [timeScore, setTimeScore] = useState<number>(1);
  const [stairsScore, setStairsScore] = useState<number>(1);
  const [shoulderScore, setShoulderScore] = useState<number>(0);
  const [legScore, setLegScore] = useState<number>(0);

  const handleClose = (event: React.ReactEventHandler) => {
    setOpen(false);
  };

  const handleCloseCancelButton = (event: React.MouseEvent) => {
    setOpen(false);
  };

  const handleCloseFinishButton = (event: React.MouseEvent) => {
    const totalScore: number =
      levelScore +
      countScore +
      timeScore +
      stairsScore +
      shoulderScore +
      legScore;

    if (totalScore >= 4 && totalScore <= 8) {
      setLevel('씨앗');
    } else if (totalScore >= 9 && totalScore <= 14) {
      setLevel('새싹');
    } else if (totalScore >= 15 && totalScore <= 20) {
      setLevel('나무');
    } else if (totalScore >= 21 && totalScore <= 24) {
      setLevel('열매');
    }

    setOpen(false);
  };

  const handleChangeLevelScore = (
    event: React.MouseEvent<HTMLElement>,
    newLevelScore: number,
  ) => {
    setLevelScore(newLevelScore);
  };

  const handleChangeCountScore = (
    event: React.MouseEvent<HTMLElement>,
    newCountScore: number,
  ) => {
    setCountScore(newCountScore);
  };

  const handleChangeTimeScore = (
    event: React.MouseEvent<HTMLElement>,
    newTimeScore: number,
  ) => {
    setTimeScore(newTimeScore);
  };

  const handleChangeStairsScore = (
    event: React.MouseEvent<HTMLElement>,
    newStairsScore: number,
  ) => {
    setStairsScore(newStairsScore);
  };

  const handleChangeShoulderScore = (
    event: React.MouseEvent<HTMLElement>,
    newShoulderScore: number,
  ) => {
    setShoulderScore(newShoulderScore);
  };

  const handleChangeLegScore = (
    event: React.MouseEvent<HTMLElement>,
    newLegScore: number,
  ) => {
    setLegScore(newLegScore);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <MuiDialogTitle>운동 레벨 자가 체력 진단</MuiDialogTitle>
        <DialogContent>
          <MuiDialogContentText>
            운동 추천을 위한 자가 체력 진단입니다. 평소 생활을 돌아보며
            답해주세요.
          </MuiDialogContentText>
        </DialogContent>
        <ToggleButtonWrapper>
          <QuestionWrapper>
            <Question>
              1. 내가 생각하는 나의 운동 레벨은 어느 정도인가요?
            </Question>
            <ToggleButtonGroup
              color="primary"
              value={levelScore}
              exclusive
              onChange={handleChangeLevelScore}
            >
              <MuiToggleButton value={1}>초보</MuiToggleButton>
              <MuiToggleButton value={2}>하수</MuiToggleButton>
              <MuiToggleButton value={3}>중수</MuiToggleButton>
              <MuiToggleButton value={4}>고수</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
          <QuestionWrapper>
            <Question>2. 1주일 운동 몇 회 하나요?</Question>
            <ToggleButtonGroup
              color="primary"
              value={countScore}
              exclusive
              onChange={handleChangeCountScore}
            >
              <MuiToggleButton value={1}>0회</MuiToggleButton>
              <MuiToggleButton value={2}>1~2회</MuiToggleButton>
              <MuiToggleButton value={3}>3~4회</MuiToggleButton>
              <MuiToggleButton value={4}>5회 이상</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
          <QuestionWrapper>
            <Question>3. 1회 운동 시, 몇 시간 하나요?</Question>
            <ToggleButtonGroup
              color="primary"
              value={timeScore}
              exclusive
              onChange={handleChangeTimeScore}
            >
              <MuiToggleButton value={1}>30분 미만</MuiToggleButton>
              <MuiToggleButton value={2}>30분 이상 1시간 미만</MuiToggleButton>
              <MuiToggleButton value={3}>1시간 이상 2시간 미만</MuiToggleButton>
              <MuiToggleButton value={4}>2시간 이상</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
          <QuestionWrapper>
            <Question>4. 몇 층 계단부터 숨이 차나요?</Question>
            <ToggleButtonGroup
              color="primary"
              value={stairsScore}
              exclusive
              onChange={handleChangeStairsScore}
            >
              <MuiToggleButton value={1}>1층-3층</MuiToggleButton>
              <MuiToggleButton value={2}>4층-6층</MuiToggleButton>
              <MuiToggleButton value={3}>7층-9층</MuiToggleButton>
              <MuiToggleButton value={4}>10층 이상</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
          <QuestionWrapper>
            <Question className="Test">
              5. 어깨유연성 검사(좌, 우)를 해보세요.
            </Question>
            <QuestionDescription>
              등 뒤에서 한 팔은 위에서 아래도, 다른 한 팔은 아래에서 위로 손끝을
              마주 붙인다. <br />
              양쪽 다 닿지 않으면 : BAD
              <br />
              한쪽만 닿으면 : GOOD
              <br /> 좌, 우 양쪽 다 손끝이 모두 닿으면 : PERFECT
            </QuestionDescription>
            <ToggleButtonGroup
              color="primary"
              value={shoulderScore}
              exclusive
              onChange={handleChangeShoulderScore}
            >
              <MuiToggleButton value={0}>BAD</MuiToggleButton>
              <MuiToggleButton value={2}>GOOD</MuiToggleButton>
              <MuiToggleButton value={4}>PERFECT</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
          <QuestionWrapper>
            <Question className="Test">
              6. 다리 근력 테스트를 해보세요.
            </Question>
            <QuestionDescription>
              한손 끝으로 벽을 잡고 옆으로 선 다음 한쪽 다리를 위로 올려 들고서
              무릎을 굽혀 완전히 내려앉았다(1초 이상 멈춘 후) 일어선다. <br />
              양쪽 다 설 수 없으면 : BAD
              <br />
              한쪽만 일어설 수 있으면 : GOOD
              <br />
              양쪽 다 일어설 수 있으면 : PERFECT
            </QuestionDescription>
            <ToggleButtonGroup
              color="primary"
              value={legScore}
              exclusive
              onChange={handleChangeLegScore}
            >
              <MuiToggleButton value={0}>BAD</MuiToggleButton>
              <MuiToggleButton value={2}>GOOD</MuiToggleButton>
              <MuiToggleButton value={4}>PERFECT</MuiToggleButton>
            </ToggleButtonGroup>
          </QuestionWrapper>
        </ToggleButtonWrapper>
        <DialogActions>
          <DialogButton onClick={handleCloseCancelButton}>취소</DialogButton>
          <DialogButton onClick={handleCloseFinishButton}>
            진단 마치기
          </DialogButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ToggleButtonWrapper = styled.div`
  padding-top: 0px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

const Question = styled.div`
  margin-bottom: 16px;

  &.Test {
    margin-bottom: 8px;
  }
`;

const QuestionDescription = styled.div`
  margin-bottom: 16px;
  color: #00000099;
`;

const DialogButton = styled(Button)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  color: #013066;
`;

const WithdrawalWrapper = styled.div`
  justify-content: flex-start;
  margin-top: 2rem;
  @media (min-width: 1060px) {
    display: flex;
    justify-items: flex-start;
  }
`;

const Withdrawal = styled(Link)`
  position: relative;
  font-size: 1.4rem;
  text-decoration: none;
  @media (min-width: 1060px) {
    font-size: 1.6rem;
    display: inline-block;
    border: 0;
    background: none;
    color: #0064de;
    text-indent: 0;
  }
`;

const MuiDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const MuiDialogContentText = styled(DialogContentText)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-bottom: 16px;
`;

const MuiToggleButton = styled(ToggleButton)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
export default ExerciseModal;
