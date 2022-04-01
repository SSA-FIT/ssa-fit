import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

interface Props {
  linkUrl: string;
  title: string;
  posterPath: string;
}

const StyledLink = styled(Link)`
  text-decoration: none;
  display: block;
  margin-inline: 10px;
`;

const Base = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 300px;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const Info = styled.div`
  text-align: left;
  width: 100%;
`;

const Title = styled.h4`
  color: #292a32;
  font-size: 16px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
  margin-bottom: 3px;
  white-space: nowrap;
  max-width: 200px;
`;
const CheckBox = styled.input`
  top: 6px;
  left: 6px;
  width: 14px;
  height: 14px;
  line-height: 27px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 145.37037037037038%;
`;

const Card: React.FC<Props> = ({ linkUrl, title, posterPath }) => (
  <StyledLink to={linkUrl}>
    <Base>
      <Wrapper>
        <CheckBox type="checkbox" />
        <ImageWrapper>
          <Image src={posterPath} alt={`${title} 의 포스터`} />
        </ImageWrapper>
      </Wrapper>
      <Info>
        <Title>{title}</Title>
      </Info>
    </Base>
  </StyledLink>
);

export default Card;
