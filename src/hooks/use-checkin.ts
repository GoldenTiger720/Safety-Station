"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  CheckInListResponse,
  CheckInRequest,
  CheckInResponse,
  CheckOutResponse,
} from "@/types";

// API function to fetch check-in records
export const fetchCheckInRecords = async (): Promise<CheckInListResponse> => {
  const response = await fetch("/api/depot/checkin");
  if (!response.ok) {
    throw new Error("Failed to fetch check-in records");
  }
  return response.json();
};

// API function to create a check-in
export const createCheckIn = async (
  data: CheckInRequest
): Promise<CheckInResponse> => {
  const response = await fetch("/api/depot/checkin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create check-in");
  }
  return response.json();
};

// API function to check out a user
export const checkOutUser = async (id: number): Promise<CheckOutResponse> => {
  const response = await fetch(`/api/depot/checkin/${id}/checkout`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to check out");
  }
  return response.json();
};

// API function to re-check in a user (update existing record)
export const reCheckInUser = async (id: number): Promise<CheckInResponse> => {
  const response = await fetch(`/api/depot/checkin/${id}/checkin`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to re-check in");
  }
  return response.json();
};

// React Query hook for fetching check-in records
export const useCheckInRecords = () => {
  return useQuery({
    queryKey: ["checkin-records"],
    queryFn: fetchCheckInRecords,
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes
    gcTime: 5 * 60 * 1000, // Keep in cache for 5 minutes
    refetchOnWindowFocus: false,
  });
};

// React Query hook for creating a check-in
export const useCreateCheckIn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCheckIn,
    onSuccess: () => {
      // Invalidate and refetch check-in records after successful check-in
      queryClient.invalidateQueries({ queryKey: ["checkin-records"] });
    },
  });
};

// React Query hook for checking out a user
export const useCheckOutUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: checkOutUser,
    onSuccess: () => {
      // Invalidate and refetch check-in records after successful check-out
      queryClient.invalidateQueries({ queryKey: ["checkin-records"] });
    },
  });
};

// React Query hook for re-checking in a user
export const useReCheckInUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: reCheckInUser,
    onSuccess: () => {
      // Invalidate and refetch check-in records after successful re-check-in
      queryClient.invalidateQueries({ queryKey: ["checkin-records"] });
    },
  });
};
