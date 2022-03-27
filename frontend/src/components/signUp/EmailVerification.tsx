import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { regEmail } from '../../utils/RegExpressions';
import UserService from '../../services/UserService';
import { EmailCodeConfirm, EmailCodeRequest } from '../../types/commonTypes';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
  setUserEmail: (userEmail: string) => void;
}

const EmailVerification: React.FC<Props> = ({
  setSignUpStep,
  setUserEmail,
}) => {
  const handleBeforeButton = () => {
    setSignUpStep(0);
  };

  const handleNextButton = () => {
    if (emailConfirmComplete) {
      setSignUpStep(2);
    }
  };

  const [userEmailChange, setUserEmailChange] = useState<string>('');
  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailCodeRequestButton, setEmailCodeRequestButton] =
    useState<boolean>(true);
  const [emailCodeInputView, setEmailCodeInputView] = useState<boolean>(false);
  const [emailCodeConfirmButton, setEmailCodeConfirmButton] =
    useState<boolean>(true);
  const [emailCodeInput, setEmailCodeInput] = useState<string>('');
  const [emailConfirmComplete, setemailConfirmComplete] =
    useState<boolean>(false);

  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(59);
  const [timeout, setTimeout] = useState<boolean>(false);

  const UserEmailProps = (data: EmailCodeConfirm) => {
    const { userEmail } = data;

    // setSignUpStep(2);
    setUserEmail(userEmail);
  };

  // 이메일
  const checkEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 형식에 맞는 경우 true 리턴

    console.log('이메일 유효성 검사 :: ', regEmail.test(event.target.value));

    const emailCurrent = event.target.value;
    setUserEmailChange(emailCurrent);

    if (!regEmail.test(emailCurrent)) {
      setEmailMessage('이메일 형식이 올바르지 않습니다.');
      setIsEmail(false);
      setEmailCodeRequestButton(true);
    } else {
      setEmailMessage('');
      setEmailCodeRequestButton(false);
      setIsEmail(true);
    }
  };

  const emailCodeRequest = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    // console.log('userEmailChange :: ', userEmailChange);
    const data: EmailCodeRequest = { userEmail: '' };
    data.userEmail = userEmailChange;
    UserService.getEmailCodeRequest(data)
      .then(({ message }) => {
        alert(message);
        // console.log(message);
        setEmailCodeInputView(true);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        // console.log('에러 :: ', message);
        alert(message);
        if (status === 409) {
          alert(message);
        } else if (status === 500) {
          alert(message);
        }
      });
  };

  const checkEmailCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailCodeInput(event.target.value);
  };

  useEffect(() => {
    if (emailCodeInput !== '' && !timeout) {
      setEmailCodeConfirmButton(false);
    } else {
      setEmailCodeConfirmButton(true);
    }
  }, [emailCodeInput]);

  const emailCodeConfirm = () => {
    const data: EmailCodeConfirm = {
      code: '',
      userEmail: '',
    };
    data.code = emailCodeInput;
    data.userEmail = userEmailChange;
    UserService.getEmailCodeConfirm(data)
      .then(({ message }) => {
        // console.log('입력코드 :: ', data.code);
        setemailConfirmComplete(true);
        // setEmailCodeInputView(false);
        UserEmailProps(data);
        alert(message);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        setEmailCodeInput('');
        alert(message);
        if (status === 401) {
          setEmailCodeInput('');
          alert(message);
        } else if (status === 403) {
          setEmailCodeInput('');
          alert(message);
        } else if (status === 500) {
          alert(message);
        }
      });
  };

  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
          setTimeout(true);
          // alert('인증코드 만료');
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  const requestAgainCode = () => {
    // console.log('userEmailChange :: ', userEmailChange);
    const data: EmailCodeRequest = { userEmail: '' };
    data.userEmail = userEmailChange;
    UserService.getEmailCodeRequest(data)
      .then(({ message }) => {
        alert(message);
        // console.log(message);
        setMinutes(2);
        setSeconds(59);
        setTimeout(false);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        // console.log('에러 :: ', message);
        alert(message);
        if (status === 409) {
          alert(message);
        } else if (status === 500) {
          alert(message);
        }
      });
  };

  return (
    <>
      <Container>
        <StepName>이메일 인증</StepName>
        <StepDescription>
          서비스 이용을 위해 이메일 인증해주세요.
        </StepDescription>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>이메일 인증 (필수)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputFieldWrapper>
              <InputName>이메일</InputName>
              <InputAndButtonWrapper>
                <InputWrapper>
                  <Input
                    type="text"
                    onChange={checkEmail}
                    disabled={emailCodeInputView}
                    className={emailMessage !== '' ? 'have-error' : ''}
                    //  && emailMessage !== ''
                  />
                  {userEmailChange.length > 0 && (
                    <span
                      className={`message ${isEmail ? 'success' : 'error'}`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </InputWrapper>
                <OverlapConfirmButton
                  onClick={emailCodeRequest}
                  disabled={emailCodeRequestButton || emailCodeInputView}
                  className={emailMessage !== '' ? 'have-error' : ''}
                >
                  이메일 인증하기
                </OverlapConfirmButton>
              </InputAndButtonWrapper>
              {emailCodeInputView ? (
                <InputFieldWrapper>
                  <InputCode>
                    이메일로 전송된 인증코드를 입력해주세요.
                  </InputCode>
                  {emailConfirmComplete ? (
                    <CodeConfirmMessage>인증완료</CodeConfirmMessage>
                  ) : (
                    <CodeTimerWrapper>
                      <Timer>
                        {timeout ? (
                          <span>인증시간 만료</span>
                        ) : (
                          <span>
                            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                          </span>
                        )}
                      </Timer>
                      <RequestAgainCode onClick={requestAgainCode}>
                        인증번호 재전송
                      </RequestAgainCode>
                    </CodeTimerWrapper>
                  )}

                  <InputAndButtonWrapper>
                    <InputWrapper>
                      <Input
                        type="emailCodeInput"
                        maxLength={8}
                        onChange={checkEmailCode}
                        disabled={emailConfirmComplete}
                      />
                    </InputWrapper>
                    <CodeConfirmButton
                      onClick={emailCodeConfirm}
                      disabled={emailCodeConfirmButton || emailConfirmComplete}
                    >
                      인증하기
                    </CodeConfirmButton>
                  </InputAndButtonWrapper>
                </InputFieldWrapper>
              ) : null}
              {/* {emailConfirmComplete ? <span>인증완료</span> : null} */}
            </InputFieldWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton onClick={handleBeforeButton}>이전</CancelButton>
          <ConfirmButton
            onClick={handleNextButton}
            className={emailConfirmComplete ? 'complete' : ''}
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

const InputCode = styled.div`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
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
  border-radius: 4px;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &:focus {
    border: 1px solid #3688f4;
    box-shadow: inset 0 0 0 1px #3688f4;
  }

  &:disabled {
    background: #f0f0f0;
  }

  &.have-error {
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }

  &.checked {
    margin-bottom: 4px;
    border: 1px solid #36b5f4;
    box-shadow: inset 0 0 0 1px #3688f4;
  }
`;

const CodeTimerWrapper = styled.div`
  margin-bottom: 4px;
`;

const CodeConfirmMessage = styled.div`
  margin-bottom: 4px;
  margin-left: 8px;
  font-size: 20px;
  font-weight: 500;
  color: #3688f4;
`;

const Timer = styled.span`
  margin-left: 8px;
  font-size: 14px;
  color: #f44336;
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

// border: 1px solid #f44336;
// box-shadow: inset 0 0 0 1px #ff77774d;

const RequestAgainCode = styled.a`
  margin-left: 4px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #3396f4;
  }
`;

const CodeConfirmButton = styled.button`
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

export default EmailVerification;
