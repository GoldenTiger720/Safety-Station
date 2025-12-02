"use client";

import { useQuery } from "@tanstack/react-query";
import type { NewsListResponse } from "@/types";

// API function to fetch news items
export const fetchNews = async (): Promise<NewsListResponse> => {
  const response = await fetch("/api/news");
  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }
  return response.json();
};

// React Query hook for news
export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: fetchNews,
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep in cache for 10 minutes
    refetchOnWindowFocus: false,
  });
};
