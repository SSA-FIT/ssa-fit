import styled from '@emotion/styled';
import { useDispatch } from 'react-redux';
import { Login } from '@mui/icons-material';
import { useCallback, useState } from 'react';
import { login as loginSagaStart } from '../../redux/modules/auth';

const LogInCard: React.FC = () => {
  const dispatch = useDispatch();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = useCallback(
    (reqData) => {
      dispatch(loginSagaStart(reqData));
    },
    [dispatch],
  );

  const handleLogInButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    login({ id, password });
  };
  return (
    <>
      <Wrapper>
        <Contatner>
          <LogInForm>
            <LogInWrapper>
              <LogInInner>
                <LogInGroup>
                  <LogInTitle>로그인</LogInTitle>
                  <InputAreaWrapper>
                    <InputName>
                      아이디
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input type="text" />
                    </InputWrapper>
                  </InputAreaWrapper>
                  <InputAreaWrapper>
                    <InputName>
                      비밀번호
                      <Required>필수입력</Required>
                    </InputName>
                    <InputWrapper>
                      <Input type="password" />
                    </InputWrapper>
                  </InputAreaWrapper>
                  <InputAreaWrapper>
                    <InputWrapper>
                      <IdSaveBox type="checkbox" id="idSave" />
                      <IdSaveLabel htmlFor="idSave">아이디 저장</IdSaveLabel>
                    </InputWrapper>
                  </InputAreaWrapper>
                  <LogInButtonWrapper>
                    <LogInButton type="submit" onClick={handleLogInButtonClick}>
                      로그인
                    </LogInButton>
                  </LogInButtonWrapper>
                  <FindWrapper>
                    <FindItemWrapper>
                      <FindLink className="inner" href="#">
                        아이디 찾기
                      </FindLink>
                    </FindItemWrapper>
                    <FindItemWrapper>
                      <FindLink className="inner" href="#">
                        비밀번호 찾기
                      </FindLink>
                    </FindItemWrapper>
                  </FindWrapper>
                  <SignUpLinkWrapper>
                    <SignUpLink href="/users/sign-up">회원가입</SignUpLink>
                  </SignUpLinkWrapper>
                </LogInGroup>
              </LogInInner>
            </LogInWrapper>
          </LogInForm>
        </Contatner>
      </Wrapper>
    </>
  );
};
const Wrapper = styled.div`
  display: block;
`;

const Contatner = styled.div`
  box-sizing: border-box;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const LogInForm = styled.form`
  box-sizing: border-box;
`;

const LogInWrapper = styled.div`
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

const LogInInner = styled.div`
  position: relative;

  @media (min-width: 1060px) {
    max-width: 128rem;
    margin: 0 auto;
  }
`;

const LogInGroup = styled.div`
  @media (min-width: 1060px) {
    width: 530px;
    padding: 4rem 6rem 6rem;
    margin: 0 auto;
    box-shadow: 4px 10px 20px 0 rgb(0 25 72 / 10%);
    background-color: #fff;
  }
`;

const LogInTitle = styled.h1`
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
`;

const IdSaveBox = styled.input`
  /* opacity: 0; */
  position: absolute;
  /* top: 1.2rem; */
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const IdSaveLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0.2rem;
    left: 0;
    width: 1.8rem;
    height: 1.8rem;
    /* border: 1px solid #00256c; */
    border-radius: 0.2rem;
    background-size: 11px 9px;

    /* @media (min-width: 1060px) {
      top: 0.4rem;
    } */
  }
  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const LogInButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const LogInButton = styled.button`
  display: block;
  width: 100%;
  height: 5.4rem;
  margin: 0;
  padding: 1.6rem 2rem;
  border: 1px solid #00256c;
  border-radius: 0.2rem;
  background-color: #00256c;
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

const SignUpLinkWrapper = styled.div`
  margin-top: 3rem;
  @media (min-width: 1060px) {
    margin: 3rem -6rem -6rem;
  }
`;

const SignUpLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5.4rem;
  background-color: #e6f9ff;
  color: #00256c;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;

  &:hover {
    outline: 0;
    border-radius: 0;
    box-shadow: inset 0 0 0 1px #0064de;
  }
  @media (min-width: 1060px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5.4rem;
    background-color: #e6f9ff;
    color: #00256c;
    font-weight: 700;
    font-size: 1.4rem;
    line-height: 1.58;
    text-decoration: none;
  }
`;
export default LogInCard;
