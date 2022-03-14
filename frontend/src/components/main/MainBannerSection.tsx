import styled from '@emotion/styled';

const MainBannerSection: React.FC = () => {
  return (
    <>
      <Container>
        <Wrapper>
          <TextWrapper>
            <Text>Ready, Action,</Text>
            <BrandName>SSAFIT!</BrandName>
          </TextWrapper>
          <ButtonWrapper>
            <NonLoginButton>싸핏 체험하러가기</NonLoginButton>
          </ButtonWrapper>
        </Wrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: 1250px;
  background-color: rgb(255, 255, 255);

  @media (max-width: 991px) {
    margin-top: 100px;
  }
`;

const Wrapper = styled.div`
  width: 1200px;
  margin: 0px auto;
`;

const TextWrapper = styled.div`
  margin: 0px auto;
  padding-top: 112px;
  padding-bottom: 0px;
  text-align: center;

  & span::after {
    position: absolute;
    left: 0px;
    bottom: 0px;
    height: 50px;
    width: 100%;
    content: '';
    background: linear-gradient(
      126.12deg,
      rgb(0, 198, 255) 0%,
      rgb(153, 51, 255) 100%
    );
    z-index: -1;
  }
`;

const Text = styled.span`
  position: relative;
  display: block;
  width: 910px;
  margin: 0px auto;
  color: rgb(0, 0, 0);
  font-size: 120px;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 140px;
  text-align: center;
  z-index: 1;
`;

const BrandName = styled.span`
  position: relative;
  display: block;
  width: 440px;
  margin: 0px auto;
  color: rgb(0, 0, 0);
  font-size: 120px;
  font-weight: 900;
  letter-spacing: 0px;
  line-height: 140px;
  text-align: center;
  z-index: 1;
`;

const ButtonWrapper = styled.div`
  margin-top: 86px;
  margin-bottom: 132px;
  text-align: center;
`;

const NonLoginButton = styled.button`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  box-sizing: border-box;
  width: 238px;
  height: 60px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 34px;
  background: rgb(0, 0, 0);
  padding-top: 0px;
  padding-bottom: 0px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: rgb(0, 0, 0);
    color: rgb(153, 51, 255);
    opacity: 1;
  }
`;
export default MainBannerSection;
