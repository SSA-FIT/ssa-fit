import styled from '@emotion/styled';

const SignUpComplete: React.FC = () => {
  return (
    <>
      <Container>
        <CompleteMessage>회원 가입이 완료되었습니다.</CompleteMessage>
        <CompleteDescription>
          싸핏 회원의 다양한 혜택들을 이용하실 수 있습니다.
        </CompleteDescription>
        <ConFirmWrapper>
          <LogInButton>로그인하러가기</LogInButton>
        </ConFirmWrapper>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 76.8rem;
  margin: 4rem auto;
  padding-top: 6rem;
  text-align: center;
`;

const CompleteMessage = styled.h2`
  display: block;
  margin-bottom: 1.2rem;
  outline: 0;
  color: #000;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 1.56;
`;

const CompleteDescription = styled.p`
  display: block;
  margin-top: 1.2rem;
  color: #555;
  font-size: 1.4rem;
  line-height: 1.58;
  margin-bottom: 0;
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

const LogInButton = styled.button`
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
export default SignUpComplete;
