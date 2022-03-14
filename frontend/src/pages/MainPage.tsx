import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import MainBannerSection from '../components/main/MainBannerSection';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '싸핏';
  }, []);

  return (
    <>
      <Header />
      <MainBannerSection />
      <Footer />
    </>
  );
};
export default MainPage;
