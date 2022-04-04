import { SignUpResponse } from '../types/commonTypes';
import { axiosInstance } from '../apis/axios';
import {
  ProfileRecoWithoutTokenRequest,
  RecommendationBookmarkRec,
  RecommendationEntire,
  RecommendationProfileRec,
  RecommendationSimilarityRec,
  recoRecordList,
} from '../types/recommendationTypes';

class RecommendationService {
  // 비로그인, 로그인
  public static async getEntireReco(): Promise<RecommendationEntire> {
    const response = await axiosInstance.get<RecommendationEntire>(
      `/api/recommendation`,
    );

    return response.data;
  }

  // 비로그인
  public static async getProfileRecoWithoutToken(
    data: ProfileRecoWithoutTokenRequest,
  ): Promise<RecommendationProfileRec> {
    const response = await axiosInstance.post<RecommendationProfileRec>(
      `/api/recommendation/profile`,
      data,
    );

    return response.data;
  }

  // 로그인
  public static async getProfileReco(
    token: string,
  ): Promise<RecommendationProfileRec> {
    const response = await axiosInstance.get<RecommendationProfileRec>(
      `/api/recommendation/profile`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getSimilarityReco(
    token: string,
  ): Promise<RecommendationSimilarityRec> {
    const response = await axiosInstance.get<RecommendationSimilarityRec>(
      `/api/recommendation/similarity`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  public static async getBookmark(
    token: string,
  ): Promise<RecommendationBookmarkRec> {
    const response = await axiosInstance.get<RecommendationBookmarkRec>(
      `/api/recommendation/bookmark`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }

  // 운동 저장
  public static async saveExerciseRecords(
    data: recoRecordList,
    token: string,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      `/api/recommendation/records`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}

export default RecommendationService;
