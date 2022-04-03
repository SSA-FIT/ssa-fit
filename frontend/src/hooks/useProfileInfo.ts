import { useSelector } from 'react-redux';
import { UserInfo } from '../types/profileTypes';
import { RootState } from '../types/authTypes';

const useProfileInfo = () => {
  const profileInfo = useSelector<RootState, UserInfo | null>(
    (state) => state.profile.info,
  );

  return profileInfo;
};

export default useProfileInfo;
