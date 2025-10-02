import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api-config';

export interface CheckInRecord {
  id: number;
  company: string;
  name: string;
  reason: string;
  check_in_time: string;
  check_out_time: string | null;
  status: "checked-in" | "checked-out";
  created_at: string;
  updated_at: string;
}

export interface CheckInListResponse {
  success: boolean;
  count: number;
  records: CheckInRecord[];
}

export interface CheckInRequest {
  name: string;
  company: string;
  reason: string;
}

export interface CheckInResponse {
  success: boolean;
  message: string;
  record: CheckInRecord;
}

export interface CheckOutRequest {
  id: number;
}

export interface CheckOutResponse {
  success: boolean;
  message: string;
  record: CheckInRecord;
}

// API function to fetch check-in records
export const fetchCheckInRecords = async (): Promise<CheckInListResponse> => {
  return apiRequest<CheckInListResponse>('/api/depot/checkin/');
};

// API function to create a check-in
export const createCheckIn = async (data: CheckInRequest): Promise<CheckInResponse> => {
  return apiRequest<CheckInResponse>('/api/depot/checkin/', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// API function to check out a user
export const checkOutUser = async (id: number): Promise<CheckOutResponse> => {
  return apiRequest<CheckOutResponse>(`/api/depot/checkin/${id}/checkout/`, {
    method: 'POST',
  });
};

// API function to re-check in a user (update existing record)
export const reCheckInUser = async (id: number): Promise<CheckInResponse> => {
  return apiRequest<CheckInResponse>(`/api/depot/checkin/${id}/checkin/`, {
    method: 'POST',
  });
};

// React Query hook for fetching check-in records
export const useCheckInRecords = () => {
  return useQuery({
    queryKey: ['checkin-records'],
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
      queryClient.invalidateQueries({ queryKey: ['checkin-records'] });
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
      queryClient.invalidateQueries({ queryKey: ['checkin-records'] });
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
      queryClient.invalidateQueries({ queryKey: ['checkin-records'] });
    },
  });
};
