export interface Recommendation {
  id: number;
  name: string;
  imageURL: string;
  description: string;
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
  similarityRec: Recommendation[];
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
