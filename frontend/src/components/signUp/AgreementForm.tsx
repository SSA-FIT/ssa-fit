import styled from '@emotion/styled';

const AgreementForm: React.FC = () => {
  return (
    <>
      <Container>
        <StepName>약관 동의</StepName>
        <StepDescription>
          약관 및 개인정보 수집 이용에 동의해주세요.
        </StepDescription>
        <AgreementFieldSet>
          <AllAgreementWrapper />
        </AgreementFieldSet>
      </Container>
    </>
  );
};
const Container = styled.div``;

const StepName = styled.h2`
  color: #00256c;
  font-weight: 700;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 2.4rem;
    line-height: 1.5;
  }
`;

const StepDescription = styled.p`
  display: block;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const AgreementFieldSet = styled.fieldset``;

const AllAgreementWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;
`;
export default AgreementForm;
