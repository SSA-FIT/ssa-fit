import { youtubeInstance } from '../apis/youtube';
import { YoutubeVideo } from '../types/recommendationTypes';

class YoutubeAPI {
  public static async getYoutubeVideo(searchName: string, exerciseId: number) {
    const response = await youtubeInstance.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        type: 'video',
        q: `${searchName} 운동 영상`,
      },
    });

    const youtubeList: YoutubeVideo[] = [];

    response.data.items.forEach((item: any) => {
      youtubeList.push({
        id: exerciseId,
        searchName,
        videoId: item.id.videoId,
        thumbnails: item.snippet.thumbnails.high.url,
        title: item.snippet.title,
      });
    });
    return youtubeList;
  }
}
export default YoutubeAPI;
