import { useEffect } from 'react';

import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import ProfileCard from '../components/profile/ProfileCard';

const ProfilePage: React.FC = () => {
  useEffect(() => {
    document.title = '마이페이지';
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
