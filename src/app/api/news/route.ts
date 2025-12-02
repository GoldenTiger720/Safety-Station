import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active news items
export async function GET() {
  try {
    const newsItems = await prisma.news.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });

    const transformedNews = newsItems.map((item) => ({
      id: Number(item.id),
      title: item.title,
      description: item.description,
      image_data: item.imageData,
      avatar_data: item.avatarData,
      news_link: item.newsLink,
      poster_name: item.posterName,
      poster_title: item.posterTitle,
      is_active: item.isActive,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      message: "News fetched successfully",
      news: transformedNews,
      total_news: transformedNews.length,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch news",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
