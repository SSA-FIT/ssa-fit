import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ExerciseHistory from '../components/history/ExerciseHistory';
import LogInCard from '../components/logIn/LogInCard';
import SignUpCard from '../components/signUp/SignUpCard';
import { putBookmarkInfo as BookmarkSagaPut } from '../redux/bookmark';

const ExerciseHistoryPage: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    document.title = '운동기록';
  }, []);

  useEffect(() => {
    dispatch(BookmarkSagaPut());
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
