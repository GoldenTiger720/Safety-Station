import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active safety alerts
export async function GET() {
  try {
    const safetyAlerts = await prisma.safetyAlert.findMany({
      where: { isActive: true },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    });

    // Get unique categories
    const categories = Array.from(new Set(safetyAlerts.map((alert) => alert.category)));

    const transformedAlerts = safetyAlerts.map((item) => ({
      id: Number(item.id),
      week_number: item.weekNumber,
      year: item.year,
      category: item.category,
      title: item.title,
      content: item.content,
      thumbnail_data: item.thumbnailData,
      pdf_data: item.pdfData,
      pdf_filename: item.pdfFilename,
      is_active: item.isActive,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      message: "Safety alerts fetched successfully",
      alerts: transformedAlerts,
      categories: categories,
      total_alerts: transformedAlerts.length,
    });
  } catch (error) {
    console.error("Error fetching safety alerts:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch safety alerts",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
