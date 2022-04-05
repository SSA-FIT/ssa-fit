export interface ExerciseHistoryList {
  exerciseHistory: exerciseRecord[];
  status: number | null;
  message: string | null;
}

export interface exerciseRecord {
  date: string;
  exercise: exerciseItemRecord[];
}

export interface exerciseItemRecord {
  exerciseId: number;
  getName: string;
  countPerSet: number;
  setCount: number;
  durationTime: string;
  imageURL: string;
  bookmark: boolean;
}

export interface exerciseRecordRequest {
  year: string;
  month: string;
  week: string;
}
