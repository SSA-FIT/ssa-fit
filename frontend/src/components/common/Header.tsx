import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { RootState } from '../../types/authTypes';

import { logout as logoutSagaStart } from '../../redux/modules/auth';

const Header: React.FC = () => {
  const token = useSelector<RootState, string | null>(
    (state) => state.auth.token,
  );

  const logoutButtonClick = () => {
    dispatch(logoutSagaStart());
  };

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
                    <AccountLink to="/users/sign-up">회원가입</AccountLink>
                  </AccountInfoItem>
                </>
              ) : (
                <>
                  <AccountInfoItem>
                    <AccountLink to="/">
                      <LogoutRoundedIcon
                        css={icon}
                        onClick={logoutButtonClick}
                      />
                    </AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/users/profile">
                      <ContentPasteSearchIcon css={icon} />
                    </AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/exercise/history">
                      <FitnessCenterRoundedIcon css={icon} />
                    </AccountLink>
                  </AccountInfoItem>
                  <AccountInfoItem>
                    <AccountLink to="/exercise/bookmark">
                      <StarsRoundedIcon css={icon} />
                    </AccountLink>
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
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AccountInfoListWrapper = styled.nav`
  //padding: 0.3rem 0.6rem 0.3rem 0;
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
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.56;
  text-decoration: none;
`;

const icon = css`
  font-size: 30px;
`;
export default Header;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}
