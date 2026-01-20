import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active safety alerts
export async function GET() {
  try {
    const safetyAlerts = await prisma.safety_alerts.findMany({
      where: { is_active: true },
      orderBy: [{ year: "desc" }, { week_number: "desc" }],
    });

    // Get unique categories
    const categories = Array.from(new Set(safetyAlerts.map((alert) => alert.category)));

    const transformedAlerts = safetyAlerts.map((item) => ({
      id: Number(item.id),
      week_number: item.week_number,
      year: item.year,
      category: item.category,
      title: item.title,
      content: item.content,
      thumbnail_data: item.thumbnail_data,
      pdf_data: item.pdf_data,
      pdf_filename: item.pdf_filename,
      pdf_files: item.pdf_files,
      is_active: item.is_active,
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
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
