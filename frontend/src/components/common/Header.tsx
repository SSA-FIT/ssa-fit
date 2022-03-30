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
            <LogoName to="/">
              <Logo src="/images/common/Logo.jpg" />
            </LogoName>
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
                    <AccountLink to="/">즐겨찾기</AccountLink>
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

const LogoName = styled(Link)`
  overflow: hidden;
  white-space: nowrap;
  // text-indent: 100%;
  display: inline-block;
  width: 50%;
  /* height: 50%; */
  outline: 0;
  text-decoration: none;
  vertical-align: top;
  font-family: 'Orbitron', sans-serif;
  color: #000;

  @media (min-width: 1060px) {
    width: 100%;
    /* height: 100%; */
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  margin: 0px auto;
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
