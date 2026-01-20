import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all active depot induction videos for the main website
export async function GET() {
  try {
    const videos = await prisma.depot_induction_videos.findMany({
      where: { is_active: true },
      orderBy: { created_at: "desc" },
    });

    const formattedVideos = videos.map((video) => ({
      id: video.id.toString(),
      title: video.title,
      youtubeUrl: video.youtube_url,
      youtubeId: video.youtube_id,
      createdAt: video.created_at.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      videos: formattedVideos,
      total: formattedVideos.length,
    });
  } catch (error) {
    console.error("Error fetching depot induction videos:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch videos", videos: [] },
      { status: 500 }
    );
  }
}
