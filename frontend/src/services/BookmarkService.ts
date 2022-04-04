import { SignUpResponse } from '../types/commonTypes';
import { axiosInstance } from '../apis/axios';

class BookmarkService {
  public static async updateBookmark(
    exerciseId: number,
    token: string,
  ): Promise<SignUpResponse> {
    const response = await axiosInstance.get<SignUpResponse>(
      `/api/users/bookmark`,
      {
        params: exerciseId,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  }
}

export default BookmarkService;
