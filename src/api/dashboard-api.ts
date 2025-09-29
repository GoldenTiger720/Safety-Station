import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api-config';

export interface YouTubeVideo {
  id: number;
  video_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: string;
  published_at: string;
  view_count: number;
  like_count: number;
  channel_title: string;
  fetched_at: string;
  updated_at: string;
  is_active: boolean;
}

export interface YouTubeListResponse {
  success: boolean;
  message: string;
  videos: YouTubeVideo[];
  from_cache: boolean;
  fetched_today: boolean;
  total_videos: number;
  videos_updated?: number;
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