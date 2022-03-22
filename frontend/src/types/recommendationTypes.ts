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
  setUserSelectList: (userSelectList: Recommendation[]) => void;
  userSelectList: Recommendation[];
}
