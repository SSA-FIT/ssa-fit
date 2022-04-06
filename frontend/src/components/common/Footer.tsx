import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Wrapper>
      <InfoWrapper>
        <ServiceWrapper>
          <Tos to="/privacy">개인 정보 처리 방침</Tos>
          <Tos to="/terms_of_service">이용 약관</Tos>
        </ServiceWrapper>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: block;
  position: relative;
`;

const InfoWrapper = styled.div`
  padding: 1.6rem 2rem 1.7rem;
  border-bottom: 1px solid #e7eaf0;
  @media ((min-width: 1060px)) {
    padding-top: 1.4rem;
    padding-bottom: 1.3rem;
  }
`;

const ServiceWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
`;

const Tos = styled(Link)`
  display: inline-block;
  white-space: nowrap;
  position: relative;
  padding: 0 1rem 0 2rem;
  border: 0;
  border-radius: 0.2rem;
  outline: 0;
  background-size: 16px 16px;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
`;

export default Footer;
