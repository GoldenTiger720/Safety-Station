"use client";

import { useQuery } from "@tanstack/react-query";
import type { YouTubeListResponse } from "@/types";

// API function to fetch YouTube videos
export const fetchYouTubeVideos = async (): Promise<YouTubeListResponse> => {
  const response = await fetch("/api/youtube/list");
  if (!response.ok) {
    throw new Error("Failed to fetch YouTube videos");
  }
  return response.json();
};

// React Query hook for YouTube videos
export const useYouTubeVideos = () => {
  return useQuery({
    queryKey: ["youtube-videos"],
    queryFn: fetchYouTubeVideos,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
  });
};
