import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NonUserProfile from '../components/exercise/NonUserProfile';

const NonUserProfilePage: React.FC = () => {
  useEffect(() => {
    document.title = '신체 정보 입력';
  }, []);

  return (
    <>
      <Header />
      <NonUserProfile />
      <Footer />
    </>
  );
};
export default NonUserProfilePage;
