import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { Recommendation } from '../types/recommendationTypes';

const useEntireSelectionList = () => {
  const [entireSelections, setEntireSelections] = useState<Recommendation[]>(
    [],
  );

  useEffect(() => {
    async function fetchEntireExerciseList() {
      const entireExerciseList = await RecommendationService.getEntireReco();

      setEntireSelections(entireExerciseList.exercises);
    }

    fetchEntireExerciseList();
  }, []);

  return entireSelections;
};

export default useEntireSelectionList;
