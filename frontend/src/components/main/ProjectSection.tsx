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
                    <ProjectName id="title">추천 서비스</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">
                        첫 번째, 개인의 나이, BMI, 운동레벨의 신체정보 기반으로
                        운동을 추천해줍니다. 운동레벨은 SSA-FIT 자가체력진단
                        서비스를 통해 확인할 수 있습니다. 회원가입 없이 체험이
                        가능하고, 국민체육진흥공단 공공데이터를 사용하여
                        신뢰도를 높였습니다.
                      </Description>
                      <Mb></Mb>
                      <Description id="p">
                        두 번째, 개인별 선호하는 운동과 유사도가 높은 사용자의
                        데이터를 기반으로 SSA-FIT 만의 최적화된 알고리즘이
                        개인별 맞춤 운동을 추천해줍니다.
                      </Description>
                    </DescriptionWrapper>
                    <LinkToService to="/exercise" id="blank">
                      운동 추천 서비스 체험하러 가기
                    </LinkToService>
                  </Fade>
                </Col>
                <ColRight id="colRignt">
                  <FadeCustom duration={1000} delay={1000} distance="30px">
                    <ImageWrapper>
                      <ProjectLink to="/exercise">
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
                      <ProjectLink to="/users/sign-up">
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
                    <ProjectName id="title">운동하기 서비스</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">
                        개인이 선택한 운동의 YouTube 영상을 직접 확인하며 운동을
                        쉽게 따라할 수 있습니다. SSA-FIT 회원은 운동을 진행하며
                        운동횟수, 세트수, 운동시간의 개인 운동 이력을 저장할 수
                        있습니다. 운동 이력은 마이페이지에서 확인할 수 있고,
                        주/일 별 운동 기록을 조회할 수 있습니다. 좋아하는 운동은
                        즐겨찾기를 통해 관리하고 쉽게 확인할 수 있습니다.
                      </Description>
                      <Mb></Mb>
                    </DescriptionWrapper>
                    <LinkToService to="/users/sign-up" id="blank">
                      회원 가입하러 가기
                    </LinkToService>
                  </Fade>
                </Col>
              </Row>
              <Row id="row">
                <Col id="col">
                  <Fade duration={1000} delay={1000} distance="30px">
                    <ProjectName id="title">TEAM SSA-FIT</ProjectName>
                    <DescriptionWrapper id="div">
                      <Description id="p">
                        SSA-FIT 은 개인정보 보호를 위해 회원 가입 시, 개인의
                        신체 정보를 모두 암호화하여 관리합니다. <br />
                        여러분 모두의 기초체력이 표준 이상이 되는 그날까지
                        SSA-FIT 이 함께합니다.
                      </Description>
                      <Mb></Mb>
                    </DescriptionWrapper>
                    <LinkToService to="#" id="blank">
                      SSAFIT UCC
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
  font-size: 22px;
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
  margin-bottom: 16px;

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
