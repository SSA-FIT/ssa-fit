import { axiosInstance } from '../apis/axios';

import { SignUpData, SignUpResponse } from '../types/commonTypes';

class UserService {
  public static async getUserInfo(data: SignUpData): Promise<SignUpResponse> {
    const response = await axiosInstance.post<SignUpResponse>(
      `/api/auth/users/sign-up`,
      data,
    );

    return response.data;
  }
}

export default UserService;
