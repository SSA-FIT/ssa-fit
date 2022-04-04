import { BookmarkState } from '../redux/bookmark';
import { AuthState } from '../redux/modules/auth';
import { ProfileState } from '../redux/modules/profile';

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
}

export interface LogInApiResponse {
  status: number | null;
  message: string;
  token: string;
}

export interface LogInRequest {
  userId: string;
  password: string;
}

export interface LogInRequestIdCheck {
  userId: string;
  password: string;
  idCheck: boolean;
}

export interface RootState {
  auth: AuthState;
  profile: ProfileState;
  bookmark: BookmarkState;
}
