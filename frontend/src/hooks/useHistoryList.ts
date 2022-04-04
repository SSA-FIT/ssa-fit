import { useState, useEffect } from 'react';
import HistoryService from '../services/HistoryService';
import RecommendationService from '../services/RecommendationService';
import { exerciseRecord } from '../types/historyTypes';
import useToken from './useToken';

const useHistoryList = (year: string, month: string, week: string) => {
  const token = useToken();

  const [bookMarkList, setBookMarkList] = useState<exerciseRecord[]>([]);
  useEffect(() => {
    async function fetchEntireExerciseList() {
      if (token !== null) {
        const HistoryListData = await HistoryService.getExerciseHistory(
          {
            month,
            week,
            year,
          },
          token,
        );

        setBookMarkList(HistoryListData.exerciseHistory);
      }
    }

    fetchEntireExerciseList();
  }, []);

  return bookMarkList;
};

export default useHistoryList;
