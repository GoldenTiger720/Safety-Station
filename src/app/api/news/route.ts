import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active news items
export async function GET() {
  try {
    const newsItems = await prisma.news.findMany({
      where: { is_active: true },
      orderBy: { created_at: "desc" },
    });

    const transformedNews = newsItems.map((item) => ({
      id: Number(item.id),
      title: item.title,
      description: item.description,
      image_data: item.image_data,
      avatar_data: item.avatar_data,
      news_link: item.news_link,
      poster_name: item.poster_name,
      poster_title: item.poster_title,
      is_active: item.is_active,
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
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
