import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const videos = await prisma.rhomberg_videos.findMany({
      where: {
        is_active: true,
      },
      orderBy: {
        published_at: "desc",
      },
    });

    // Transform to match the expected API response format
    const transformedVideos = videos.map((video) => ({
      id: Number(video.id),
      video_id: video.video_id,
      title: video.title,
      description: video.description,
      thumbnail_url: video.thumbnail_url,
      video_url: video.video_url,
      duration: video.duration,
      published_at: video.published_at.toISOString(),
      view_count: video.view_count,
      like_count: video.like_count,
      channel_title: video.channel_title,
      fetched_at: video.fetched_at.toISOString(),
      updated_at: video.updated_at.toISOString(),
      is_active: video.is_active,
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
