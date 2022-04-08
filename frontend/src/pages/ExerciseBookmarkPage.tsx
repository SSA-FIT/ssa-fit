import { push } from 'connected-react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import Bookmark from '../components/bookmark/Bookmark';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import useToken from '../hooks/useToken';

const ExerciseBookmarkPage: React.FC = () => {
  useEffect(() => {
    document.title = '즐겨찾기';
  }, []);
  const dispatch = useDispatch();
  const token = useToken();

  useEffect(() => {
    if (token === null) {
      Swal.fire({
        icon: 'warning',
        html: `회원 전용 페이지 입니다. <br> 로그인 후 이용해주세요`,
        showConfirmButton: false,
        timer: 3000,
      });
      dispatch(push('/'));
    }
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
