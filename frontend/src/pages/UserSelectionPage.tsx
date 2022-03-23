import React from 'react';
import styled from '@emotion/styled';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

const UserSelectionPage: React.FC = () => (
  <>
    <Header />
    <Main>
      <Container>
        {/* <VideoSelection />
        <UserVideoSelection /> */}
        <Submit>운동 세트 완성</Submit>
      </Container>
    </Main>
    <Footer />
  </>
);
const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const Submit = styled.button`
  width: 100%;
  background-color: #3396f4;
  height: 55px;
  border: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 24px;
  padding: 0px;
  color: white;
`;
export default UserSelectionPage;
