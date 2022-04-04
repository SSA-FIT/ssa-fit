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

export interface ProfileResponse {
  userInfo: UserInfo;
  status: number | null;
  message: string | null;
}

export interface ProfileRequest {
  height: string;
  weight: string;
  level: string;
  birth: string;
  gender: string;
  nickname: string;
}

export interface DeleteUser {
  password: string;
}
