import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from '@emotion/styled';
import Swal from 'sweetalert2';

import { regEmail, regId, regPw } from '../../utils/RegExpressions';
import UserService from '../../services/UserService';
import {
  ResetPasswordConfirm,
  ResetPasswordEmailCodeConfirm,
  ResetPasswordEmailCodeRequest,
} from '../../types/commonTypes';
import Circular from '../common/Circular';

const ResetPasswordVerify: React.FC = () => {
  const [id, setId] = useState<string>('');
  const [idMessage, setIdMessage] = useState<string>('');
  const [isId, setIsId] = useState<boolean>(false);

  const [email, setEmail] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(false);

  const [emailRequestFormComplete, setEmailRequestFormComplete] =
    useState<boolean>(false);
  const [codeRequestErrorMessage, setCodeRequestErrorMessage] =
    useState<string>('');

  const [emailCodeInput, setEmailCodeInput] = useState<string>('');
  const [emailConfirmMessage, setEmailConfirmMessage] = useState<string>('');
  const [emailConfirmComplete, setemailConfirmComplete] =
    useState<boolean>(false);

  const [emailCodeInputView, setEmailCodeInputView] = useState<boolean>(false);
  const [minutes, setMinutes] = useState<number>(2);
  const [seconds, setSeconds] = useState<number>(59);
  const [timeout, setTimeout] = useState<boolean>(false);

  const [passwordInputView, setPasswordInputView] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [pwMessage, setPwMessage] = useState<string>('');
  const [isPw, setIsPw] = useState<boolean>(false);

  const [passwordConfirm, setPasswordConfirm] = useState<string>('');
  const [pwConfirmMessage, setPwConfirmMessage] = useState<string>('');
  const [isPwConfirm, setIsPwConfirm] = useState<boolean>(false);
  const [resetPasswordMessage, setResetPasswordMessage] = useState<string>('');

  const [resetPasswordComplete, setResetPasswordComplete] =
    useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const getId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const idCurrent = event.target.value;
    setId(idCurrent);
    setCodeRequestErrorMessage('');
  };

  useEffect(() => {
    if (id !== '') {
      if (!regId.test(id)) {
        setIdMessage('아이디 형식이 올바르지 않습니다.');
        setIsId(false);
      } else {
        setIdMessage('');
        setIsId(true);
      }
    } else {
      setIdMessage('');
      setIsId(false);
    }
  }, [id]);

  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
    setCodeRequestErrorMessage('');
  };

  useEffect(() => {
    if (email !== '') {
      if (!regEmail.test(email)) {
        setEmailMessage('이메일 형식이 올바르지 않습니다.');
        setIsEmail(false);
      } else {
        setEmailMessage('');
        setIsEmail(true);
      }
    } else {
      setEmailMessage('');
      setIsEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (isId && isEmail) {
      setEmailRequestFormComplete(true);
    } else {
      setEmailRequestFormComplete(false);
    }
  }, [isId, isEmail]);

  const emailCodeRequest = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (id === '') setIdMessage('필수 입력 항목입니다.');
    else if (!isId) setIdMessage('아이디 형식이 올바르지 않습니다.');

    if (email === '') setEmailMessage('필수 입력 항목입니다.');
    else if (!isEmail) setEmailMessage('이메일 형식이 올바르지 않습니다.');

    setLoading(true);

    if (emailRequestFormComplete) {
      // Swal.fire({
      //   html: '회원정보를 확인중입니다.',
      //   showConfirmButton: false,
      //   timer: 3000,
      // });

      const data: ResetPasswordEmailCodeRequest = { userId: '', email: '' };
      data.userId = id;
      data.email = email;

      UserService.getResetPasswordEmailCodeRequest(data)
        .then(({ message }) => {
          Swal.fire({
            icon: 'success',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setEmailCodeInputView(true);
          setMinutes(2);
          setSeconds(59);
          setTimeout(false);
          setLoading(false);
        })
        .catch((error) => {
          const { status, message } = error.response.data;
          setLoading(false);
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          if (status === 409) {
            // alert(message);
            Swal.fire({
              icon: 'error',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
            setCodeRequestErrorMessage(message);
            setLoading(false);
          } else if (status === 500) {
            // alert(message);
            Swal.fire({
              icon: 'error',
              html: message,
              showConfirmButton: false,
              timer: 1500,
            });
            setCodeRequestErrorMessage(message);
            setLoading(false);
          }
        });
    }
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

  const checkEmailCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailConfirmMessage('');
    setEmailCodeInput(event.target.value);
  };

  // useEffect(() => {
  //   setEmailConfirmMessage('');
  // }, [emailCodeInput]);

  const emailCodeConfirm = () => {
    const data: ResetPasswordEmailCodeConfirm = {
      code: '',
      email: '',
      userId: '',
    };
    data.code = emailCodeInput;
    data.email = email;
    data.userId = id;
    UserService.ResetPasswordEmailCodeConfirm(data)
      .then(({ message }) => {
        Swal.fire({
          icon: 'success',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setEmailCodeInputView(false);
        setPasswordInputView(true);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        // alert(message);
        Swal.fire({
          icon: 'error',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setEmailConfirmMessage(message);
        // setEmailCodeInput('');
        if (status === 401) {
          // alert(message);
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setEmailConfirmMessage(message);
          // setEmailCodeInput('');
        } else if (status === 403) {
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setEmailConfirmMessage(message);
          // setEmailCodeInput('');
        } else if (status === 500) {
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setEmailConfirmMessage(message);
          // setEmailCodeInput('');
        }
      });
  };

  const requestAgainCode = () => {
    const data: ResetPasswordEmailCodeRequest = { userId: '', email: '' };
    data.userId = id;
    data.email = email;
    setLoading(true);
    UserService.getResetPasswordEmailCodeRequest(data)
      .then(({ message }) => {
        Swal.fire({
          icon: 'success',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setMinutes(2);
        setSeconds(59);
        setTimeout(false);
        setLoading(false);
      })
      .catch((error) => {
        const { status, message } = error.response.data;
        setLoading(false);
        Swal.fire({
          icon: 'error',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setLoading(false);
        if (status === 409) {
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        } else if (status === 500) {
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          setLoading(false);
        }
      });
  };

  const getPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pwCurrent = event.target.value;
    setPassword(pwCurrent);

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

    const pwCurrent = event.target.value;
    setPasswordConfirm(pwCurrent);
  };

  useEffect(() => {
    setResetPasswordMessage('');
    if (passwordConfirm !== '') {
      if (passwordConfirm === password && isPw) {
        setPwConfirmMessage('');
        setIsPwConfirm(true);
      } else {
        setPwConfirmMessage('비밀번호가 일치하지 않습니다.');
        setIsPwConfirm(false);
      }
    } else {
      setPwConfirmMessage('');
      setIsPwConfirm(false);
    }
  }, [isPw, password, passwordConfirm]);

  const resetPasswordConfirm = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (password === '') setPwMessage('필수 입력 항목입니다.');
    else if (!isPw) setPwMessage('비밀번호 형식이 올바르지 않습니다.');

    if (passwordConfirm === '') setPwConfirmMessage('필수 입력 항목입니다.');
    else if (!isPwConfirm)
      setPwConfirmMessage('비밀번호 형식이 올바르지 않습니다.');

    if (isPwConfirm) {
      const data: ResetPasswordConfirm = {
        userId: '',
        email: '',
        password: '',
      };
      data.userId = id;
      data.email = email;
      data.password = password;

      UserService.ResetPasswordConfirm(data)
        .then(({ message }) => {
          setResetPasswordComplete(true);
          Swal.fire({
            icon: 'success',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((error) => {
          const { status, message } = error.response.data;
          setResetPasswordMessage(message);
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
          if (status === 500) {
            setResetPasswordMessage(message);
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

  return (
    <>
      <Wrapper>
        <Container>
          <ResetPasswordForm>
            <ResetPasswordWrapper>
              <ResetPasswordInner>
                <ResetPasswordGroup>
                  <ResetPasswordTitle>비밀번호 재설정</ResetPasswordTitle>
                  <InputAreaWrapper>
                    <InputName>
                      아이디
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input
                        type="text"
                        value={id}
                        onChange={getId}
                        className={idMessage !== '' ? 'have-error' : ''}
                        disabled={emailCodeInputView || passwordInputView}
                      />
                      {idMessage !== '' && (
                        <ErrorWrapper>
                          <ErrorMessage>{idMessage}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </InputWrapper>
                  </InputAreaWrapper>
                  <InputAreaWrapper>
                    <InputName>
                      이메일
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input
                        type="text"
                        value={email}
                        onChange={getEmail}
                        className={emailMessage !== '' ? 'have-error' : ''}
                        disabled={emailCodeInputView || passwordInputView}
                      />
                      {emailMessage !== '' && (
                        <ErrorWrapper>
                          <ErrorMessage>{emailMessage}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </InputWrapper>
                  </InputAreaWrapper>
                  {codeRequestErrorMessage !== '' ? (
                    <ResultAreaWrapper>
                      <ResultContent>{codeRequestErrorMessage}</ResultContent>
                    </ResultAreaWrapper>
                  ) : null}

                  {/* 인증번호 입력창 생성 */}
                  {!emailCodeInputView && !passwordInputView ? (
                    <ResetPasswordButtonWrapper>
                      <ResetPasswordButton
                        type="button"
                        onClick={emailCodeRequest}
                        className={
                          id !== '' && email !== '' && emailRequestFormComplete
                            ? 'complete'
                            : ''
                        }
                      >
                        {!loading ? '이메일 인증' : <Circular />}
                      </ResetPasswordButton>
                      <FindWrapper>
                        <FindItemWrapper>
                          <FindLink className="inner" href="/users/login">
                            로그인
                          </FindLink>
                        </FindItemWrapper>
                        <FindItemWrapper>
                          <FindLink className="inner" href="/users/search-id">
                            아이디 찾기
                          </FindLink>
                        </FindItemWrapper>
                      </FindWrapper>
                    </ResetPasswordButtonWrapper>
                  ) : null}

                  {emailCodeInputView ? (
                    <InputAreaWrapper>
                      <InputName>
                        이메일로 전송된 인증코드를 입력해주세요.
                      </InputName>
                      {emailConfirmComplete ? (
                        <CodeConfirmMessage>인증완료</CodeConfirmMessage>
                      ) : (
                        <CodeTimerWrapper>
                          <Timer>
                            {timeout ? (
                              <span>인증시간 만료</span>
                            ) : (
                              <span>
                                {minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </span>
                            )}
                          </Timer>
                          <RequestAgainCode onClick={requestAgainCode}>
                            {!loading ? '인증번호 재전송' : <Circular />}
                          </RequestAgainCode>
                        </CodeTimerWrapper>
                      )}

                      <InputAndButtonWrapper>
                        <InputWrapper>
                          <Input
                            type="text"
                            onChange={checkEmailCode}
                            value={emailCodeInput}
                            disabled={emailConfirmComplete}
                            className={
                              emailConfirmMessage !== '' ? 'have-error' : ''
                            }
                          />
                          {emailConfirmMessage !== '' && (
                            <ErrorWrapper>
                              <ErrorMessage>{emailConfirmMessage}</ErrorMessage>
                            </ErrorWrapper>
                          )}
                        </InputWrapper>
                        {/* 
                          className={emailCodeInput !== '' ? 'complete' : ''}
                       */}
                        <ResetPasswordConfirmButton
                          type="button"
                          onClick={emailCodeConfirm}
                          disabled={
                            emailCodeInput === '' || emailConfirmMessage !== ''
                          }
                        >
                          인증하기
                        </ResetPasswordConfirmButton>
                      </InputAndButtonWrapper>
                    </InputAreaWrapper>
                  ) : null}

                  {/* 비밀번호 재설정창 생성 */}
                  {passwordInputView ? (
                    <ResetPasswordInputGroup>
                      <InputAreaWrapper>
                        <InputName>
                          신규 비밀번호
                          <Required>필수입력</Required>
                          <InputDescription>
                            영문+숫자 6자~12자 이내 입력 가능, 특수문자 입력
                            불가
                          </InputDescription>
                        </InputName>
                        <InputWrapper>
                          <Input
                            type="password"
                            value={password}
                            onChange={getPassword}
                            className={pwMessage !== '' ? 'have-error' : ''}
                            disabled={resetPasswordComplete}
                          />
                          {pwMessage !== '' && (
                            <ErrorWrapper>
                              <ErrorMessage>{pwMessage}</ErrorMessage>
                            </ErrorWrapper>
                          )}
                        </InputWrapper>
                      </InputAreaWrapper>
                      <InputAreaWrapper>
                        <InputName>
                          신규 비밀번호 확인
                          <Required>필수입력</Required>
                        </InputName>
                        <InputWrapper>
                          <Input
                            type="password"
                            value={passwordConfirm}
                            onChange={doubleCheckPw}
                            className={
                              pwConfirmMessage !== '' ? 'have-error' : ''
                            }
                            disabled={resetPasswordComplete}
                          />
                          {pwConfirmMessage !== '' && (
                            <ErrorWrapper>
                              <ErrorMessage>{pwConfirmMessage}</ErrorMessage>
                            </ErrorWrapper>
                          )}
                        </InputWrapper>
                      </InputAreaWrapper>
                      {resetPasswordMessage !== '' ? (
                        <ErrorWrapper>
                          <ErrorMessage>{resetPasswordMessage}</ErrorMessage>
                        </ErrorWrapper>
                      ) : null}
                      {resetPasswordComplete ? (
                        <ResetPasswordButtonWrapper>
                          <ResetPasswordCompleteButton to="/users/login">
                            로그인
                          </ResetPasswordCompleteButton>
                        </ResetPasswordButtonWrapper>
                      ) : (
                        <ResetPasswordButtonWrapper>
                          <ResetPasswordButton
                            type="button"
                            onClick={resetPasswordConfirm}
                            className={isPwConfirm ? 'complete' : ''}
                          >
                            비밀번호 재설정
                          </ResetPasswordButton>
                        </ResetPasswordButtonWrapper>
                      )}
                    </ResetPasswordInputGroup>
                  ) : null}
                </ResetPasswordGroup>
              </ResetPasswordInner>
            </ResetPasswordWrapper>
          </ResetPasswordForm>
        </Container>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: block;
`;

const Container = styled.div`
  box-sizing: border-box;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const ResetPasswordForm = styled.form`
  box-sizing: border-box;
`;

const ResetPasswordWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 4rem 2rem 6rem;

  @media (min-width: 1060px) {
    margin: 0 -2rem;
    padding: 6rem 2rem 10rem;

    &::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #02aab0;
      background-image: linear-gradient(135deg, #02aab0, #00cdac);
    }
  }
`;

const ResetPasswordInner = styled.div`
  position: relative;

  @media (min-width: 1060px) {
    max-width: 128rem;
    margin: 0 auto;
  }
`;

const ResetPasswordGroup = styled.div`
  @media (min-width: 1060px) {
    width: 530px;
    padding: 4rem 6rem 6rem;
    margin: 0 auto;
    box-shadow: 4px 10px 20px 0 rgb(0 25 72 / 10%);
    background-color: #fff;
  }
`;

const ResetPasswordTitle = styled.h1`
  margin-bottom: 1rem;
  color: #000;
  font-weight: 500;
  font-size: 2rem;

  @media (min-width: 1060px) {
    margin-bottom: 2.6rem;
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const InputAreaWrapper = styled.div`
  padding-top: 1rem;

  &:not(:first-of-type) {
    margin-top: 3rem;
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

const InputDescription = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: #00256c;
  font-size: 1.3rem;
  line-height: 1.58;
`;

const CodeTimerWrapper = styled.div`
  margin-bottom: 0.5rem;
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
  color: #f44336;
  font-size: 20px;
`;

const RequestAgainCode = styled.a`
  margin-left: 8px;
  font-weight: 500;
  text-decoration: underline;
  cursor: pointer;
  font-size: 20px;

  &:hover {
    color: #3396f4;
  }
`;

const Required = styled.span`
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

const InputAndButtonWrapper = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  word-break: normal;
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

  &:hover {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #0064de;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }

  &:disabled {
    background: rgb(247, 248, 250);
    color: rgb(194, 200, 204);
    border-color: rgb(218, 220, 224);
    cursor: not-allowed;
  }
  &:focus {
    padding: 0 1rem;
    border-bottom-color: transparent;
    border-radius: 0.2rem;
    outline: 0;
    box-shadow: 0 0 0 1px #0064de;
    color: #000;
    transition: padding 0.2s, border 0.2s, background 0.2s, color 0.2s,
      box-shadow 0.2s;
  }
  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
  &.have-error {
    border-radius: 0.2rem;
    margin-bottom: 4px;
    border: 1px solid #f44336;
    box-shadow: inset 0 0 0 1px #ff77774d;
  }
`;

const ResultAreaWrapper = styled.div`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const ResultContent = styled.span`
  margin: 10px;
  color: rgb(255, 119, 119);
  font-size: 1.4rem;
  font-weight: bold;
`;

const ResetPasswordInputGroup = styled.div`
  margin-top: 2rem;
`;

const ResetPasswordButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const ResetPasswordButton = styled.button`
  display: block;
  width: 100%;
  height: 5.4rem;
  margin: 0;
  padding: 1.6rem 2rem;
  border: 1px solid #00256c;
  border-radius: 0.2rem;
  background: #bad5f5;
  color: #013066;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  &.complete {
    background-color: #013066;
    color: #fff;
  }

  &:disabled {
    background: rgb(247, 248, 250);
    color: rgb(194, 200, 204);
    border-color: rgb(218, 220, 224);
    cursor: not-allowed;
  }
`;

const ResetPasswordCompleteButton = styled(Link)`
  display: block;
  margin: 0;
  padding: 1.6rem 2rem;
  border: 1px solid #00256c;
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
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const ResetPasswordConfirmButton = styled.button`
  display: block;
  width: 100%;
  height: 5.4rem;
  margin-top: 1rem;
  padding: 1.6rem 2rem;
  border: 1px solid #00256c;
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
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }

  &.complete {
    background-color: #013066;
    color: #fff;
  }

  &:disabled {
    background: rgb(247, 248, 250);
    color: rgb(194, 200, 204);
    border-color: rgb(218, 220, 224);
    cursor: not-allowed;
  }
`;

const FindWrapper = styled.ul`
  display: flex;
  margin: 2rem 2rem 0;
  list-style: none;
`;

const FindItemWrapper = styled.li`
  width: 50%;
  text-align: center;
`;

const FindLink = styled.a`
  display: inline-block;
  border: 0;
  background: none;
  color: #0064de;
  text-decoration: underline;
  text-decoration-skip-ink: auto;
  text-indent: 0;

  &.inner {
    position: relative;
    font-size: 1.4rem;
    text-decoration: none;
  }

  @media (min-width: 1060px) {
    &.inner {
      font-size: 1.6rem;
    }
  }
`;

const ErrorWrapper = styled.div``;

// 22.4px보다 2px작게
const ErrorMessage = styled.span`
  font-size: 1.1rem;
  color: rgb(255, 119, 119);
  line-height: 1.5;
`;

export default ResetPasswordVerify;
