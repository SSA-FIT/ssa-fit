import { axiosInstance } from '../apis/axios';
import {
  ExerciseHistoryList,
  exerciseRecordRequest,
} from '../types/historyTypes';

class HistoryService {
  public static async getExerciseHistory(
    data: exerciseRecordRequest,
    token: string,
  ): Promise<ExerciseHistoryList> {
    const response = await axiosInstance.get<ExerciseHistoryList>(
      `/api/users/exercise-history`,
      {
        params: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}

export default HistoryService;
