import { useState } from 'react';
import styled from '@emotion/styled';
import { Redirect } from 'react-router-dom';
import BodyInfoForm from './BodyInfoForm';
import SignUpForm from './SignUpForm';
import SignUpSteppers from './SignUpSteppers';
import EmailVerification from './EmailVerification';
import AgreementForm from './AgreementForm';
import SignUpComplete from './SignUpComplete';

const SignUpCard: React.FC = () => {
  const [signUpStep, setSignUpStep] = useState<number>(0);
  const [signUpEmail, setSignUpEmail] = useState<string>('');

  return (
    <>
      <ContainerWrapper>
        <Container>
          <Contents>
            <SignUpName>회원가입</SignUpName>
            <SignUpSteppersWrapper>
              <SignUpSteppers signUpStep={signUpStep} />
            </SignUpSteppersWrapper>
            {(() => {
              switch (signUpStep) {
                case 0:
                  return <AgreementForm setSignUpStep={setSignUpStep} />;
                case 1:
                  return (
                    <EmailVerification
                      setSignUpStep={setSignUpStep}
                      // setSignUpEmail={setSignUpEmail}
                    />
                  );
                case 2:
                  return <BodyInfoForm setSignUpStep={setSignUpStep} />;
                case 3:
                  return <SignUpForm setSignUpStep={setSignUpStep} />;
                case 4:
                  return <SignUpComplete />;
                default:
                  return <Redirect to="/" />;
              }
            })()}
          </Contents>
        </Container>
      </ContainerWrapper>
    </>
  );
};

const ContainerWrapper = styled.div`
  display: block;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
// padding: 4rem 2rem 13rem;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 2rem;

  @media (min-width: 1060px) {
    padding: 0 2rem;
  }
`;

const Contents = styled.div`
  margin: 0 auto;
  padding: 4rem 2rem 13rem;
  box-sizing: border-box;

  @media (min-width: 1060px) {
    max-width: 128rem;
    padding: 6rem 0 10rem;
  }
`;

const SignUpName = styled.h1`
  margin-bottom: 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 2rem;

  @media (min-width: 1060px) {
    font-weight: 400;
    font-size: 3.2rem;
  }
`;

const SignUpSteppersWrapper = styled.div`
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1.2rem;

  @media (min-width: 1060px) {
    margin: 3.2rem 0 1.2rem;
  }
`;

export default SignUpCard;
