import React, { useState } from 'react';
import styled from '@emotion/styled';

import { Redirect } from 'react-router-dom';
import { Recommendation, YoutubeVideo } from '../types/recommendationTypes';

import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ProfileRecommendation from '../components/exercise/recommendation/ProfileRecommendation';
import UserSelection from '../components/exercise/recommendation/UserSelection';
import SimilarityRecommendation from '../components/exercise/recommendation/SimilarityRecommendation';
import BookMarkRecommendation from '../components/exercise/recommendation/BookMarkRecommendation';
import EntireRecommendation from '../components/exercise/recommendation/EntireRecommendation';
import UserSelectionChips from '../components/exercise/youtubeSelections/UserSelectionChips';
import VideoList from '../components/exercise/youtubeSelections/VideoList';
import UserVideoSelection from '../components/exercise/youtubeSelections/UserVideoSelection';

const ExerciseSelectionPage: React.FC = () => {
  const [userRecoSelectList, setUserRecoSelectList] = useState<
    Recommendation[]
  >([]);
  const [youtubeVideoList, setYoutubeVideoList] = useState<YoutubeVideo[]>([]);
  const [userVideoSelectList, setUserVideoSelectList] = useState<
    YoutubeVideo[]
  >([]);
  const [step, setStep] = useState<number>(0);
  const handleRecoSubmitButton = (event: React.MouseEvent) => {
    setStep(1);
  };
  const handleVideoSubmitButton = (event: React.MouseEvent) => {
    setStep(2);
  };

  console.log(userVideoSelectList);
  return (
    <>
      <Header />
      <Main>
        <Container>
          {(() => {
            switch (step) {
              case 0:
                return (
                  <>
                    <ProfileRecommendation
                      userRecoSelectList={userRecoSelectList}
                      setUserRecoSelectList={setUserRecoSelectList}
                    />
                    <SimilarityRecommendation
                      userRecoSelectList={userRecoSelectList}
                      setUserRecoSelectList={setUserRecoSelectList}
                    />
                    <BookMarkRecommendation
                      userRecoSelectList={userRecoSelectList}
                      setUserRecoSelectList={setUserRecoSelectList}
                    />

                    <EntireRecommendation
                      userRecoSelectList={userRecoSelectList}
                      setUserRecoSelectList={setUserRecoSelectList}
                    />
                    <UserSelectionWrapper>
                      <UserSelection
                        userRecoSelectList={userRecoSelectList}
                        setUserRecoSelectList={setUserRecoSelectList}
                      />
                      <Submit onClick={handleRecoSubmitButton}>
                        운동 선택 완료
                      </Submit>
                    </UserSelectionWrapper>
                  </>
                );
              case 1:
                return (
                  <>
                    <UserSelectionChips
                      userRecoSelectList={userRecoSelectList}
                      setYoutubeVideoList={setYoutubeVideoList}
                    />
                    {youtubeVideoList.length > 0 && (
                      <>
                        <VideoList
                          youtubeVideoList={youtubeVideoList}
                          userVideoSelectList={userVideoSelectList}
                          setUserVideoSelectList={setUserVideoSelectList}
                        />
                        <UserSelectionWrapper>
                          <UserVideoSelection
                            userVideoSelectList={userVideoSelectList}
                            setUserVideoSelectList={setUserVideoSelectList}
                          />
                          <Submit onClick={handleVideoSubmitButton}>
                            운동 선택 완료
                          </Submit>
                        </UserSelectionWrapper>
                      </>
                    )}
                  </>
                );
              // case 2:
              //   return (

              //   );
              default:
                return <Redirect to="/" />;
            }
          })()}
        </Container>
      </Main>
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
