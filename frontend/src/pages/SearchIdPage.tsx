import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import SearchingId from '../components/logIn/SearchingId';

const SearchIdPage: React.FC = () => {
  useEffect(() => {
    document.title = '아이디 찾기';
  }, []);

  return (
    <>
      <Header />
      <SearchingId />
      <Footer />
    </>
  );
};
export default SearchIdPage;
