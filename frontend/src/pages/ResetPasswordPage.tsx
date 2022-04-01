import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ResetPasswordVerify from '../components/logIn/ResetPasswordVerify';

const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    document.title = '비밀번호 재설정';
  }, []);

  return (
    <>
      <Header />
      <ResetPasswordVerify />
      <Footer />
    </>
  );
};
export default ResetPasswordPage;
