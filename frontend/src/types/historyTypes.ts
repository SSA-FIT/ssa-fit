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
  name: string;
  countPerSet: string | null;
  setCount: number | null;
  durationTime: string | null;
  imageURL: string;
  bookmark: boolean;
}

export interface exerciseRecordRequest {
  year: string;
  month: string;
  week: string;
}
