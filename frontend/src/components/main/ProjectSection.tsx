import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
const Fade = require('react-reveal/Fade');

const ProjectsSection: React.FC = () => {
  return (
    <>
      <ProjectsSectionWrapper id="projects">
        <Container id="container">
          <ProjectWrapper id="project-wrapper">
            <Fade duration={1000} delay={500} distance="30px">
              <SectionTitle id="title">SSA-FIT</SectionTitle>
              <Row id="row">
                <Col id="col">
                  <Fade duration={1000} delay={1000} distance="30px">
                    <ProjectName id="title">운동 추천 서비스</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">
                        신체 정보 기반, ~~~ 등을 기반으로 운동 추천을 합니다.
                        (서비스 설명)+싸핏 추천, 비로그인 체험 가능+반응형
                      </Description>
                      <Mb></Mb>
                    </DescriptionWrapper>
                    <LinkToService to="/exercise" id="blank">
                      은동 추천 서비스 체험하러 가기
                    </LinkToService>
                  </Fade>
                </Col>
                <ColRight id="colRignt">
                  <FadeCustom duration={1000} delay={1000} distance="30px">
                    <ImageWrapper>
                      <ProjectLink to="#">
                        <Tilt>
                          <MovingImageWrapper>
                            <Hidden></Hidden>
                            <MovingImage src="https://upload.wikimedia.org/wikipedia/commons/1/17/Westie_pups.jpg"></MovingImage>
                          </MovingImageWrapper>
                        </Tilt>
                      </ProjectLink>
                    </ImageWrapper>
                  </FadeCustom>
                </ColRight>
              </Row>
              <Row id="row" className="second">
                <ColRight id="colRignt">
                  <FadeCustom duration={1000} delay={1000} distance="30px">
                    <ImageWrapper>
                      <ProjectLink to="#">
                        <Tilt>
                          <MovingImageWrapper>
                            <Hidden></Hidden>
                            <MovingImage src="https://upload.wikimedia.org/wikipedia/commons/1/17/Westie_pups.jpg"></MovingImage>
                          </MovingImageWrapper>
                        </Tilt>
                      </ProjectLink>
                    </ImageWrapper>
                  </FadeCustom>
                </ColRight>
                <Col id="col">
                  <Fade duration={1000} delay={1000} distance="30px">
                    <ProjectName id="title">운동 추천 원리(특화점)</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">서비스 강점</Description>
                      <Mb></Mb>
                    </DescriptionWrapper>
                    <LinkToService to="#" id="blank">
                      싸핏 자세한 이야기 보러가기(노션 연결..?)
                    </LinkToService>
                  </Fade>
                </Col>
              </Row>
              <Row id="row">
                <Col id="col">
                  <Fade duration={1000} delay={1000} distance="30px">
                    <ProjectName id="title">부가 가능</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">
                        회원에게 필요한 서비스 제공(가입 시 정보 암호화, 수정,
                        가입, 즐겨찾기, 운동 기록 조회)
                      </Description>
                      <Mb></Mb>
                    </DescriptionWrapper>
                    <LinkToService to="#" id="blank">
                      See Live
                    </LinkToService>
                  </Fade>
                </Col>
                <ColRight id="colRignt">
                  <FadeCustom duration={1000} delay={1000} distance="30px">
                    <ImageWrapper>
                      <ProjectLink to="#">
                        <Tilt>
                          <MovingImageWrapper>
                            <Hidden></Hidden>
                            <MovingImage src="https://upload.wikimedia.org/wikipedia/commons/1/17/Westie_pups.jpg"></MovingImage>
                          </MovingImageWrapper>
                        </Tilt>
                      </ProjectLink>
                    </ImageWrapper>
                  </FadeCustom>
                </ColRight>
              </Row>
            </Fade>
          </ProjectWrapper>
        </Container>
      </ProjectsSectionWrapper>
    </>
  );
};

const ProjectsSectionWrapper = styled.section`
  background-color: #fff;
  color: #272341;
  margin-top: -15rem;
  padding-top: 15rem;
  padding: 5rem rem 0;

  @media (max-width: 75em) {
    margin-top: 0;
    padding-top: 5rem;
  }
`;

const Container = styled.div`
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  color: #272341;

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

const ProjectWrapper = styled.div`
  color: #272341;
  margin-bottom: 15rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const SectionTitle = styled.h2`
  opacity: 1;
  margin: 0 0 4.5rem;
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;

  @media (max-width: 37.5em) {
    font-size: 2.8rem;
  }
`;

const Row = styled.div`
  display: flex;
  //flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
  margin-bottom: 8rem;

  @media (max-width: 992px) {
    flex-direction: column;

    &.second {
      flex-direction: column-reverse;
    }
  }
`;

const Col = styled.div`
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;

  @media (min-width: 576px) {
    flex: 0 0 100%;
    max-width: 100%;
  }

  @media (min-width: 992px) {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
`;

const ColRight = styled.div`
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
`;

const ProjectName = styled.h3`
  font-weight: 700;
  margin-bottom: 1.8rem;
  font-size: 2.5rem;
  line-height: 1.2;
  margin-top: 0;
`;

const DescriptionWrapper = styled.div``;

const Description = styled.p`
  font-size: 1.6rem;
  margin-top: 0;
  margin-bottom: 1rem;
  text-align: left;
  color: #272341;
  font-weight: 400;
  line-height: 1.5;
`;

const Mb = styled.p`
  margin-bottom: 1.5rem;
  font-size: 1.6rem;
  margin-top: 0;
`;

const LinkToService = styled(Link)`
  text-decoration: none;
  background-image: linear-gradient(135deg, #02aab0, #00cdac);
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

  &:hover {
    color: #0056b3;
    text-decoration: none;
    transition: all 0.3s ease-in-out;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    bottom: 0;
    z-index: -1;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    background-image: linear-gradient(135deg, #02aab0, #00cdac);
  }
`;

const FadeCustom = styled(Fade)`
  width: 90%;
  margin: 0 auto;
  @media (max-width: 75em) {
    width: 100%;
    margin: 0;
  }
`;

const ImageWrapper = styled.div`
  width: 90%;
  margin: 0 auto;

  @media (max-width: 75em) {
    width: 100%;
    margin: 0;
  }
`;
const ProjectLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
`;

const Hidden = styled.div`
  width: 100%;
  padding-bottom: 56.1404%;
`;
const MovingImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
`;
const MovingImage = styled.img`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  //opacity: 0;
  transition-delay: 500ms;
`;

export default ProjectsSection;
