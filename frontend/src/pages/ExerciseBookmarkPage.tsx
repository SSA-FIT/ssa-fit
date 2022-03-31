import { useEffect } from 'react';
import Bookmark from '../components/bookmark/Bookmark';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';

const ExerciseBookmarkPage: React.FC = () => {
  useEffect(() => {
    document.title = '즐겨찾기';
  }, []);

  return (
    <>
      <Header />
      <Bookmark />
      <Footer />
    </>
  );
};

export default ExerciseBookmarkPage;
