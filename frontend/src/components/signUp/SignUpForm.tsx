import styled from '@emotion/styled';

interface Props {
  setSignUpStep: (signUpStep: number) => void;
}

const SignUpForm: React.FC<Props> = ({ setSignUpStep }) => {
  const handleNext = () => {
    setSignUpStep(4);
  };

  const handleBefore = () => {
    setSignUpStep(2);
  };

  return (
    <>
      <Container>
        <StepName>회원정보 입력</StepName>
        <StepDescription>
          서비스 이용을 위해 회원 정보를 입력해주세요.
        </StepDescription>
        <RequiresWrapper>
          [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력 사항입니다.]
        </RequiresWrapper>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>회원정보 (필수)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputFieldWrapper>
              <InputName>
                아이디
                <InputRequireLabel>필수입력</InputRequireLabel>
                <InputDescription>6~12자리 영문, 숫자로 입력</InputDescription>
              </InputName>
              <InputAndButtonWrapper>
                <InputWrapper>
                  <Input />
                </InputWrapper>
                <OverlapConfirmButton>중복 확인</OverlapConfirmButton>
              </InputAndButtonWrapper>
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputName>
                비밀번호
                <InputRequireLabel>필수입력</InputRequireLabel>
                <InputDescription>
                  영문+숫자 6자~12자 이내 입력 가능, 특수문자 입력 불가
                </InputDescription>
              </InputName>
              <Input type="password" />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputName>
                비밀번호 확인
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input type="password" />
            </InputFieldWrapper>
            <InputFieldWrapper>
              <InputName>
                닉네임
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <InputAndButtonWrapper>
                <InputWrapper>
                  <Input />
                </InputWrapper>
                <OverlapConfirmButton>중복 확인</OverlapConfirmButton>
              </InputAndButtonWrapper>
            </InputFieldWrapper>
          </ContentWrapper>
        </ContentsWrapper>
        <ConFirmWrapper>
          <CancelButton onClick={handleBefore}>이전</CancelButton>
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

const RequiresWrapper = styled.div`
  box-sizing: border-box;
  margin: 0.8rem 0;
  color: #555;
  font-weight: 400;

  @media (min-width: 1060px) {
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;

const RequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }

  @media (min-width: 1060px) {
    top: 0.95rem;
  }
`;

const ContentsWrapper = styled.div`
  padding: 2rem 1.6rem;
  border: 1px solid #d9dbe1;
  box-sizing: border-box;
  margin: 4rem 0;

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    padding: 4.6rem 4rem;
  }
`;

const ContentNameWrapper = styled.div`
  margin-bottom: 2rem;
  padding-right: 2rem;

  @media (min-width: 1060px) {
    flex: 4;
    margin-bottom: 0;
  }
`;

const ContentName = styled.h3`
  display: inline-block;
  margin-bottom: 0;
  margin: 2rem 0 0.8rem;
  color: #000;
  font-weight: 700;
  font-size: 1.6rem;

  @media (min-width: 1060px) {
    margin: 4rem 0 0.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }

  &:first-of-type {
    margin-top: 0;
  }

  &:last-of-type {
    margin-bottom: 0;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
    flex: 8;
  }
`;

const InputFieldWrapper = styled.div`
  margin-top: 4rem;

  &:first-of-type {
    margin-top: 0;
  }
  @media (min-width: 1060px) {
    width: 100%;
  }
`;

const InputName = styled.label`
  display: block;
  margin-bottom: 0.2rem;
  color: #767676;
  font-size: 1.4rem;
  line-height: 1.58;

  @media (min-width: 1060px) {
    margin-bottom: 0.9rem;
  }
`;

const InputRequireLabel = styled.span`
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-indent: 100%;
  position: relative;
  width: 0.5rem;
  font-size: inherit;
  vertical-align: bottom;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #de001b;
  }
`;

const InputDescription = styled.span`
  display: block;
  margin-top: 0.2rem;
  color: #00256c;
  font-size: 1.4rem;
  line-height: 1.58;
`;

const InputAndButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

const InputWrapper = styled.div`
  margin-right: 2rem;
  flex: 1;
  position: relative;
  @media (min-width: 1060px) {
    margin-right: 1.2rem;
  }
`;

const Input = styled.input`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
  border-bottom: 1px solid #00256c;
  border-radius: 0;
  color: #000;
  font-size: 1.6rem;
  line-height: 1.5;
  transition: border 0.2s 0.3s, color 0.2s 0.3s, box-shadow 0.2s 0.3s;

  @media (min-width: 1060px) {
    height: 4.8rem;
    font-size: 1.8rem;
    line-height: 1.56;
  }
`;

const OverlapConfirmButton = styled.button`
  margin-top: 0.4rem;
  color: #555;
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';
  display: inline-block;
  min-width: 6.8rem;
  margin: 0;
  padding: 0.6rem 1.2rem 0.7rem;
  border-radius: 0.2rem;
  background-color: #fff;
  font-size: 1.4rem;
  line-height: 1.58;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  border: 1px solid #00256c;
  appearance: none;

  @media (min-width: 1060px) {
    margin-top: 0.8rem;
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
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

export default SignUpForm;
