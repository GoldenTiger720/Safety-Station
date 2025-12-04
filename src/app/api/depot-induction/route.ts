import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all active depot induction videos for the main website
export async function GET() {
  try {
    const videos = await prisma.depotInductionVideo.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    const formattedVideos = videos.map((video) => ({
      id: video.id.toString(),
      title: video.title,
      youtubeUrl: video.youtubeUrl,
      youtubeId: video.youtubeId,
      createdAt: video.createdAt.toISOString(),
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
