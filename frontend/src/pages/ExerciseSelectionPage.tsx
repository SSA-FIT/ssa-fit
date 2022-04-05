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

const ExerciseSelectionPage: React.FC = () => {
  useEffect(() => {
    document.title = '운동 추천';
  }, []);

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
                    <VideoPlayCard userVideoSelectList={userVideoSelectList} />
                  </>
                );
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
  background-color: #6367ffcc;
  color: #fff;
`;

const Container = styled.div`
  margin-top: 62px;
  padding: 24px 0;
`;

const Submit = styled.button`
  width: 100%;
  background-color: #6367ff;
  height: 55px;
  border: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  font-size: 24px;
  padding: 0px;
  color: white;

  &:disabled {
    background-color: #d3d3d3;
    cursor: not-allowed;
    color: #808080;
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
  color: #6367ffcc;
  text-align: center;
  margin-top: 15px;
  font-weight: 400;
  font-size: 20px;
  line-height: initial;
`;

export default ExerciseSelectionPage;
