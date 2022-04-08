import { push } from 'connected-react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ProfileCard from '../components/profile/ProfileCard';
import useToken from '../hooks/useToken';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = '마이페이지';
  }, []);

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
      <ProfileCard />
      <Footer />
    </>
  );
};
export default ProfilePage;
