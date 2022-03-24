import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { Recommendation } from '../types/recommendationTypes';

const useProfileRecList = () => {
  const [profileRecList, setProfileRecList] = useState<Recommendation[]>([]);
  const token = 'skdjflksjdflkjdlkfjsdlkfjlk';
  useEffect(() => {
    async function fetchEntireExerciseList() {
      const profileRecListData = await RecommendationService.getProfileReco(
        token,
      );

      setProfileRecList(profileRecListData.profileRec);
    }

    fetchEntireExerciseList();
  }, []);

  return profileRecList;
};

export default useProfileRecList;
