import styled from '@emotion/styled';

const ContactSection: React.FC = () => {
  return (
    <>
      <Section>
        <Container>
          <Title>Contact</Title>
          <ContactWrapper>
            <ContactWrapperText>
              Would you like to work with me? Awesome!
            </ContactWrapperText>
            <ContactButton>Let's Talk</ContactButton>
          </ContactWrapper>
        </Container>
      </Section>
    </>
  );
};

const Section = styled.section`
  background-image: linear-gradient(135deg, #02aab0, #00cdac);
  clip-path: polygon(0 15vh, 100% 0, 100% 100%, 0 100%);
  padding: 15rem 0 10rem;
  margin-top: -15rem;
  margin-bottom: -1px;
  color: #fff;

  @media (max-width: 75em) {
    padding: 10rem 0;
    margin-top: 0;
    clip-path: none;
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

    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    box-sizing: border-box;
  }
`;

const Title = styled.h2`
  animation-fill-mode: both;
  animation-duration: 1000ms;
  animation-delay: 300ms;
  animation-iteration-count: 1;
  opacity: 1;
  animation-name: react-reveal-836151465924688-2;
  margin: 0 0 4.5rem;
  font-size: 4rem;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1.2;
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  @media (max-width: 37.5em) {
    font-size: 2.8rem;
  }
`;

const ContactWrapper = styled.div`
animation-fill-mode: both;
    animation-duration: 1000ms;
    animation-delay: 800ms;
    animation-iteration-count: 1;
    opacity: 1;
    animation-name: react-reveal-836151465924688-3;
    margin-top: 3.2rem;
    padding: 0 2rem;
    backface-visibility: hidden;
}
`;

const ContactWrapperText = styled.p`
  font-size: 2.4rem;
  margin-bottom: 2.5rem;
  font-family: Montserrat, sans-serif;

  margin-top: 0;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;

  @media (max-width: 37.5em) {
    font-size: 2rem;
  }
`;

const ContactButton = styled.a`
  font-size: 2.4rem;
  text-decoration: none;
  color: #fff;
  border: 2px solid #fff;
  display: inline-block;
  position: relative;
  padding: 0.8rem 1.6rem;
  font-weight: 700;
  line-height: 1;
  z-index: 1;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  font-family: Montserrat, sans-serif;
  background-color: transparent;
  cursor: pointer;

  @media (max-width: 37.5em) {
    font-size: 2rem;
  }
`;

export default ContactSection;
