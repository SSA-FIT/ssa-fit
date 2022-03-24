import styled from '@emotion/styled';
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <BrandWrapper>
          <Brand to="/">
            <LogoName>SSAFIT</LogoName>
          </Brand>
        </BrandWrapper>
        <AccountMenuList>
          <AccountMenuItem>
            <PageLink to="#">로그인</PageLink>
          </AccountMenuItem>
          <Division />
          <AccountMenuItem>
            <PageLink to="/users/sign-up">회원가입</PageLink>
          </AccountMenuItem>
        </AccountMenuList>
      </Wrapper>
    </Container>
  );
};

const Container = styled.header`
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  background-color: #0d161c;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6px 16px;
  box-sizing: border-box;

  /* @media (max-width: 991px) {
    flex-direction: column;
    padding-top: 0;
    padding-bottom: 0;
  } */
`;

const BrandWrapper = styled.div`
  height: 34px;

  /* @media (max-width: 991px) {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 6px 0;
  } */
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  height: inherit;
`;

const LogoName = styled.span`
  margin-left: 6px;
  padding-top: 1px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  font-family: 'Orbitron', sans-serif;
`;

const AccountMenuList = styled.ul`
  display: flex;

  /* @media (max-width: 991px) {
    overflow-y: hidden;
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
    background-color: #0d161c;
    transition: all 0.35s ease;
  } */
`;

const AccountMenuItem = styled.li`
  /* @media (max-width: 992px) {
    padding: 12px 4px;
    box-sizing: border-box;
  } */
`;

const PageLink = styled(Link)`
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.6;
  color: rgb(195, 195, 195);
  text-decoration: none;
  transition: color 0.08s ease-in-out;

  &:hover {
    color: #fff;
  }

  /* @media (max-width: 991px) {
    padding: 0;
    font-size: 15px;
    line-height: 1.4669;
  } */
`;

const Division = styled.div`
  width: 1px;
  height: 27px;
  background-color: rgb(195, 195, 195);

  @media (max-width: 991px) {
    display: none;
  }
`;

export default Header;
