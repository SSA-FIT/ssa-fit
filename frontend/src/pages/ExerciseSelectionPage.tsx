import React from 'react';
import styled from '@emotion/styled';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import BmiSelection from '../components/exercise/selections/BmiSelection';
import SsafitSelection from '../components/exercise/selections/SsafitSelection';
import StarSelection from '../components/exercise/selections/StarSelection';
import UserSelection from '../components/exercise/selections/UserSelection';

const ExerciseSelectionPage: React.FC = () => (
  <>
    <Header />
    <Main>
      <Container>
        <BmiSelection />
        <SsafitSelection />
        <StarSelection />
        <UserSelectionWrapper>
          <UserSelection />
          <Submit>운동 선택 완료</Submit>
        </UserSelectionWrapper>
      </Container>
    </Main>
    <Footer />
  </>
);

const Main = styled.main`
  max-width: 1200px;
  margin: 0 auto;
`;

const UserSelectionWrapper = styled.div`
  position: sticky;
  bottom: 0;
  background-color: #caace8cc;
`;
const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const Submit = styled.button`
  width: 100%;
  background-color: rgb(153, 51, 255);
  height: 55px;
  border: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 24px;
  padding: 0px;
  color: white;
`;
export default ExerciseSelectionPage;
