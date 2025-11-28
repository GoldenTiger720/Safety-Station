// Check-in types
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

// YouTube video types
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
