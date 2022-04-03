import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ExerciseHistory from '../components/history/ExerciseHistory';
import LogInCard from '../components/logIn/LogInCard';
import SignUpCard from '../components/signUp/SignUpCard';

const ExerciseHistoryPage: React.FC = () => {
  useEffect(() => {
    document.title = '운동기록';
  }, []);

  return (
    <>
      <Header />
      <ExerciseHistory />
      <Footer />
    </>
  );
};
export default ExerciseHistoryPage;
