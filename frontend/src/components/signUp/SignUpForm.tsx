import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import UserService from '../../services/UserService';
import { IdCheckRequest, SignUpData } from '../../types/commonTypes';
import { regId, regPw } from '../../utils/RegExpressions';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
  userEmail: string;
  userHeight: string;
  userWeight: string;
  userBirth: string;
  userGender: string;
  userLevel: string;
}

const SignUpForm: React.FC<Props> = ({
  setSignUpStep,
  userEmail,
  userHeight,
  userWeight,
  userBirth,
  userGender,
  userLevel,
}) => {
  const [userId, setUserId] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  // 유효성 검사
  const [isId, setIsId] = useState<boolean>(false);
  const [idCheckRequestButton, setIdCheckRequestButton] =
    useState<boolean>(false);

  const [isIdConfirm, setIsIdConfirm] = useState<boolean>(false);

  const [userPw, setUserPw] = useState<string>('');
  const [pwMessage, setPwMessage] = useState<string>('');
  // 유효성 검사
  const [isPw, setIsPw] = useState<boolean>(false);

  const [userPwConfirm, setUserPwConfirm] = useState<string>('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string>('');
  // 유효성 검사
  const [isPwConfirm, setIsPwConfirm] = useState<boolean>(false);
  const [userNickname, setUserNickname] = useState<string>('');

  const [idError, setIdError] = useState<boolean>(false);
  const [pwError, setPwError] = useState<boolean>(false);
  const [pwcheckError, setPwcheckError] = useState<boolean>(false);
  const [nicknameError, setNicknameError] = useState<boolean>(false);
  const [signUpFormComplete, setSignUpFormComplete] = useState<boolean>(false);

  const checkId = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 형식에 맞는 경우 true 리턴

    // console.log('아이디 유효성 검사 :: ', regId.test(event.target.value));

    setIdError(false);
    const idCurrent = event.target.value;
    setUserId(idCurrent);

    if (!regId.test(idCurrent)) {
      setIdMessage('아이디 형식이 올바르지 않습니다.');
      setIsId(false);
      setIdCheckRequestButton(true);
    } else {
      setIdMessage('');
      setIdCheckRequestButton(false);
      setIsId(true);
    }
  };

  const idCheckRequest = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const data: IdCheckRequest = { id: '' };
    data.id = userId;
    UserService.getIdCheckRequest(data)
      .then(({ message }) => {
        // alert(message);
        Swal.fire({
          icon: 'success',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setIsIdConfirm(true);
        setIdCheckRequestButton(true);
        // console.log(message);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        // console.log('에러 :: ', message);
        // alert(message);
        setIdMessage(message);
        if (status === 409) {
          setIdMessage(message);
        } else if (status === 500) {
          setIdMessage(message);
        }
      });
  };

  const checkPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 형식에 맞는 경우 true 리턴

    // console.log('비밀번호 유효성 검사 :: ', regPw.test(event.target.value));

    setPwError(false);
    const pwCurrent = event.target.value;
    setUserPw(pwCurrent);

    if (!regPw.test(pwCurrent)) {
      setPwMessage('비밀번호 형식이 올바르지 않습니다.');
      setIsPw(false);
    } else {
      setPwMessage('');
      setIsPw(true);
    }
  };

  const doubleCheckPw = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 형식에 맞는 경우 true 리턴

    setPwcheckError(false);
    const pwCurrent = event.target.value;
    setUserPwConfirm(pwCurrent);

    // console.log('pwCurrent :: ', pwCurrent);
    // console.log('userPwConfirm :: ', userPwConfirm);
  };

  useEffect(() => {
    if (userPwConfirm === userPw && isPw) {
      setPwConfirmMessage('');
      setIsPwConfirm(true);
    } else {
      setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
      setIsPwConfirm(false);
    }
  }, [userPw, userPwConfirm]);

  const getNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNicknameError(false);
    const nickname = event.target.value;
    setUserNickname(nickname);
    // console.log('userNickname :: ', userNickname);
  };

  const handleNext = () => {
    if (!isIdConfirm) setIdError(true);
    // console.log(isPwConfirm);
    if (userPw === '') setPwError(true);
    if (userPwConfirm === '') setPwcheckError(true);
    if (userNickname === '') setNicknameError(true);

    if (isIdConfirm && isPwConfirm && userNickname !== '') {
      setSignUpFormComplete(true);
      const data: SignUpData = {
        height: '',
        weight: '',
        level: '',
        birth: '',
        gender: '',
        userId: '',
        nickname: '',
        email: '',
        password: '',
      };
      data.height = userHeight;
      data.weight = userWeight;
      data.level = userLevel;
      data.birth = userBirth;
      data.gender = userGender;
      data.userId = userId;
      data.nickname = userNickname;
      data.email = userEmail;
      data.password = userPw;

      UserService.userSignUp(data)
        .then(({ message }) => {
          // console.log(data);
          // console.log(data.email);
          // alert(message);
          setSignUpStep(4);
        })
        .catch((error) => {
          const { status, message } = error.response.data;
          alert(message);
          if (status === 400) {
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

  const handleBefore = () => {
    setSignUpStep(2);
  };

  return (
    <>
      <Container>
        <StepName>회원정보 입력</StepName>
        <StepDescription>
          서비스 이용을 위해 회원 정보를 입력해주세요.
        </StepDescription>
        <RequiresWrapper>
          [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력 사항입니다.]
        </RequiresWrapper>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>회원정보 (필수)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputFieldWrapper>
              <InputName>
                아이디
                <InputRequireLabel>필수입력</InputRequireLabel>
                <InputDescription>
                  영문+숫자 6자~12자 이내 입력 가능, 특수문자 입력 불가
                </InputDescription>
              </InputName>
              <InputAndButtonWrapper>
                <InputWrapper>
                  <Input
                    type="text"
                    onChange={checkId}
                    disabled={isIdConfirm}
                    className={idMessage !== '' || idError ? 'have-error' : ''}
                  />
                </InputWrapper>
                <OverlapConfirmButton
                  onClick={idCheckRequest}
                  disabled={idCheckRequestButton}
                >
                  중복 확인
                </OverlapConfirmButton>
              </InputAndButtonWrapper>
              {idError && (
                <ErrorWrapper>
                  <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
                </ErrorWrapper>
              )}
              {userId.length > 0 && (
                <span className={`message ${isId ? 'success' : 'error'}`}>
                  {idMessage}
                </span>
              )}
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputName>
                비밀번호
                <InputRequireLabel>필수입력</InputRequireLabel>
                <InputDescription>
                  영문+숫자 6자~12자 이내 입력 가능, 특수문자 입력 불가
                </InputDescription>
              </InputName>
              <Input
                type="password"
                onChange={checkPw}
                className={pwMessage !== '' || pwError ? 'have-error' : ''}
              />
            </InputFieldWrapper>
            {pwError && (
              <ErrorWrapper>
                <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
              </ErrorWrapper>
            )}
            {userPw.length > 0 && (
              <span className={`message ${isPw ? 'success' : 'error'}`}>
                {pwMessage}
              </span>
            )}
            <InputFieldWrapper>
              <InputName>
                비밀번호 확인
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input
                type="password"
                onChange={doubleCheckPw}
                className={
                  (!isPwConfirm && userPwConfirm !== '') || pwcheckError
                    ? 'have-error'
                    : ''
                }
              />
            </InputFieldWrapper>
            {pwcheckError && (
              <ErrorWrapper>
                <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
              </ErrorWrapper>
            )}
            {userPwConfirm.length > 0 && (
              <span className={`message ${isPwConfirm ? 'success' : 'error'}`}>
                {pwConfirmMessage}
              </span>
            )}
            <InputFieldWrapper>
              <InputName>
                닉네임
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <InputAndButtonWrapper>
                <InputWrapper>
                  <Input
                    value={userNickname}
                    onChange={getNickname}
                    className={nicknameError ? 'have-error' : ''}
                  />
                </InputWrapper>
                {/* <OverlapConfirmButton>중복 확인</OverlapConfirmButton> */}
              </InputAndButtonWrapper>

              {nicknameError && (
                <ErrorWrapper>
                  <ErrorMessage>필수 입력 항목입니다.</ErrorMessage>
                </ErrorWrapper>
              )}
            </InputFieldWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton onClick={handleBefore}>이전</CancelButton>
          <ConfirmButton
            onClick={handleNext}
            className={signUpFormComplete ? 'complete' : ''}
          >
            확인
          </ConfirmButton>
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

const InputFieldWrapper = styled.div`
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

const InputDescription = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: #00256c;
  font-size: 1.4rem;
  line-height: 1.58;
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  margin-right: 2rem;
  flex: 1;
  position: relative;
  @media (min-width: 1060px) {
    margin-right: 1.2rem;
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

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const OverlapConfirmButton = styled.button`
  margin-top: 0.4rem;
  color: #555;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
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

  @media (min-width: 1060px) {
    margin-top: 0.8rem;
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  &:disabled {
    background: rgb(247, 248, 250);
    color: rgb(194, 200, 204);
    border-color: rgb(218, 220, 224);
    cursor: not-allowed;
  }

  &.have-error {
    cursor: not-allowed;
  }

  &.checked {
    border-color: blue;
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
  background: rgb(247, 248, 250);
  color: rgb(194, 200, 204);
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  &.complete {
    background-color: #013066;
    color: #fff;
  }
`;

const ErrorWrapper = styled.div`
  margin: 1rem 0 0.8rem;
`;

// 22.4px보다 2px작게
const ErrorMessage = styled.span`
  font-size: 20px;
  color: rgb(255, 119, 119);
  padding-left: 6px;
  line-height: 1.5;
`;

export default SignUpForm;
