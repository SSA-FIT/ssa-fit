import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const MainPage: React.FC = () => {
  useEffect(() => {
    document.title = '싸핏';
  }, []);
  return (
    <>
      <Header />
      <Footer />
    </>
  );
};
export default MainPage;
