import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { SimilarityRecommendationType } from '../types/recommendationTypes';

const useSimilarityRecList = () => {
  const [similarityRecList, setSimilarityRecList] = useState<
    SimilarityRecommendationType[]
  >([]);

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
