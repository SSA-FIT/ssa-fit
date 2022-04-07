import styled from '@emotion/styled';
const Fade = require('react-reveal/Fade');

const AboutSection: React.FC = () => {
  return (
    <>
      <Section>
        <Container>
          <Fade duration={1000} delay={600} distance="30px">
            <MainTitle>About SSA-FIT</MainTitle>
          </Fade>
          <AboutWrapper>
            <AboutColumn>
              <AboutImageWrapper>
                <ImageWrapper>
                  <Image src="\img\broccoli.gif" />
                  {/* <img src="\images\common\menu.png" /> */}
                  <Picture>
                    <ImageSecond src="\img\broccoli.gif" />
                  </Picture>
                </ImageWrapper>
              </AboutImageWrapper>
            </AboutColumn>
            <AboutColumnSecond>
              <AboutWrapperInfo>
                <Fade duration={1000} delay={1000} distance="30px">
                  <AboutWrapperInfoText>
                    코로나19 이후 "코로나 블루" 라는 용어가 생길정도로 많은
                    사람들이 우울증을 있습니다. <br />
                    별다른 신체활동을 하지 않고, 야외에서의 활동 시간이 적은
                    사람들은 불안과 우울증정도가 매우 심하다는 조사 결과도
                    있는데요. <br />
                    코로나는 정신적인 건강을 해치는 것뿐만 아니라 신체적으로도
                    영향을 미치고 있습니다.
                    <br />
                    코로나 "확찐자" 라는 말 들어보셨을텐데요. 사회적 거리두기로
                    외출이 자유롭지 못하고, 이로 인해 우울감은 심해지고 집에만
                    있다보니 활동량이 자연스레 적어지는 악순환 속에서 많은
                    사람들이 살이 찌고 있다고 합니다.
                  </AboutWrapperInfoText>
                  <AboutWrapperInfoText>
                    이처럼 국민의 정신적, 신체적 건강이 많이 나빠지고 있는
                    상황에서 디지털, 온라인 시장은 활성화되고 있습니다. <br />
                    특히 영상 콘텐츠의 시청 시간이 많이 증가하고 있습니다.
                    <br />
                    코로나로 인한 사람들의 건강 악화라는 문제에 온라인 영상
                    컨텐츠 소비가 늘어가는 현 상황을 접목하여 SSA-FIT 이라는
                    솔루션을 제안하려고 합니다.
                  </AboutWrapperInfoText>
                  <AboutWrapperInfoText>SSA-FIT</AboutWrapperInfoText>
                </Fade>
              </AboutWrapperInfo>
            </AboutColumnSecond>
          </AboutWrapper>
        </Container>
      </Section>
    </>
  );
};

const Section = styled.section`
  background-color: #02aab0;
  background-image: linear-gradient(135deg, #02aab0, #00cdac);
  color: #fff;
  height: 100%;
  border-top: 0;
  clip-path: polygon(0 0, 100% 0, 100% 80%, 0 100%);
  padding-bottom: 10%;
  padding: 5rem 0;
  display: block;

  @media (max-width: 75em) {
    height: 100%;
    clip-path: none;
  }

  @media (max-width: 37.5em) {
    border: none;
    padding: 0 1.6rem;
  }
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;

  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`;

const MainTitle = styled.h2`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 300ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-25703168730339-2;
  margin: 0 0 4.5rem;
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  line-height: 1.3;

  @media (max-width: 37.5em) {
    font-size: 2.8rem;
  }
`;

const AboutWrapper = styled.div`
  display: flex;
  //flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 8rem;

  @media (max-width: 37.5em) {
    padding-bottom: 5rem;
  }

  @media (max-width: 992px) {
    flex-direction: column;

    &.second {
      flex-direction: column-reverse;
    }
  }
  /* margin-right: -15px;
  margin-left: -15px;
  box-sizing: border-box;
  display: flex;

  @media (max-width: 992px) {
    flex-direction: column;
  } */
`;

const AboutColumn = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  /* display: flex;
  flex-direction: colum; */

  // @media (min-width: 576px) {
  //   flex: 0 0 100%;
  //   max-width: 100%;
  // }

  // @media (min-width: 768px) {
  //   flex: 0 0 50%;
  //   max-width: 50%;
  // }

  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
`;

const AboutImageWrapper = styled.div`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 600ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-25703168730339-3;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;

  @media (max-width: 75em) {
    height: 100%;
  }

  @media (max-width: 56.25em) {
    padding-bottom: 2rem;
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: inline-block;
  width: 350px;
  height: 350px;
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
  border-radius: 0.25rem !important;
  box-sizing: border-box;
`;

const Image = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  opacity: 0;
  transition-delay: 500ms;
  vertical-align: middle;
  border-style: none;
  box-sizing: border-box;
`;

const Picture = styled.picture``;

const ImageSecond = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  opacity: 1;
  transition: opacity 500ms ease 0s;
  vertical-align: middle;
  border-style: none;
  box-sizing: border-box;
  aspect-ratio: auto 350 / 350;
`;

const AboutColumnSecond = styled.div`
  /* display: flex;
  flex-direction: colum;
  flex: 0 0 50%;
  max-width: 50%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px; */
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }

  // @media (min-width: 576px) {
  //   flex: 0 0 100%;
  //   max-width: 100%;
  // }
  // @media (min-width: 768px) {
  //   flex: 0 0 50%;
  //   max-width: 50%;
  // }
`;

const AboutWrapperInfo = styled.div`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 1000ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-25703168730339-4;
  display: flex;
  height: 100%;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  @media (max-width: 37.5em) {
    align-items: center;
  }
`;

const AboutWrapperInfoText = styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 1.6rem;
  text-align: left;
  margin-top: 0;
  margin-bottom: 1rem;

  display: block;
  margin-block-start: 1em;
  margin-block-end: 1.5rem;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  @media (max-width: 56.25em) {
    font-size: 1.3rem;
    // text-align: center;
  }

  @media (max-width: 37.5em) {
    font-size: 1rem;
    padding-right: 3rem;
    // text-align: center;
  }
`;

export default AboutSection;
