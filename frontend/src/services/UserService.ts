import { axiosInstance } from '../apis/axios';

import {
  EmailCodeRequest,
  EmailCodeConfirm,
  SignUpResponse,
} from '../types/commonTypes';

class UserService {
  public static async getUserInfo(
    data: EmailCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/users/sign-up/email-verification`,
      {
        params: data,
      },
    );

    return response.data;
  }

  // 이메일 인증요청
  public static async getEmailCodeRequest(
    data: EmailCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/users/sign-up/email-verification`,
      {
        params: data,
      },
    );

    return response.data;
  }

  // 이메일 인증번호 검증
  public static async getEmailCodeConfirm(
    data: EmailCodeConfirm,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      `/api/users/sign-up/email-verification`,
      data,
    );

    return response.data;
  }
}

export default UserService;
