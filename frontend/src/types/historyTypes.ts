export interface ExerciseHistoryList {
  exerciseHistory: exerciseRecord[];
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
