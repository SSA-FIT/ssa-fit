import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { Recommendation } from '../types/recommendationTypes';

const useBookMarkList = (token: string | null) => {
  const [bookMarkList, setBookMarkList] = useState<Recommendation[]>([]);
  useEffect(() => {
    async function fetchEntireExerciseList() {
      if (token !== null) {
        const bookMarkListData = await RecommendationService.getBookmark(token);

        setBookMarkList(bookMarkListData.bookmark);
      }
    }

    fetchEntireExerciseList();
  }, []);

  return bookMarkList;
};

export default useBookMarkList;
