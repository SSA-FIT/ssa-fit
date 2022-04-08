import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import Tooltip from '@mui/material/Tooltip';

const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <Footer>
        <Container>
          <BackToTop>
            <BacktoTopLink>
              <AngleUp>
                <KeyboardArrowUpRoundedIcon onClick={scrollToTop} />
              </AngleUp>
            </BacktoTopLink>
          </BackToTop>
          <SocialLink>
            <Tooltip title="개인 정보 처리 방침">
              <SocialLinkItem to="/terms_of_service" target="_blank">
                <Image src="/images/common/UserIcon2.png" />
              </SocialLinkItem>
            </Tooltip>
            <Tooltip title="이용 약관">
              <SocialLinkItem to="/privacy" target="_blank">
                <Image src="/images/common/UserIcon2.png" />
              </SocialLinkItem>
            </Tooltip>
            <Tooltip title="SSAFIT UCC">
              <SocialSiteItem href="https://youtu.be/Go2zokmm9rw">
                <Image src="/images/common/YouTube1.png" />
              </SocialSiteItem>
            </Tooltip>
            <Tooltip title="SSAFIT GitHub">
              <SocialSiteItem href="https://github.com/">
                <Image src="/images/common/GitHubMarkLight.png" />
              </SocialSiteItem>
            </Tooltip>
          </SocialLink>
          <hr />
          <FooterText>©SSAFIT </FooterText>
        </Container>
      </Footer>
    </>
  );
};

const Footer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 4.8rem 0;
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
`;

const BackToTop = styled.span`
  display: flex;
  justify-content: center;
`;

const BacktoTopLink = styled.a`
  color: inherit;
  text-decoration: none;
  font-family: Montserrat, sans-serif;
  font-size: 1.6rem;
  background-color: transparent;
`;

const AngleUp = styled.i`
  color: #fff;
  margin: 1rem 0 1.6rem;
  transition: all 0.2s ease-in;
  cursor: pointer;
  font-size: 2em;
  display: inline-block;
  font: normal normal normal 14px/1 FontAwesome;

  text-rendering: auto;
`;

const SocialLink = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;
const SocialLinkItem = styled(Link)`
  flex-direction: column;
  color: #fff;
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  margin: 1.6rem;
  transition: all 0.2s ease-in;
  display: flex;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  @media (max-width: 576px) {
    margin-right: 1px;
  }
`;

const SocialSiteItem = styled.a`
  flex-direction: column;
  color: #fff;
  font-size: 3rem;
  width: 5rem;
  height: 5rem;
  margin: 1.6rem;
  transition: all 0.2s ease-in;
  display: flex;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  cursor: pointer;
  @media (max-width: 576px) {
    margin-right: 1px;
  }
`;
const Image = styled.img`
  @media (max-width: 576px) {
    width: 60px;
    hight: 60px;
  }
`;

const FooterText = styled.p`
  text-align: center;
  color: grey;
  font-size: 1.3rem;
  font-family: Montserrat, sans-serif;
  margin-top: 0;
  margin-bottom: 1rem;
  box-sizing: border-box;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;

export default FooterSection;
