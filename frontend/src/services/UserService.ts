import { axiosInstance } from '../apis/axios';
import { LogInApiResponse, LogInRequest } from '../types/authTypes';

import {
  EmailCodeRequest,
  EmailCodeConfirm,
  SignUpResponse,
  IdCheckRequest,
  SignUpData,
  SearchIdResponse,
  ResetPasswordEmailCodeRequest,
  ResetPasswordEmailCodeConfirm,
  ResetPasswordConfirm,
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

  // 아이디 중복체크
  public static async getIdCheckRequest(
    data: IdCheckRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/users/sign-up/id-check`,
      {
        params: data,
      },
    );

    return response.data;
  }

  // 회원가입
  public static async userSignUp(data: SignUpData): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      `/api/users/sign-up`,
      data,
    );

    return response.data;
  }

  // 로그인
  public static async userLogIn(data: LogInRequest): Promise<LogInApiResponse> {
    const response = await axiosInstance.post<LogInApiResponse>(
      `/api/users/login`,
      data,
    );

    return response.data;
  }

  // 로그아웃
  public static async logout(token: string): Promise<void> {
    await axiosInstance.delete('', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 아이디 찾기
  public static async searchId(
    data: EmailCodeRequest,
  ): Promise<SearchIdResponse> {
    const response = await axiosInstance.get<SearchIdResponse>(
      `/api/users/login/searching-id`,
      {
        params: data,
      },
    );

    return response.data;
  }

  // 비밀번호 재설정 - 이메일 인증 요청 & 재요청
  public static async getResetPasswordEmailCodeRequest(
    data: ResetPasswordEmailCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/users/login/reset-password`,
      {
        params: data,
      },
    );

    return response.data;
  }

  // 비밀번호 재설정 - 인증 코드 확인
  public static async ResetPasswordEmailCodeConfirm(
    data: ResetPasswordEmailCodeConfirm,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      `/api/users/login/reset-password`,
      data,
    );

    return response.data;
  }

  // 비밀번호 재설정 - 새로운 비밀번호 설정
  public static async ResetPasswordConfirm(
    data: ResetPasswordConfirm,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.put<SignUpResponse>(
      `/api/users/login/reset-password`,
      data,
    );

    return response.data;
  }
}

export default UserService;
