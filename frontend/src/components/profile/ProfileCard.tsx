import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState } from 'react';

const ProfileCard: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [alignment1, setAlignment1] = useState<string>('level1');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseCancelButton = () => {
    setOpen(false);
  };

  const handleCloseFinishButton = () => {
    setOpen(false);
  };

  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment1(newAlignment);
  };

  // 🌱씨앗 🌿새싹 🌳나무 🍎열매
  return (
    <>
      <ContainerWrapper>
        <Container>
          <Contents>
            <ContentName>회원정보 변경</ContentName>
            <RequiresWrapper>
              [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력
              사항입니다.]
            </RequiresWrapper>
            <ProfileInfoWrapper>
              <ProfileInfo>
                <ProfileInfoField>
                  <ProfileInfoFieldNameWrapper>
                    <ProfileInfoFieldTitle>기본 정보</ProfileInfoFieldTitle>
                  </ProfileInfoFieldNameWrapper>
                  <ProfileInfoFieldValue>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItem>
                        <ProfileInfoFieldName>아이디</ProfileInfoFieldName>
                        qwe123
                      </ProfileInfoFieldItem>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItem>
                        <ProfileInfoFieldName>이메일</ProfileInfoFieldName>
                        qwe123@naver.com
                      </ProfileInfoFieldItem>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItem>
                        <ProfileInfoFieldName>생년월일</ProfileInfoFieldName>
                        2022.03.28
                      </ProfileInfoFieldItem>
                    </ProfileInfoFieldItemWrapper>
                  </ProfileInfoFieldValue>
                </ProfileInfoField>
              </ProfileInfo>
              <ProfileInfo className="modify">
                <ProfileInfoField>
                  <ProfileInfoFieldNameWrapper>
                    <ProfileInfoFieldTitle>
                      기본 정보 수정
                    </ProfileInfoFieldTitle>
                  </ProfileInfoFieldNameWrapper>
                  <ProfileInfoFieldValue>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        닉네임
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input type="text" />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        키(cm)<Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input type="text" />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        몸무게(kg)
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input type="text" />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        성별
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <GenderSelectWrapper>
                        <GenderSelect>
                          <GenderInput
                            type="radio"
                            value="M"
                            id="M"
                            name="gender"
                          />
                          <Gender htmlFor="M">남자</Gender>
                        </GenderSelect>
                        <GenderSelect>
                          <GenderInput
                            type="radio"
                            value="FM"
                            id="FM"
                            name="gender"
                          />
                          <Gender htmlFor="FM">여자</Gender>
                        </GenderSelect>
                      </GenderSelectWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        운동레벨
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <ProfileInfoFieldItem>🌱씨앗</ProfileInfoFieldItem>

                      <SelfExerciseLevelButtonWrapper>
                        <SelfExerciseLevelButton onClick={handleClickOpen}>
                          자가 체력 진단
                        </SelfExerciseLevelButton>
                        <Dialog open={open} onClose={handleClose}>
                          <MuiDialogTitle>
                            운동 레벨 자가 체력 진단
                          </MuiDialogTitle>
                          <DialogContent>
                            <MuiDialogContentText>
                              운동 추천을 위한 자가 체력 진단입니다. 평소 생활을
                              돌아보며 답해주세요.
                            </MuiDialogContentText>
                          </DialogContent>
                          <ToggleButtonWrapper>
                            <QuestionWrapper>
                              <Question>
                                1. 내가 생각하는 나의 운동 레벨은 어느
                                정도인가요?
                              </Question>
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment1}
                                exclusive
                                onChange={handleChange1}
                              >
                                <MuiToggleButton value="level1">
                                  초보
                                </MuiToggleButton>
                                <MuiToggleButton value="level2">
                                  하수
                                </MuiToggleButton>
                                <MuiToggleButton value="level3">
                                  중수
                                </MuiToggleButton>
                                <MuiToggleButton value="level4">
                                  고수
                                </MuiToggleButton>
                              </ToggleButtonGroup>
                            </QuestionWrapper>
                            <QuestionWrapper>
                              <Question>2. 1주일 운동 몇 회 하나요?</Question>
                              <ToggleButtonGroup color="primary" exclusive>
                                <MuiToggleButton value="one">
                                  0회
                                </MuiToggleButton>
                                <MuiToggleButton value="two">
                                  1~2회
                                </MuiToggleButton>
                                <MuiToggleButton value="three">
                                  3~4회
                                </MuiToggleButton>
                                <MuiToggleButton value="four">
                                  5회 이상
                                </MuiToggleButton>
                              </ToggleButtonGroup>
                            </QuestionWrapper>
                            <QuestionWrapper>
                              <Question>
                                3. 1회 운동 시, 몇 시간 하나요?
                              </Question>
                              <ToggleButtonGroup color="primary" exclusive>
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
                              <Question>
                                4. 몇 층 계단부터 숨이 차나요?
                              </Question>
                              <ToggleButtonGroup color="primary" exclusive>
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
                                등 뒤에서 한 팔은 위에서 아래도, 다른 한 팔은
                                아래에서 위로 손끝을 마주 붙인다. <br />
                                양쪽 다 닿지 않으면 : BAD
                                <br />
                                한쪽만 닿으면 : GOOD
                                <br /> 좌, 우 양쪽 다 손끝이 모두 닿으면 :
                                PERFECT
                              </QuestionDescription>
                              <ToggleButtonGroup color="primary" exclusive>
                                <MuiToggleButton value="shoulderpoint0">
                                  BAD
                                </MuiToggleButton>
                                <MuiToggleButton value="shoulderpoint2">
                                  GOOD
                                </MuiToggleButton>
                                <MuiToggleButton value="shoulderpoint4">
                                  PERFECT
                                </MuiToggleButton>
                              </ToggleButtonGroup>
                            </QuestionWrapper>
                            <QuestionWrapper>
                              <Question className="Test">
                                6. 다리 근력 테스트를 해보세요.
                              </Question>
                              <QuestionDescription>
                                한손 끝으로 벽을 잡고 옆으로 선 다음 한쪽 다리를
                                위로 올려 들고서 무릎을 굽혀 완전히
                                내려앉았다(1초 이상 멈춘 후) 일어선다. <br />
                                양쪽 다 설 수 없으면 : BAD
                                <br />
                                한쪽만 일어설 수 있으면 : GOOD
                                <br />
                                양쪽 다 일어설 수 있으면 : PERFECT
                              </QuestionDescription>
                              <ToggleButtonGroup color="primary" exclusive>
                                <MuiToggleButton value="legpoint0">
                                  BAD
                                </MuiToggleButton>
                                <MuiToggleButton value="legpoint2">
                                  GOOD
                                </MuiToggleButton>
                                <MuiToggleButton value="legpoint4">
                                  PERFECT
                                </MuiToggleButton>
                              </ToggleButtonGroup>
                            </QuestionWrapper>
                          </ToggleButtonWrapper>
                          <DialogActions>
                            <DialogButton onClick={handleCloseCancelButton}>
                              취소
                            </DialogButton>
                            <DialogButton onClick={handleCloseFinishButton}>
                              진단 마치기
                            </DialogButton>
                          </DialogActions>
                        </Dialog>
                      </SelfExerciseLevelButtonWrapper>
                    </ProfileInfoFieldItemWrapper>
                  </ProfileInfoFieldValue>
                </ProfileInfoField>
              </ProfileInfo>
            </ProfileInfoWrapper>
            <ConfirmWrapper>
              <Cancel>취소</Cancel>
              <ConfirmButton>확인</ConfirmButton>
            </ConfirmWrapper>
          </Contents>
        </Container>
      </ContainerWrapper>
    </>
  );
};

const ContainerWrapper = styled.div``;

const Container = styled.div`
  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;
  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 0 10rem;
  }
`;

const ContentName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;
  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
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

const ProfileInfoWrapper = styled.div`
  margin-top: 2rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 6rem;
  }
`;

const ProfileInfo = styled.div`
  margin: 0;
  border: 1px solid #d9dbe1;
  padding: 2.5rem 2rem;
  &.modify {
    border-top: 0;
  }

  @media (min-width: 1060px) {
    padding: 4rem;
  }
`;

const ProfileInfoField = styled.div`
  margin-bottom: 0;
  margin-top: 0;

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ProfileInfoFieldNameWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;

  @media (min-width: 1060px) {
    flex: 4;
    margin-bottom: 0;
  }
`;

const ProfileInfoFieldTitle = styled.h3`
  display: inline-block;
  margin-bottom: 0;
  margin-top: 0;
  color: #000;
  font-weight: 700;
  font-size: 1.5rem;
  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ProfileInfoFieldValue = styled.div`
  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    flex: 8;
  }
`;

const ProfileInfoFieldItemWrapper = styled.div`
  margin-top: 4rem;

  @media (min-width: 1060px) {
    width: 100%;
  }
`;

const ProfileInfoFieldItem = styled.p`
  display: block;
  width: 100%;
  height: auto;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #d9dbe1;
  font-size: 1.6rem;
  color: #000;
  line-height: 1.5;

  @media (min-width: 1060px) {
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ProfileInfoFieldName = styled.strong`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;
  @media (min-width: 1060px) {
    margin-bottom: 2rem;
  }
`;

const ProfileInfoFieldItemLabel = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
`;

const Requirement = styled.span`
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

const InputWrapper = styled.div`
  position: relative;
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
  margin-top: 1.2rem;
  text-align: right;
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

const MuiDialogTitle = styled(DialogTitle)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const MuiDialogContentText = styled(DialogContentText)`
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  padding-bottom: 16px;
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

const ConfirmWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  justify-items: flex-start;
  margin: 4rem 0;
  margin-bottom: 0;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    justify-content: center;
    margin: 6rem 0;
  }
`;

const Cancel = styled.a`
  flex: 6;
  margin-right: 0.4rem;
  background-color: #fff;
  color: #013066;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #013066;
  border-radius: 0.2rem;
  font-weight: 700;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;

  @media (min-width: 1060px) {
    flex: none;

    width: auto;
    min-width: 24rem;
    padding: 1.5rem 2rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const ConfirmButton = styled.button`
  flex: 6;
  margin-right: 0.4rem;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  display: block;
  width: 100%;
  margin: 0;
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

  @media (min-width: 1060px) {
    flex: none;
    display: inline-block;
    width: auto;
    min-width: 24rem;
    padding: 1.5rem 2rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;
export default ProfileCard;
