import React, { useEffect, useState } from 'react';
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
import VideoPlayCard from '../components/exercise/video/VideoPlayCard';
import SelectionTabs from '../components/common/SelectionTabs';

const ExerciseSelectionPage: React.FC = () => {
  useEffect(() => {
    document.title = '운동 추천';
  }, []);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [userRecoSelectList, setUserRecoSelectList] = useState<
    Recommendation[]
  >([]);
  const [youtubeVideoList, setYoutubeVideoList] = useState<YoutubeVideo[]>([]);
  const [userVideoSelectList, setUserVideoSelectList] = useState<
    YoutubeVideo[]
  >([]);
  const [step, setStep] = useState<number>(0);
  const [selectDisabled, setSelectDisabled] = useState<boolean>(true);
  const [videoSelectDisabled, setVideoSelectDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (userRecoSelectList.length > 0) {
      setSelectDisabled(false);
    } else {
      setSelectDisabled(true);
    }
  }, [userRecoSelectList.length]);

  useEffect(() => {
    if (userVideoSelectList.length > 0) {
      setVideoSelectDisabled(false);
    } else {
      setVideoSelectDisabled(true);
    }
  }, [userVideoSelectList.length]);

  const handleRecoSubmitButton = (event: React.MouseEvent) => {
    setStep(1);
  };

  const handleVideoSubmitButton = (event: React.MouseEvent) => {
    setStep(2);
  };

  return (
    <>
      <Header />
      <Main>
        <ContainerWrapper>
          <Container>
            {(() => {
              switch (step) {
                case 0:
                  return (
                    <>
                      <SectionName>오늘의 운동 추천 💪</SectionName>
                      <SelectionTabs
                        setTabNumber={setTabNumber}
                      ></SelectionTabs>
                      {tabNumber === 0 && (
                        <RecommendationWrapper>
                          <ProfileRecommendation
                            userRecoSelectList={userRecoSelectList}
                            setUserRecoSelectList={setUserRecoSelectList}
                          />
                        </RecommendationWrapper>
                      )}
                      {tabNumber === 1 && (
                        <RecommendationWrapper>
                          <SimilarityRecommendation
                            userRecoSelectList={userRecoSelectList}
                            setUserRecoSelectList={setUserRecoSelectList}
                          />
                        </RecommendationWrapper>
                      )}
                      {tabNumber === 2 && (
                        <RecommendationWrapper>
                          <BookMarkRecommendation
                            userRecoSelectList={userRecoSelectList}
                            setUserRecoSelectList={setUserRecoSelectList}
                          />
                        </RecommendationWrapper>
                      )}
                      {tabNumber === 3 && (
                        <RecommendationWrapper>
                          <EntireRecommendation
                            userRecoSelectList={userRecoSelectList}
                            setUserRecoSelectList={setUserRecoSelectList}
                          />
                        </RecommendationWrapper>
                      )}

                      <UserSelectionWrapper>
                        <UserSelection
                          userRecoSelectList={userRecoSelectList}
                          setUserRecoSelectList={setUserRecoSelectList}
                        />

                        <Submit
                          onClick={handleRecoSubmitButton}
                          disabled={selectDisabled}
                        >
                          운동 선택 완료
                        </Submit>
                      </UserSelectionWrapper>
                    </>
                  );
                case 1:
                  return (
                    <>
                      <SectionName>운동 영상 목록</SectionName>
                      <UserSelectionChips
                        userRecoSelectList={userRecoSelectList}
                        setYoutubeVideoList={setYoutubeVideoList}
                      />
                      {youtubeVideoList.length > 0 ? (
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
                            <Submit
                              onClick={handleVideoSubmitButton}
                              disabled={videoSelectDisabled}
                            >
                              운동 영상 선택 완료
                            </Submit>
                          </UserSelectionWrapper>
                        </>
                      ) : (
                        <DescriptionWrapper>
                          <Description>
                            운동 항목을 눌러 시청할 영상을 선택해주세요.👆
                          </Description>
                        </DescriptionWrapper>
                      )}
                    </>
                  );
                case 2:
                  return (
                    <>
                      <VideoPlayCard
                        userVideoSelectList={userVideoSelectList}
                      />
                    </>
                  );
                default:
                  return <Redirect to="/" />;
              }
            })()}
          </Container>
        </ContainerWrapper>
      </Main>
      <Footer />
    </>
  );
};

const Main = styled.div`
  display: block;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const ContainerWrapper = styled.div`
  box-sizing: border-box;
  padding: 0 2rem;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const UserSelectionWrapper = styled.div`
  border-radius: 15px;
  background-color: #02aab0;
  color: #fff;

  @media (min-width: 1280px) and (min-height: 900px) {
    position: sticky;
    bottom: 0;
  }
  /* 
  @media  {
    position: sticky;
    bottom: 0;
  } */
`;

const Container = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;
  box-sizing: border-box;

  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 6rem 10rem;
  }

  @media (max-width: 667px) {
    padding-right: 0px;
    padding-bottom: 2rem;
    padding-left: 0px;
  }
`;

const SectionName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;

  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const RecommendationWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  box-sizing: border-box;
  margin: 2rem 0;

  @media (min-width: 1060px) {
    //display: flex;
    flex-wrap: wrap;
    padding: 4.6em 4rem;
  }
  @media (max-width: 667px) {
    padding: 0px;
  }
`;
const Submit = styled.button`
  width: 100%;
  background-color: #fff;
  height: 55px;
  border: 1px solid #02aab0;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 24px;
  padding: 0px;
  color: #02aab0;
  cursor: pointer;
  transition: color 0.3s;
  border-radius: 5px;

  &:disabled {
    background-color: #e0e0e0;
    cursor: not-allowed;
    color: #808080;
    border-radius: 7px;
  }

  &:hover {
    color: #fff;
    background-color: #00cdac;
  }
`;

const DescriptionWrapper = styled.div`
  width: 100%;
  height: 600px;
  background-color: #fafafa;
  padding: 5px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
`;

const Description = styled.h5`
  color: #02aab0;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: initial;
`;

export default ExerciseSelectionPage;
