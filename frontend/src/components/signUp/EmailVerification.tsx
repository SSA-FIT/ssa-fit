import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { regExp } from '../../utils/RegExpressions';
import UserService from '../../services/UserService';
import { EmailCodeRequest } from '../../types/commonTypes';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
  // setSignUpEmail: (email: string) => void;
}

const EmailVerification: React.FC<Props> = ({ setSignUpStep }) => {
  const handleNextButton = () => {
    setSignUpStep(2);
  };

  const handleBeforeButton = () => {
    setSignUpStep(0);
  };

  const [email, setEmail] = useState<string>('');
  // 오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [emailCodeRequestButton, setEmailCodeRequestButton] =
    useState<boolean>(true);
  const [emailCodeInput, setEmailCodeInput] = useState<boolean>(false);

  // 이메일
  const checkEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 형식에 맞는 경우 true 리턴

    console.log('이메일 유효성 검사 :: ', regExp.test(event.target.value));

    const emailCurrent = event.target.value;
    setEmail(emailCurrent);

    if (!regExp.test(emailCurrent)) {
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
    setEmailCodeInput(true);
    const data: EmailCodeRequest = { email: '' };
    data.email = email;
    UserService.getUserInfo(data)
      .then(({ message }) => {
        // alert(message);
      })
      .catch((error) => {
        const { status, message } = error.response.data;

        if (status === 500) {
          // console.log(message);
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
                    type="email"
                    onChange={checkEmail}
                    className={emailMessage !== '' ? 'have-error' : ''}
                  />
                  {email.length > 0 && (
                    <span
                      className={`message ${isEmail ? 'success' : 'error'}`}
                    >
                      {emailMessage}
                    </span>
                  )}
                </InputWrapper>
                <OverlapConfirmButton
                  onClick={emailCodeRequest}
                  disabled={emailCodeRequestButton}
                >
                  이메일 인증하기
                </OverlapConfirmButton>
              </InputAndButtonWrapper>
              {emailCodeInput ? (
                <InputFieldWrapper>
                  <InputCode>
                    이메일로 전송된 인증코드를 입력해주세요.
                  </InputCode>
                  <InputAndButtonWrapper>
                    <InputWrapper>
                      <Input />
                    </InputWrapper>
                    <CodeConfirmButton>인증하기</CodeConfirmButton>
                  </InputAndButtonWrapper>
                </InputFieldWrapper>
              ) : null}
            </InputFieldWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton onClick={handleBeforeButton}>이전</CancelButton>
          <ConfirmButton onClick={handleNextButton}>확인</ConfirmButton>
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
    border-color: red;
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
  /* 
  &.abled {
    disabled=""
  } */
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

export default EmailVerification;
