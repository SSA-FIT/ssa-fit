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
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 70px;
  background-color: rgb(23, 23, 27);
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 6px 16px;
  box-sizing: border-box;
`;

const BrandWrapper = styled.div`
  display: flex;
  align-items: center;
  width: calc(196px);
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
`;

export default Header;
