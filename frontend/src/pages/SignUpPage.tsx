import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import SignUpCard from '../components/signUp/SignUpCard';

const SignUpPage: React.FC = () => {
  useEffect(() => {
    document.title = '회원가입';
  }, []);

  return (
    <>
      <Header />
      <SignUpCard />
      <Footer />
    </>
  );
};
export default SignUpPage;
