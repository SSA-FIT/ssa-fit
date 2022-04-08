import axios from 'axios';

const createYoutubeInstance = () => {
  const youtube = axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
  });

  return youtube;
};

export const youtubeInstance = createYoutubeInstance();
