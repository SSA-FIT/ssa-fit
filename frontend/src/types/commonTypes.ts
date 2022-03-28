export interface SignUpResponse {
  status: number | null;
  message: string;
}

export interface EmailCodeRequest {
  // email: string;
  userEmail: string;
}

export interface EmailCodeConfirm {
  code: string;
  userEmail: string;
}

export interface IdCheckRequest {
  id: string;
}

export interface BodyInfoData {
  userHeight: string;
  userWeight: string;
  userLevel: string;
  userBirth: string;
  userGender: string;
}

export interface EmailBodyInfoData {
  userEmail: string;
  userHeight: string;
  userWeight: string;
  userBirth: string;
  userGender: string;
  userLevel: string;
}

export interface UserInfoData {
  userId: string;
  nickname: string;
  email: string;
  password: string;
}

export interface SignUpData {
  height: string;
  weight: string;
  level: string;
  birth: string;
  gender: string;
  userId: string;
  nickname: string;
  email: string;
  password: string;
}
