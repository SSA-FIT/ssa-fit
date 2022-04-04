import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import Swal from 'sweetalert2';

import { regEmail } from '../../utils/RegExpressions';
import UserService from '../../services/UserService';
import { EmailCodeConfirm, EmailCodeRequest } from '../../types/commonTypes';

const SearchingId: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [userIdView, setUserIdView] = useState<boolean>(false);
  const [findUserId, setFindUserId] = useState<string | null>('');

  const getEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const emailCurrent = event.target.value;
    setEmail(emailCurrent);
  };

  useEffect(() => {
    if (email !== '' && !regEmail.test(email)) {
      setEmailMessage('이메일 형식이 올바르지 않습니다.');
      setIsEmail(false);
    } else {
      setEmailMessage('');
      setIsEmail(true);
    }
  }, [email]);

  const searchIdButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const data: EmailCodeRequest = { email: '' };
    data.email = email;

    UserService.searchId(data)
      .then(({ message, userId }) => {
        Swal.fire({
          icon: 'success',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        setFindUserId(userId);
        setEmailMessage('');
        setUserIdView(true);
      })
      .catch((error) => {
        const { status, message } = error.response.data;

        setEmailMessage(message);
        Swal.fire({
          icon: 'error',
          html: message,
          showConfirmButton: false,
          timer: 1500,
        });
        if (status === 401) {
          // alert(message);
          setEmailMessage(message);
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (status === 500) {
          // alert(message);
          setEmailMessage(message);
          Swal.fire({
            icon: 'error',
            html: message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <>
      <Wrapper>
        <Container>
          <SearchIdForm>
            <SearchIdWrapper>
              <SearchIdInner>
                <SearchIdGroup>
                  <SearchIdTitle>아이디 찾기</SearchIdTitle>
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
                        disabled={userIdView}
                      />
                      {emailMessage !== '' && (
                        <ErrorWrapper>
                          <ErrorMessage>{emailMessage}</ErrorMessage>
                        </ErrorWrapper>
                      )}
                    </InputWrapper>
                  </InputAreaWrapper>
                  {userIdView ? (
                    <ResultAreaWrapper>
                      입력하신 정보와 일치하는 아이디는
                      <ResultContent>{findUserId}</ResultContent> 입니다.
                    </ResultAreaWrapper>
                  ) : (
                    <SearchIdButtonWrapper>
                      <SearchIdButton
                        type="button"
                        onClick={searchIdButtonClick}
                        className={
                          email !== '' && emailMessage === '' ? 'complete' : ''
                        }
                      >
                        아이디 찾기
                      </SearchIdButton>
                    </SearchIdButtonWrapper>
                  )}
                  <FindWrapper>
                    <FindItemWrapper>
                      <FindLink className="inner" href="/users/login">
                        로그인
                      </FindLink>
                    </FindItemWrapper>
                    <FindItemWrapper>
                      <FindLink
                        className="inner"
                        href="/users/reset-password/verify"
                      >
                        비밀번호 재설정
                      </FindLink>
                    </FindItemWrapper>
                  </FindWrapper>
                </SearchIdGroup>
              </SearchIdInner>
            </SearchIdWrapper>
          </SearchIdForm>
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

const SearchIdForm = styled.form`
  box-sizing: border-box;
`;

const SearchIdWrapper = styled.div`
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
      background: linear-gradient(to bottom, #8bbdf8 -75%, #e9f3fb 89%);
    }
  }
`;

const SearchIdInner = styled.div`
  position: relative;

  @media (min-width: 1060px) {
    max-width: 128rem;
    margin: 0 auto;
  }
`;

const SearchIdGroup = styled.div`
  @media (min-width: 1060px) {
    width: 530px;
    padding: 4rem 6rem 6rem;
    margin: 0 auto;
    box-shadow: 4px 10px 20px 0 rgb(0 25 72 / 10%);
    background-color: #fff;
  }
`;

const SearchIdTitle = styled.h1`
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
  color: blue;
  font-size: 1.4rem;
  font-weight: bold;
`;

const SearchIdButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const SearchIdButton = styled.button`
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

const FindWrapper = styled.ul`
  display: flex;
  margin: 2rem 0;
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

export default SearchingId;
