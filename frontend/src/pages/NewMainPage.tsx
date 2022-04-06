import { useEffect } from 'react';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import NewMain from '../components/main/NewMain';

const NewMainPage: React.FC = () => {
  useEffect(() => {
    document.title = 'Ready, Action, SSAFIT!';
  }, []);

  return (
    <>
      <Header />
      <NewMain />
      <Footer />
    </>
  );
};
export default NewMainPage;
