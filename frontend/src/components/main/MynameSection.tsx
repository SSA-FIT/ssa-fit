import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import useToken from '../../hooks/useToken';
const Fade = require('react-reveal/Fade');

const MynameSection: React.FC = () => {
  const token = useToken();
  return (
    <>
      <Section>
        <Container>
          <Fade duration={1000} delay={500} distance="30px">
            <MainTitle>
              READY, ACTION,
              <br />
              <MainText> SSA-FIT</MainText>
            </MainTitle>
          </Fade>
          <MoreButtonWrapper>
            <Fade duration={1000} delay={1000} distance="30px">
              <MoreButton>
                {token !== null ? (
                  <Link to="/exercise">LET'S WORK OUT</Link>
                ) : (
                  <Link to="/nonuser">LET'S WORK OUT</Link>
                )}
              </MoreButton>
            </Fade>
          </MoreButtonWrapper>
        </Container>
      </Section>
    </>
  );
};

const Section = styled.section`
  @media (max-width: 37.5em) {
    padding: 0 1.6rem;
  }
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  border-bottom: 0;
  background: #fff;
  font-weight: 400;
  color: #272341;
  padding: 0 5.6rem;
  margin-bottom: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  border-radius: 0.3rem;

  @media (min-width: 576px) {
    padding: 4rem 2rem;
  }
`;

const Container = styled.div`
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

  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
`;

const MainTitle = styled.h1`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 500ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-25703168730339-4;

  @media (max-width: 20em) {
    font-size: 2.8rem;
  }
  @media (max-width: 37.5em) {
    font-size: 3.5rem;
    line-height: 1.5;
  }

  @media (max-width: 56.25em) {
    font-size: 3.6rem;
    text-align: center;
  }

  @media (max-width: 75em) {
    font-size: 4rem;
  }

  font-size: 5.6rem;
  font-weight: 700;
  margin-bottom: 3.2rem;
  text-align: left;
`;

const MainText = styled.span`
  background-image: linear-gradient(135deg, #02aab0, #00cdac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const MoreButtonWrapper = styled.p`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 1000ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-25703168730339-4;

  display: flex;
  font-family: Montserrat, sans-serif;
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 1rem;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  @media (max-width: 56.25em) {
    justify-content: center;
  }
`;

const MoreButton = styled.span`
  background-image: linear-gradient(135deg, #02aab0, #00cdac);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  border-width: 2px;
  border-style: solid;
  -o-border-image: linear-gradient(135deg, #02aab0, #00cdac);
  border-image: linear-gradient(135deg, #02aab0, #00cdac);
  border-image-slice: 1;
  cursor: pointer;
  display: inline-block;
  position: relative;
  padding: 0.8rem 1.6rem;
  font-weight: 700;
  line-height: 1;
  z-index: 1;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
`;
export default MynameSection;
