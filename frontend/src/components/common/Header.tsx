import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import FitnessCenterRoundedIcon from '@mui/icons-material/FitnessCenterRounded';
import DirectionsRunRoundedIcon from '@mui/icons-material/DirectionsRunRounded';

import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

import { logout as logoutSagaStart } from '../../redux/modules/auth';
import MenusLogIn from './MenusLogIn';
import MenusLogOut from './MenusLogOut';
import useToken from '../../hooks/useToken';

const Header: React.FC = () => {
  const location = useLocation();
  const token = useToken();

  const dispatch = useDispatch();

  const logoutButtonClick = () => {
    dispatch(logoutSagaStart());
  };

  const [state, setState] = useState({
    mobileView: false,
  });
  const { mobileView } = state;

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 1060
        ? setState((prevState) => ({ ...prevState, mobileView: true }))
        : setState((prevState) => ({ ...prevState, mobileView: false }));
    };
    setResponsiveness();
    window.addEventListener('resize', () => setResponsiveness());
  }, []);

  return (
    <Container css={location.pathname === '/' ? noborder : undefined}>
      <Wrapper>
        <LogoWrapper>
          <LogoNameWrapper>
            {/* <LogoImage to="/" /> */}
            <LogoImage className="logo" to="/" />
          </LogoNameWrapper>
        </LogoWrapper>
        <AcoountWrapper>
          <AccountInfoListWrapper>
            <AccountInfoList>
              {token === null ? (
                <>
                  {mobileView ? (
                    <MenusLogIn />
                  ) : (
                    <AccountInfoItemWrapper>
                      <AccountInfoItem>
                        <Button
                          component={Link}
                          to="/users/login"
                          variant="outlined"
                          size="large"
                          style={{
                            border: 'none',
                            fontSize: '1.5rem',
                            fontFamily: 'Spoqa Han Sans Neo',
                            color: '#02aab0',
                          }}
                        >
                          로그인
                        </Button>
                        {/* <AccountLink to="/users/login">로그인</AccountLink> */}
                      </AccountInfoItem>
                      <AccountInfoItem>
                        <Button
                          component={Link}
                          to="/users/sign-up"
                          variant="outlined"
                          size="large"
                          style={{
                            border: 'none',
                            fontSize: '1.5rem',
                            fontFamily: 'Spoqa Han Sans Neo',
                            color: '#02aab0',
                          }}
                        >
                          회원가입
                        </Button>
                      </AccountInfoItem>
                    </AccountInfoItemWrapper>
                  )}
                </>
              ) : (
                <>
                  {mobileView ? (
                    <MenusLogOut />
                  ) : (
                    <AccountInfoItemWrapper>
                      <AccountInfoItem>
                        <AccountLink to="/">
                          <Tooltip title="로그아웃">
                            <LogoutRoundedIcon
                              css={icon}
                              onClick={logoutButtonClick}
                            />
                          </Tooltip>
                        </AccountLink>
                      </AccountInfoItem>
                      <AccountInfoItem>
                        <AccountLink to="/exercise">
                          <Tooltip title="운동하러 가기">
                            <DirectionsRunRoundedIcon css={icon} />
                          </Tooltip>
                        </AccountLink>
                      </AccountInfoItem>
                      <AccountInfoItem>
                        <AccountLink to="/users/profile">
                          <Tooltip title="내 정보 수정">
                            <ContentPasteSearchIcon css={icon} />
                          </Tooltip>
                        </AccountLink>
                      </AccountInfoItem>
                      <AccountInfoItem>
                        <AccountLink to="/exercise/history">
                          <Tooltip title="운동 기록 확인">
                            <FitnessCenterRoundedIcon css={icon} />
                          </Tooltip>
                        </AccountLink>
                      </AccountInfoItem>
                      
                      <AccountInfoItem>
                        <AccountLink to="/exercise/bookmark">
                          <Tooltip title="즐겨찾기">
                            <StarsRoundedIcon css={icon} />
                          </Tooltip>
                        </AccountLink>
                      </AccountInfoItem>
                      
                    </AccountInfoItemWrapper>
                  )}
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
  display: flex;
  position: relative;
  width: 100%;
  margin-left: auto;
  box-sizing: border-box;
  margin-right: auto;
  position: relative;
  border-bottom: 1px solid #00cdac;
  pointer-events: none;
  color: rgb(26, 32, 39);
  padding-left: 20px;

  // @media (max-width: 900px) {
  //   padding-left: 20px;
  //   padding-right: 20px;
  // }

  @media (max-width: 1060px) {
    padding-left: 0;
    padding-right: 0;
  }

  @media (max-width: 575px) {
    padding-left: 0;
    padding-right: 0;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 50px;
  max-width: 128rem;
  margin: 0 auto;
  // padding: 0 5.4rem 0 2rem;
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
  align-items: center;
  justify-content: center;
  display: flex;
  height: 4.4rem;
  list-style: none;

  @media (min-width: 1060px) {
    height: 4.8rem;
    margin-right: 20px;
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
  color: #02aab0;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 1.56;
  text-decoration: none;
`;

const icon = css`
  font-size: 30px;
`;

const noborder = css`
  border-bottom: 0;
`;
const AccountInfoItemWrapper = styled.div``;

export default Header;
