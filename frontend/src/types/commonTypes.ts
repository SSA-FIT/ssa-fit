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
