import { useEffect } from 'react';
import Header from '../components/common/Header';
import TermsOfServiceSection from '../components/policy/TermsOfServiceSection';
import Footer from '../components/common/Footer';

const TermsOfServicePage: React.FC = () => {
  useEffect(() => {
    document.title = '서비스 이용 약관 | 싸핏';
  }, []);

  return (
    <>
      <Header />
      <TermsOfServiceSection />
      <Footer />
    </>
  );
};

export default TermsOfServicePage;
