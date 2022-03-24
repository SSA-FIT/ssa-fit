import { useState, useEffect } from 'react';
import RecommendationService from '../services/RecommendationService';
import { Recommendation } from '../types/recommendationTypes';

const useBookMarkList = () => {
  const [bookMarkList, setBookMarkList] = useState<Recommendation[]>([]);
  const token = 'skdjflksjdflkjdlkfjsdlkfjlk';
  useEffect(() => {
    async function fetchEntireExerciseList() {
      const bookMarkListData = await RecommendationService.getBookmark(token);

      setBookMarkList(bookMarkListData.bookmark);
    }

    fetchEntireExerciseList();
  }, []);

  return bookMarkList;
};

export default useBookMarkList;
