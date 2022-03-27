export interface UserInfo {
  id: number;
  height: string;
  weight: string;
  bmi: string;
  level: string;
  birth: string;
  gender: string;
  userId: string;
  nickname: string;
  email: string;
}

export interface LogInResponse {
  token: string;
  userInfo: UserInfo;
}

export interface LogInApiResponse {
  status: number | null;
  message: string;
  token: string;
  userInfo: UserInfo | null;
}

export interface LogInRequest {
  userId: string;
  password: string;
}
