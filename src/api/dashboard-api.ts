import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api-config';

export interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
      default?: {
        url: string;
      };
    };
    publishedAt: string;
  };
}

export interface YouTubeListResponse {
  items: YouTubeVideo[];
}

// API function to fetch YouTube videos
export const fetchYouTubeVideos = async (): Promise<YouTubeListResponse> => {
  return apiRequest<YouTubeListResponse>('/api/youtube/list/');
};

// React Query hook for YouTube videos
export const useYouTubeVideos = () => {
  return useQuery({
    queryKey: ['youtube-videos'],
    queryFn: fetchYouTubeVideos,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
  });
};