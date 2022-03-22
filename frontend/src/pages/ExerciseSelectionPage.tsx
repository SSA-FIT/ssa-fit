import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Redirect } from 'react-router-dom';
import { Recommendation } from '../types/recommendationTypes';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProfileRecommendation from '../components/exercise/recommendation/ProfileRecommendation';
import UserSelection from '../components/exercise/recommendation/UserSelection';
import SimilarityRecommendation from '../components/exercise/recommendation/SimilarityRecommendation';
import BookMarkRecommendation from '../components/exercise/recommendation/BookMarkRecommendation';
import EntireRecommendation from '../components/exercise/recommendation/EntireRecommendation';

const ExerciseSelectionPage: React.FC = () => {
  const [userSelectList, setUserSelectList] = useState<Recommendation[]>([]);
  const [step, setStep] = useState<number>(0);
  const handleSubmitButton = (event: React.MouseEvent) => {
    setStep(1);
  };
  return (
    <>
      <Header />

      {(() => {
        switch (step) {
          case 0:
            return (
              <Main>
                <Container>
                  <ProfileRecommendation
                    userSelectList={userSelectList}
                    setUserSelectList={setUserSelectList}
                  />
                  <SimilarityRecommendation
                    userSelectList={userSelectList}
                    setUserSelectList={setUserSelectList}
                  />
                  <BookMarkRecommendation
                    userSelectList={userSelectList}
                    setUserSelectList={setUserSelectList}
                  />

                  <EntireRecommendation
                    userSelectList={userSelectList}
                    setUserSelectList={setUserSelectList}
                  />
                  <UserSelectionWrapper>
                    <UserSelection
                      userSelectList={userSelectList}
                      setUserSelectList={setUserSelectList}
                    />
                    <Submit onClick={handleSubmitButton}>운동 선택 완료</Submit>
                  </UserSelectionWrapper>
                </Container>
              </Main>
            );
          case 1:
            return (
              <Main>
                <Container />
              </Main>
            );
          // case 2:
          //   return (

          //   );
          default:
            return <Redirect to="/" />;
        }
      })()}

      <Footer />
    </>
  );
};

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
