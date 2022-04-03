import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import {
  NonUser,
  ProfileRecoWithoutTokenRequest,
  Recommendation,
} from '../types/recommendationTypes';

const useProfileRecList = (
  token: string | null,
  state: ProfileRecoWithoutTokenRequest | null,
) => {
  const [profileRecList, setProfileRecList] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function fetchEntireExerciseList() {
      if (token !== null) {
        const profileRecListData = await RecommendationService.getProfileReco(
          token,
        );

        setProfileRecList(profileRecListData.profileRec);
      } else if (state !== null) {
        const profileRecListData =
          await RecommendationService.getProfileRecoWithoutToken(state);
        setProfileRecList(profileRecListData.profileRec);
      }
    }

    fetchEntireExerciseList();
  }, []);

  return profileRecList;
};

export default useProfileRecList;
