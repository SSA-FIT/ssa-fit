import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import LogInCard from '../components/logIn/LogInCard';

const LogInPage: React.FC = () => {
  useEffect(() => {
    document.title = '로그인';
  }, []);

  return (
    <>
      <Header />
      <LogInCard />
      <Footer />
    </>
  );
};
export default LogInPage;
