export interface SignUpData {
  height: string;
  weight: string;
}

export interface SignUpResponse {
  status: number | null;
  message: string;
}

export interface EmailCodeRequest {
  email: string;
}

export interface EmailCodeConfirm {
  code: string;
  email: string;
}

export interface BodyInfoData {
  height: string;
  weight: string;
  level : string;
  birth : string;
  gender : string;
}

export interface UserInfoData {
  userId : string;
  nickname : string;
  email : string;
  password : string;
}