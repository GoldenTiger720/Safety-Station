import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const videos = await prisma.rhombergVideo.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
    });

    // Transform to match the expected API response format
    const transformedVideos = videos.map((video) => ({
      id: Number(video.id),
      video_id: video.videoId,
      title: video.title,
      description: video.description,
      thumbnail_url: video.thumbnailUrl,
      video_url: video.videoUrl,
      duration: video.duration,
      published_at: video.publishedAt.toISOString(),
      view_count: video.viewCount,
      like_count: video.likeCount,
      channel_title: video.channelTitle,
      fetched_at: video.fetchedAt.toISOString(),
      updated_at: video.updatedAt.toISOString(),
      is_active: video.isActive,
    }));

    return NextResponse.json({
      success: true,
      message: "Videos fetched successfully",
      videos: transformedVideos,
      from_cache: false,
      fetched_today: true,
      total_videos: transformedVideos.length,
    });
  } catch (error) {
    console.error("Error fetching YouTube videos:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch videos",
        videos: [],
        from_cache: false,
        fetched_today: false,
        total_videos: 0,
      },
      { status: 500 }
    );
  }
}
