import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { SimilarityRecommendationType } from '../types/recommendationTypes';

const useSimilarityRecList = (token: string | null) => {
  const [similarityRecList, setSimilarityRecList] = useState<
    SimilarityRecommendationType[]
  >([]);

  useEffect(() => {
    async function fetchEntireExerciseList() {
      if (token !== null) {
        const similarityRecListData =
          await RecommendationService.getSimilarityReco(token);

        setSimilarityRecList(similarityRecListData.similarityRec);
      }
    }

    fetchEntireExerciseList();
  }, [token]);

  return similarityRecList;
};

export default useSimilarityRecList;
