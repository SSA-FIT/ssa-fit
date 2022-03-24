import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { Recommendation } from '../types/recommendationTypes';

const useSimilarityRecList = () => {
  const [similarityRecList, setSimilarityRecList] = useState<Recommendation[]>(
    [],
  );
  const token = 'skdjflksjdflkjdlkfjsdlkfjlk';
  useEffect(() => {
    async function fetchEntireExerciseList() {
      const similarityRecListData =
        await RecommendationService.getSimilarityReco(token);

      setSimilarityRecList(similarityRecListData.similarityRec);
    }

    fetchEntireExerciseList();
  }, []);

  return similarityRecList;
};

export default useSimilarityRecList;
