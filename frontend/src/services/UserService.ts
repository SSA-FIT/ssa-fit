import { axiosInstance } from '../apis/axios';

import { EmailCodeRequest, SignUpResponse } from '../types/commonTypes';

class UserService {
  public static async getUserInfo(
    data: EmailCodeRequest,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/auth/users/sign-up/email-verification`,
      {
        params: data,
      },
    );

    return response.data;
  }
}

export default UserService;
