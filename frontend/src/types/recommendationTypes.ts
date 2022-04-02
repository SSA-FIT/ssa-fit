export interface ProfileRecoWithoutTokenRequest {
  height: string;
  weight: string;
  level: string;
  gender: string;
  birth: string;
}
export interface NonUser {
  state: ProfileRecoWithoutTokenRequest | null;
}
export interface Recommendation {
  id: number;
  name: string;
  imageURL: string;
}

export interface SimilarityRecommendationType {
  id: number;
  name: string;
  imageURL: string;
  score: number;
}

export interface RecommendationProfileRec {
  profileRec: Recommendation[];
  status: number | null;
  message: string | null;
}

export interface RecommendationEntire {
  exercises: Recommendation[];
  status: number | null;
  message: string | null;
}

export interface RecommendationSimilarityRec {
  similarityRec: SimilarityRecommendationType[];
  status: number | null;
  message: string | null;
}

export interface RecommendationBookmarkRec {
  bookmark: Recommendation[];
  status: number | null;
  message: string | null;
}

export interface UserSelectListProp {
  setUserRecoSelectList: (userRecoSelectList: Recommendation[]) => void;
  userRecoSelectList: Recommendation[];
}

export interface UserVideoSelectListProp {
  userVideoSelectList: YoutubeVideo[];
  setUserVideoSelectList: (userVideoSelectList: YoutubeVideo[]) => void;
}

export interface YoutubeListProp {
  userRecoSelectList: Recommendation[];
  setYoutubeVideoList: (youtubeVideoList: YoutubeVideo[]) => void;
}

export interface YoutubeVideo {
  id: number;
  searchName: string;
  videoId: string;
  title: string;
  thumbnails: string;
}

export interface VideoListProp {
  youtubeVideoList: YoutubeVideo[];
  userVideoSelectList: YoutubeVideo[];
  setUserVideoSelectList: (userVideoSelectList: YoutubeVideo[]) => void;
}

export interface recoRecord {
  id: number;
  countPerSet: number;
  setCount: 5;
  derationTime: string;
}
export interface recoRecordList {
  exercises: recoRecord[];
}
