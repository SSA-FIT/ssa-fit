import React, { useCallback, useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import {
  updateProfileInfo as ProfileSagaUpdate,
  putProfileInfo as ProfileSagaPut,
} from '../../redux/modules/profile';
import { RootState } from '../../types/authTypes';
import useProfileInfo from '../../hooks/useProfileInfo';
import { UserInfo, ProfileRequest } from '../../types/profileTypes';
import ProfileService from '../../services/ProfileService';
import { logout as logoutSagaStart } from '../../redux/modules/auth';

const ProfileCard: React.FC = () => {
  const [nonUser, setNonUser] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [delOpen, setDelOpen] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>('수정');
  const [inputDisabled, setInputDisabled] = useState<boolean>(true);
  const [newGender, setNewGender] = useState<string>('');
  const [newHeight, setNewHeight] = useState<string>('');
  const [newWeight, setNewWeight] = useState<string>('');
  const [newBirth, setNewBirth] = useState<string>('');
  const [newNickname, setNewNickname] = useState<string>('');
  const [userLevelChange, setUserLevelChange] = useState<string>('');
  const [userLevelIcon, setUserLevelIcon] = useState<string>('');
  const [delPassword, setDelPassword] = useState<string>('');
  const [levelError, setLevelError] = useState<boolean>(false);

  const [selfTest1, setSelfTest1] = useState<number>(1);
  const [selfTest2, setSelfTest2] = useState<number>(1);
  const [selfTest3, setSelfTest3] = useState<number>(1);
  const [selfTest4, setSelfTest4] = useState<number>(1);
  const [selfTest5, setSelfTest5] = useState<number>(0);
  const [selfTest6, setSelfTest6] = useState<number>(0);
  const [selfTestSum, setSelfTestSum] = useState<number>(4);

  const profileInfo: UserInfo | null = useProfileInfo();
  const dispatch = useDispatch();
  const oldProfileRequest = {
    height: profileInfo?.height,
    weight: profileInfo?.weight,
    level: profileInfo?.level,
    birth: profileInfo?.birth,
    gender: profileInfo?.gender,
    nickname: profileInfo?.nickname,
  };

  const handleHeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewHeight(event.target.value);
  };

  const handleWeight = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeight(event.target.value);
  };

  const handleBirth = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewBirth(event.target.value);
  };

  const handleNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDelPassword(event.target.value);
  };

  const newProfile = {
    height: newHeight,
    weight: newWeight,
    level: userLevelChange,
    birth: newBirth,
    gender: newGender,
    nickname: newNickname,
  };

  const putprofileInfo = useCallback(() => {
    dispatch(ProfileSagaPut());
  }, [dispatch]);

  useEffect(() => {
    putprofileInfo();
  }, [putprofileInfo]);

  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );

  useEffect(() => {
    if (profileInfo !== null) {
      setNonUser(true);
      setNewGender(profileInfo.gender);
      setUserLevelChange(profileInfo.level);
      setNewHeight(profileInfo.height);
      setNewWeight(profileInfo.weight);
      setNewNickname(profileInfo.nickname);
      setNewBirth(profileInfo.birth);
    }
  }, [profileInfo]);

  const handleGender = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNonUser(false);
    const gender = event.target.value;
    if (gender === '남') setNewGender('남');
    else if (gender === '여') setNewGender('여');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleClickDelOpen = () => {
    setDelOpen(true);
  };

  const handleDelClose = () => {
    setDelOpen(false);
  };
  const [alignment1, setAlignment1] = React.useState('level1');
  const [alignment2, setAlignment2] = React.useState('one');
  const [alignment3, setAlignment3] = React.useState('30min');
  const [alignment4, setAlignment4] = React.useState('3stairs');
  const [alignment5, setAlignment5] = React.useState('shoulderpoint0');
  const [alignment6, setAlignment6] = React.useState('legpoint0');

  const handleCloseCancelButton = () => {
    setOpen(false);

    setAlignment1('level1');
    setAlignment2('one');
    setAlignment3('30min');
    setAlignment4('3stairs');
    setAlignment5('shoulderpoint0');
    setAlignment6('legpoint0');
  };

  const handleDelCloseCancleButton = () => {
    setDelOpen(false);
  };

  const handleCloseDeleteButton = () => {
    setDelOpen(false);
    if (delPassword !== null && token !== null) {
      ProfileService.deleteUserInfo({ password: delPassword }, token)
        .then(({ message }) => {
          Swal.fire({
            icon: 'success',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          dispatch(logoutSagaStart());
        })
        .catch((error) => {
          const { status, message } = error.response.data;
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          if (status === 403) {
            Swal.fire({
              icon: 'error',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
          } else if (status === 500) {
            Swal.fire({
              icon: 'error',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
    }
  };

  const handleCloseFinishButton = () => {
    setOpen(false);

    if (selfTestSum >= 4 && selfTestSum < 9) {
      setUserLevelChange('씨앗');
      setUserLevelIcon('🌱');
    }

    if (selfTestSum >= 9 && selfTestSum < 15) {
      setUserLevelChange('새싹');
      setUserLevelIcon('🌿');
    }

    if (selfTestSum >= 15 && selfTestSum < 21) {
      setUserLevelChange('나무');
      setUserLevelIcon('🌳');
    }

    if (selfTestSum >= 21 && selfTestSum < 24) {
      setUserLevelChange('열매');
      setUserLevelIcon('🍎');
    }
  };

  useEffect(() => {
    if (userLevelChange !== '') setLevelError(false);
  }, [userLevelChange]);

  const handleChange1 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment1(newAlignment);
  };

  const handleChange2 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment2(newAlignment);
  };

  const handleChange3 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment3(newAlignment);
  };

  const handleChange4 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment4(newAlignment);
  };

  const handleChange5 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment5(newAlignment);
  };

  const handleChange6 = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment6(newAlignment);
  };

  useEffect(() => {
    switch (alignment1) {
      case 'level1':
        setSelfTest1(1);
        break;
      case 'level2':
        setSelfTest1(2);
        break;
      case 'level3':
        setSelfTest1(3);
        break;
      case 'level4':
        setSelfTest1(4);
        break;

      default:
    }
  }, [alignment1]);

  useEffect(() => {
    switch (alignment2) {
      case 'one':
        setSelfTest2(1);
        break;
      case 'two':
        setSelfTest2(2);
        break;
      case 'three':
        setSelfTest2(3);
        break;
      case 'four':
        setSelfTest2(4);
        break;

      default:
    }
  }, [alignment2]);

  useEffect(() => {
    switch (alignment3) {
      case '30min':
        setSelfTest3(1);
        break;
      case '1hour':
        setSelfTest3(2);
        break;
      case '2hour':
        setSelfTest3(3);
        break;
      case 'many':
        setSelfTest3(4);
        break;

      default:
    }
  }, [alignment3]);

  useEffect(() => {
    switch (alignment4) {
      case '3stairs':
        setSelfTest4(1);
        break;
      case '6stairs':
        setSelfTest4(2);
        break;
      case '9stairs':
        setSelfTest4(3);
        break;
      case '10stairs':
        setSelfTest4(4);
        break;

      default:
    }
  }, [alignment4]);

  useEffect(() => {
    switch (alignment5) {
      case 'shoulderpoint0':
        setSelfTest5(0);
        break;
      case 'shoulderpoint2':
        setSelfTest5(2);
        break;
      case 'shoulderpoint4':
        setSelfTest5(4);
        break;

      default:
    }
  }, [alignment5]);

  useEffect(() => {
    switch (alignment6) {
      case 'legpoint0':
        setSelfTest6(0);
        break;
      case 'legpoint2':
        setSelfTest6(2);
        break;
      case 'legpoint4':
        setSelfTest6(4);
        break;

      default:
    }
  }, [alignment6]);

  useEffect(() => {
    const sum =
      selfTest1 + selfTest2 + selfTest3 + selfTest4 + selfTest5 + selfTest6;
    setSelfTestSum(sum);
  }, [selfTest1, selfTest2, selfTest3, selfTest4, selfTest5, selfTest6]);

  let history = useHistory();
  const handleCancelButton = () => {
    history.goBack();
  };

  const handleConfirmButton = (event: React.MouseEvent<HTMLElement>) => {
    if (buttonText === '수정') {
      setInputDisabled(false);
      setButtonText('확인');
    } else {
      newProfileInfo();
      setInputDisabled(true);
      setButtonText('수정');
    }
  };

  const updateProfileAuth = useCallback(
    (requestData) => {
      dispatch(ProfileSagaUpdate(requestData));
    },
    [dispatch],
  );

  const newProfileInfo = () => {
    if (JSON.stringify(oldProfileRequest) !== JSON.stringify(newProfile)) {
      const RequestData: ProfileRequest = newProfile;
      if (token !== null) {
        updateProfileAuth(RequestData);
      }
    }
  };

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
                        {profileInfo?.userId}
                      </ProfileInfoFieldItem>
                      <NewPasswordWrapper>
                        <NewPassword to="/users/reset-password/verify">
                          비밀번호 재설정
                        </NewPassword>
                      </NewPasswordWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItem>
                        <ProfileInfoFieldName>이메일</ProfileInfoFieldName>
                        {profileInfo?.email}
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
                        <Input
                          type="text"
                          value={newNickname}
                          onChange={handleNickname}
                          disabled={inputDisabled}
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        생년월일
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          type="text"
                          value={newBirth}
                          onChange={handleBirth}
                          disabled={inputDisabled}
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        키(cm)<Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          type="text"
                          value={newHeight}
                          onChange={handleHeight}
                          disabled={inputDisabled}
                        />
                      </InputWrapper>
                    </ProfileInfoFieldItemWrapper>
                    <ProfileInfoFieldItemWrapper>
                      <ProfileInfoFieldItemLabel>
                        몸무게(kg)
                        <Requirement>필수입력</Requirement>
                      </ProfileInfoFieldItemLabel>
                      <InputWrapper>
                        <Input
                          type="text"
                          value={newWeight}
                          onChange={handleWeight}
                          disabled={inputDisabled}
                        />
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
                            value="남"
                            id="M"
                            name="gender"
                            checked={
                              (nonUser && newGender === '남') ||
                              newGender === '남'
                            }
                            disabled={inputDisabled}
                            onChange={handleGender}
                          />
                          <Gender htmlFor="M">남자</Gender>
                        </GenderSelect>
                        <GenderSelect>
                          <GenderInput
                            type="radio"
                            value="여"
                            id="FM"
                            name="gender"
                            checked={
                              (nonUser && newGender === '여') ||
                              newGender === '여'
                            }
                            disabled={inputDisabled}
                            onChange={handleGender}
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
                      <ProfileInfoFieldItem>
                        {userLevelChange}
                        {userLevelIcon}
                      </ProfileInfoFieldItem>

                      <SelfExerciseLevelButtonWrapper>
                        {userLevelChange === '' ? (
                          <SelfExerciseLevelButton
                            onClick={handleClickOpen}
                            className={levelError ? 'have-error' : ''}
                            disabled={inputDisabled}
                          >
                            자가 체력 진단
                          </SelfExerciseLevelButton>
                        ) : (
                          <SelfExerciseLevelButton
                            onClick={handleClickOpen}
                            disabled={inputDisabled}
                          >
                            자가 체력 재진단
                          </SelfExerciseLevelButton>
                        )}

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
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment2}
                                exclusive
                                onChange={handleChange2}
                              >
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
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment3}
                                exclusive
                                onChange={handleChange3}
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
                              <Question>
                                4. 몇 층 계단부터 숨이 차나요?
                              </Question>
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment4}
                                exclusive
                                onChange={handleChange4}
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
                                등 뒤에서 한 팔은 위에서 아래도, 다른 한 팔은
                                아래에서 위로 손끝을 마주 붙인다. <br />
                                양쪽 다 닿지 않으면 : BAD
                                <br />
                                한쪽만 닿으면 : GOOD
                                <br /> 좌, 우 양쪽 다 손끝이 모두 닿으면 :
                                PERFECT
                              </QuestionDescription>
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment5}
                                exclusive
                                onChange={handleChange5}
                              >
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
                              <ToggleButtonGroup
                                color="primary"
                                value={alignment6}
                                exclusive
                                onChange={handleChange6}
                              >
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
                      {levelError && (
                        <ErrorWrapper>
                          <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </ProfileInfoFieldItemWrapper>
                  </ProfileInfoFieldValue>
                </ProfileInfoField>
                <WithdrawalWrapper>
                  <Withdrawal onClick={handleClickDelOpen}>
                    회원 탈퇴
                  </Withdrawal>
                </WithdrawalWrapper>

                <Dialog open={delOpen} onClose={handleDelClose}>
                  <MuiDialogTitle>회원 탈퇴</MuiDialogTitle>
                  <DialogContent>
                    회원탈퇴하시겠습니까? 탈퇴를 원하시면 비밀번호를
                    입력해주세요.
                  </DialogContent>
                  <InputWrapper>
                    <Input
                      type="password"
                      value={delPassword}
                      onChange={handlePassword}
                    />
                  </InputWrapper>
                  <DialogActions>
                    <DialogButton onClick={handleDelCloseCancleButton}>
                      취소
                    </DialogButton>
                    <DialogButton onClick={handleCloseDeleteButton}>
                      회원탈퇴
                    </DialogButton>
                  </DialogActions>
                </Dialog>
              </ProfileInfo>
            </ProfileInfoWrapper>

            <ConfirmWrapper>
              <Cancel onClick={handleCancelButton}>취소</Cancel>
              <ConfirmButton onClick={handleConfirmButton}>
                {buttonText}
              </ConfirmButton>
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

const NewPasswordWrapper = styled.div`
  margin-top: 1.2rem;
  text-align: right;
`;

const NewPassword = styled(Link)`
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

const WithdrawalWrapper = styled.div`
  justify-content: flex-start;
  margin-top: 2rem;
  @media (min-width: 1060px) {
    display: flex;
    justify-items: flex-start;
  }
`;

const Withdrawal = styled.button`
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

const ErrorWrapper = styled.div``;

// 22.4px보다 2px작게
const ErrorMessage = styled.span`
  font-size: 1.1rem;
  color: rgb(255, 119, 119);
  line-height: 1.5;
`;

export default ProfileCard;
