import * as React from 'react';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const BodyInfoForm: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [alignment, setAlignment] = React.useState('seed');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <>
      <Container>
        <StepName>신체정보 입력</StepName>
        <StepDescription>추천을 위해 신체 정보를 입력해주세요.</StepDescription>
        <RequiresWrapper>
          [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력 사항입니다.]
        </RequiresWrapper>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>신체정보 (필수)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputWrapper>
              <InputName>
                키(cm)
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                몸무게(kg)
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                생년월일
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input type="date" />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                성별
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <GenderSelectWrapper>
                <GenderSelect>
                  <GenderInput type="radio" value="M" id="M" name="gender" />
                  <Gender htmlFor="M">남자</Gender>
                </GenderSelect>
                <GenderSelect>
                  <GenderInput type="radio" value="FM" id="FM" name="gender" />
                  <Gender htmlFor="FM">여자</Gender>
                </GenderSelect>
              </GenderSelectWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputName>
                운동레벨
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <SelfExerciseLevelButtonWrapper>
                <SelfExerciseLevelButton onClick={handleClickOpen}>
                  자가 체력 진단
                </SelfExerciseLevelButton>
                <Dialog open={open} onClose={handleClose}>
                  <MuiDialogTitle>운동 레벨 자가 체력 진단</MuiDialogTitle>
                  <DialogContent>
                    <MuiDialogContentText>
                      운동 추천을 위한 자가 체력 진단입니다. 평소 생활을
                      돌아보며 답해주세요.
                    </MuiDialogContentText>
                  </DialogContent>
                  <ToggleButtonWrapper>
                    <QuestionWrapper>
                      <Question>
                        1. 내가 생각하는 나의 운동 레벨은 어느 정도인가요?
                      </Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="seed">🌱씨앗</MuiToggleButton>
                        <MuiToggleButton value="sprout">🌿새싹</MuiToggleButton>
                        <MuiToggleButton value="tree">🌳나무</MuiToggleButton>
                        <MuiToggleButton value="fruit">🍎열매</MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>2. 1주일 운동 몇 회 하나요?</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="one">0회</MuiToggleButton>
                        <MuiToggleButton value="two">1~2회</MuiToggleButton>
                        <MuiToggleButton value="three">3~4회</MuiToggleButton>
                        <MuiToggleButton value="four">5회 이상</MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>3. 1회 운동 시, 몇 시간 하나요?</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="30min">
                          30분 미만
                        </MuiToggleButton>
                        <MuiToggleButton value="1hour">
                          30분 이상 1시간 미만
                        </MuiToggleButton>
                        <MuiToggleButton value="2hour">
                          1시간 이상 2시간 미만
                        </MuiToggleButton>
                        <MuiToggleButton value="many">
                          2시간 이상
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question>4. 몇 층 계단부터 숨이 차나요?</Question>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="3stairs">
                          1층-3층
                        </MuiToggleButton>
                        <MuiToggleButton value="6stairs">
                          4층-6층
                        </MuiToggleButton>
                        <MuiToggleButton value="9stairs">
                          7층-9층
                        </MuiToggleButton>
                        <MuiToggleButton value="10stairs">
                          10층 이상
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question className="Test">
                        5. 어깨유연성 검사(좌, 우)를 해보세요.
                      </Question>
                      <QuestionDescription>
                        등 뒤에서 한 팔은 위에서 아래도, 다른 한 팔은 아래에서
                        위로 손끝을 마주 붙인다. <br />
                        양쪽 다 닿지 않으면 : 운동 부족 (0점) <br />
                        한쪽만 닿으면 : 좋음 (2점) <br /> 좌, 우 양쪽 다 손끝이
                        모두 닿으면 : 아주 좋음 (4점)
                      </QuestionDescription>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="shoulderpoint0">
                          0점
                        </MuiToggleButton>
                        <MuiToggleButton value="shoulderpoint2">
                          2점
                        </MuiToggleButton>
                        <MuiToggleButton value="shoulderpoint4">
                          4점
                        </MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                    <QuestionWrapper>
                      <Question className="Test">
                        6. 다리 근력 테스트를 해보세요.
                      </Question>
                      <QuestionDescription>
                        한손 끝으로 벽을 잡고 옆으로 선 다음 한쪽 다리를 위로
                        올려 들고서 무릎을 굽혀 완전히 내려앉았다(1초 이상 멈춘
                        후) 일어선다. <br />
                        양쪽 다 설 수 없으면 : 운동 부족 (0점) <br />
                        한쪽만 일어설 수 있으면 : 좋음 (2점) <br />
                        양쪽 다 일어설 수 있으면 : 아주 좋음 (4점)
                      </QuestionDescription>
                      <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                      >
                        <MuiToggleButton value="legpoint0">0점</MuiToggleButton>
                        <MuiToggleButton value="legpoint2">2점</MuiToggleButton>
                        <MuiToggleButton value="legpoint4">4점</MuiToggleButton>
                      </ToggleButtonGroup>
                    </QuestionWrapper>
                  </ToggleButtonWrapper>
                  <DialogActions>
                    <DialogButton onClick={handleClose}>취소</DialogButton>
                    <DialogButton onClick={handleClose}>
                      진단 마치기
                    </DialogButton>
                  </DialogActions>
                </Dialog>
              </SelfExerciseLevelButtonWrapper>
            </InputWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton>이전</CancelButton>
          <ConfirmButton>확인</ConfirmButton>
        </ConFirmWrapper>
      </Container>
    </>
  );
};

const Container = styled.div``;

const StepName = styled.h2`
  color: #00256c;
  font-weight: 700;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 2.4rem;
    line-height: 1.5;
  }
`;

const StepDescription = styled.p`
  display: block;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequiresWrapper = styled.div`
  box-sizing: border-box;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }

  @media (min-width: 1060px) {
    top: 0.95rem;
  }
`;

const ContentsWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  box-sizing: border-box;
  margin: 4rem 0;

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    padding: 4.6rem 4rem;
  }
`;

const ContentNameWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;

  @media (min-width: 1060px) {
    flex: 4;
    margin-bottom: 0;
  }
`;

const ContentName = styled.h3`
  display: inline-block;
  margin-bottom: 0;
  margin: 2rem 0 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 1.6rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    flex: 8;
  }
`;

const InputWrapper = styled.div`
  margin-top: 4rem;

  &:first-of-type {
    margin-top: 0;
  }
  @media (min-width: 1060px) {
    width: 100%;
  }
`;

const InputName = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
`;

const InputRequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }
`;

const Input = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #00256c;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const GenderSelectWrapper = styled.ul`
  list-style: none;
  margin: 2.2rem 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const GenderSelect = styled.li`
  position: relative;
  @media (min-width: 1060px) {
    width: 33.33333333%;
    padding-right: 1rem;
  }
`;

const GenderInput = styled.input`
  position: absolute;
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const Gender = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;
const SelfExerciseLevelButtonWrapper = styled.div`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const SelfExerciseLevelButton = styled.button`
  display: inline-block;
  min-width: 6.8rem;
  margin: 0;
  padding: 0.6rem 1.2rem 0.7rem;
  border-radius: 0.2rem;
  background-color: #fff;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 1px solid #00256c;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  @media (min-width: 1060px) {
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const ConFirmWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  justify-items: flex-start;
  margin: 4rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CancelButton = styled.button`
  flex: 6;
  margin-right: 0.4rem;
  background-color: #fff;
  color: #013066;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #013066;
  border-radius: 0.2rem;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const ConfirmButton = styled.button`
  flex: 6;
  margin-left: 0.4rem;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #013066;
  border-radius: 0.2rem;
  background-color: #013066;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const MuiDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const MuiDialogContentText = styled(DialogContentText)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const ToggleButtonWrapper = styled.div`
  padding-top: 0px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-left: 24px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

const MuiToggleButton = styled(ToggleButton)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
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

export default BodyInfoForm;
