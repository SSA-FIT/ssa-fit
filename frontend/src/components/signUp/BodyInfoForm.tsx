import styled from '@emotion/styled';

const BodyInfoForm: React.FC = () => {
  return (
    <>
      <Container>
        <StepName>신체정보 입력</StepName>
        <StepDescription>추천을 위해 신체 정보를 입력해주세요.</StepDescription>
        <RequiresWrapper>
          [<RequireLabel>빨강동그라미</RequireLabel>는 필수 입력 사항입니다.]
        </RequiresWrapper>
        <ContentsWrapper>
          <ContentNameWrapper>
            <ContentName>신체정보 (필수)</ContentName>
          </ContentNameWrapper>
          <ContentWrapper>
            <InputWrapper>
              <InputName>
                키(cm)
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                몸무게(kg)
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                생년월일
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <Input type="date" />
            </InputWrapper>
            <InputWrapper>
              <InputName>
                성별
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <GenderSelectWrapper>
                <GenderSelect>
                  <GenderInput type="radio" value="M" id="M" name="gender" />
                  <Gender htmlFor="M">남자</Gender>
                </GenderSelect>
                <GenderSelect>
                  <GenderInput type="radio" value="FM" id="FM" name="gender" />
                  <Gender htmlFor="FM">여자</Gender>
                </GenderSelect>
              </GenderSelectWrapper>
            </InputWrapper>
            <InputWrapper>
              <InputName>
                운동레벨
                <InputRequireLabel>필수입력</InputRequireLabel>
              </InputName>
              <SelfExerciseLevelButtonWrapper>
                <SelfExerciseLevelButton>
                  자가 체력 진단
                </SelfExerciseLevelButton>
              </SelfExerciseLevelButtonWrapper>
            </InputWrapper>
          </ContentWrapper>
        </ContentsWrapper>
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

const InputWrapper = styled.div`
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

const GenderSelectWrapper = styled.ul`
  list-style: none;
  margin: 2.2rem 0;

  &:last-of-type {
    margin-bottom: 0;
  }

  @media (min-width: 1060px) {
    display: flex;
    flex-wrap: wrap;
  }
`;

const GenderSelect = styled.li`
  position: relative;
  @media (min-width: 1060px) {
    width: 33.33333333%;
    padding-right: 1rem;
  }
`;

const GenderInput = styled.input`
  position: absolute;
  left: 0;
  width: 2rem;
  height: 2rem;
  border: 0;
`;

const Gender = styled.label`
  display: inline-block;
  position: relative;
  padding-left: 2.6rem;
  color: #000;
  font-size: 1.4rem;
  line-height: 1.58;
  text-indent: 0;

  @media (min-width: 1060px) {
    padding-left: 3rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;
const SelfExerciseLevelButtonWrapper = styled.div`
  appearance: none;
  box-sizing: border-box;
  display: block;
  opacity: 1;
  width: 100%;
  height: 4rem;
  margin: 0;
  padding: 0;
  border: 0;
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

const SelfExerciseLevelButton = styled.button`
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
  font-family: 'Spoqa Han Sans Neo', 'sans-serif';

  @media (min-width: 1060px) {
    min-width: 8.4rem;
    padding: 0.7rem 0.8rem;
    font-size: 1.6rem;
    line-height: 1.5;
  }
`;
export default BodyInfoForm;
