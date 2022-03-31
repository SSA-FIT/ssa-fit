import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../types/authTypes';

const Header: React.FC = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );
  console.log(token);
  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <LogoNameWrapper>
            <LogoImage to="/" />
            <LogoImage className="logo" to="/" />
          </LogoNameWrapper>
        </LogoWrapper>
        <AcoountWrapper>
          <AccountInfoListWrapper>
            <AccountInfoList>
              {token === null ? (
                <>
                  <AccountInfoItem>
                    <AccountLink to="/users/login">로그인</AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/users/">회원가입</AccountLink>
                  </AccountInfoItem>
                </>
              ) : (
                <>
                  <AccountInfoItem>
                    <AccountLink to="/">로그아웃</AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/users/profile">정보수정</AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/exercise/history">운동이력</AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/exercise/bookmark">즐겨찾기</AccountLink>
                  </AccountInfoItem>
                </>
              )}
            </AccountInfoList>
          </AccountInfoListWrapper>
        </AcoountWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  border-bottom: 1px solid #6367ff;
  pointer-events: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  max-width: 128rem;
  margin: 0 auto;
  padding: 0 5.4rem 0 2rem;
  pointer-events: none;

  @media (min-width: 1060px) {
    height: 90px;
    padding: 0;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  float: left;
  height: 100%;
  pointer-events: auto;
`;

const LogoNameWrapper = styled.div`
  display: flex;
  align-items: center;
  height: inherit;
`;

const LogoImage = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  display: inline-block;
  width: 10.5rem;
  height: 3.5rem;
  outline: 0;
  background: transparent url(/images/common/Logo.jpg) no-repeat center center /
    105px 35px;
  text-decoration: none;
  vertical-align: top;

  &.logo {
    display: none;

    @media (min-width: 1060px) {
      overflow: hidden;
      white-space: nowrap;
      text-indent: 100%;
      display: inline-block;
      width: 3.8rem;
      height: 5.4rem;
      outline: 0;
      text-decoration: none;
      vertical-align: top;
      background: transparent url(/ssafit2.png) no-repeat center center / 54px
        54px;
    }
  }
  @media (min-width: 1060px) {
    background: transparent url(/images/common/Logo.jpg) no-repeat center center /
      162px 54px;
  }

  @media (min-width: 360) {
    width: 13.2rem;
    height: 4.4rem;
    background-size: 132px 44px;
  }
`;

const AcoountWrapper = styled.div`
  float: right;
  pointer-events: auto;
`;

const AccountInfoListWrapper = styled.nav`
  padding: 0.3rem 0.6rem 0.3rem 0;
`;

const AccountInfoList = styled.ul`
  display: table;
  height: 4.4rem;
  list-style: none;
  @media (min-width: 1060px) {
    height: 4.8rem;
  }
`;

const AccountInfoItem = styled.li`
  // display: none;
  vertical-align: middle;

  @media (min-width: 1060px) {
    padding-right: 0.8rem;
    display: table-cell;
  }
`;

const AccountLink = styled(Link)`
  display: block;
  outline: 0;
  color: #6367ff;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 1.56;
  text-decoration: none;
`;
export default Header;
