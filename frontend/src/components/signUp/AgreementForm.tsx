import styled from '@emotion/styled';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
}

const AgreementForm: React.FC<Props> = ({ setSignUpStep }) => {
  const handleNext = () => {
    console.log('1');
    setSignUpStep(1);
  };

  return (
    <>
      <Container>
        <StepName>약관 동의</StepName>
        <StepDescription>
          약관 및 개인정보 수집 이용에 동의해주세요.
        </StepDescription>
        <AgreementFieldSet>
          <AllAgreementWrapper>
            <Selections>
              <InputCheck type="checkbox" id="checkbox-all" />
              <AgreementLabel className="bold" htmlFor="checkbox-all">
                필수 약관에 모두 동의합니다.
              </AgreementLabel>
            </Selections>
          </AllAgreementWrapper>
          <AgreementList>
            <AgreementItem>
              <AgreementLabel>[필수] 이용약관</AgreementLabel>
            </AgreementItem>
            <AgreementItem>
              <AgreementLabel>
                [필수] 개인 정보 수집 및 이용 동의
              </AgreementLabel>
            </AgreementItem>
          </AgreementList>
        </AgreementFieldSet>
        <ConFirmWrapper>
          <CancelButton>취소</CancelButton>
          <ConfirmButton onClick={handleNext}>확인</ConfirmButton>
        </ConFirmWrapper>
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

const AgreementFieldSet = styled.fieldset`
  margin: 0;
  padding: 0;
  border: 0;
`;

const AllAgreementWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const Selections = styled.div`
  position: relative;
`;

const InputCheck = styled.input`
  position: absolute;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const AgreementLabel = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  &::before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0.2rem;
    left: 0;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 0.2rem;
    background-size: 11px 9px;
  }

  &.bold {
    font-weight: 700;
  }
`;

const AgreementList = styled.ul`
  border: 1px solid #d9dbe1;
  margin-top: 0;
  border-top: 0;
  list-style: none;

  &:last-child {
    margin-bottom: 0;
  }
`;

const AgreementItem = styled.li`
  padding: 1.2rem 1.6rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const ConFirmWrapper = styled.div`
  justify-content: space-between;
  display: flex;
  justify-items: flex-start;
  margin: 4rem 0;

  &:last-child {
    margin-bottom: 0;
  }
`;

const CancelButton = styled.button`
  flex: 6;
  margin-right: 0.4rem;
  background-color: #fff;
  color: #013066;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #013066;
  border-radius: 0.2rem;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;

const ConfirmButton = styled.button`
  flex: 6;
  margin-left: 0.4rem;
  display: block;
  width: 100%;
  padding: 1.5rem 2rem 1.6rem;
  border: 1px solid #013066;
  border-radius: 0.2rem;
  background-color: #013066;
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  appearance: none;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
`;
export default AgreementForm;
