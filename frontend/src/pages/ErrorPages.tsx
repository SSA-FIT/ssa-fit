import styled from '@emotion/styled';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  useEffect(() => {
    document.title = '404';
  }, []);

  return (
    <>
      <Container>
        <Name>404</Name>
        <Wrapper>
          <Description>페이지를 찾을 수 없습니다.</Description>
          <Link to="/">홈으로 이동</Link>
        </Wrapper>
      </Container>
    </>
  );
};
const Container = styled.div`
  color: #000;
  background: #fff;
  height: 100vh;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Name = styled.h1`
  display: inline-block;
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`;

const Wrapper = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  height: 49px;
  vertical-align: middle;
`;

const Description = styled.h2`
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
`;
export default ErrorPage;
