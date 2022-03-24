import { axiosInstance } from '../apis/axios';
import {
  RecommendationBookmarkRec,
  RecommendationEntire,
  RecommendationProfileRec,
  RecommendationSimilarityRec,
} from '../types/recommendationTypes';

class getRecommendationInfo {
  public static async getEntireReco(): Promise<RecommendationEntire> {
    const response = await axiosInstance.get<RecommendationEntire>(
      `/api/recommendation`,
    );

    return response.data;
  }

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
}

export default getRecommendationInfo;
