import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active operations
export async function GET() {
  try {
    const operations = await prisma.operations.findMany({
      where: { is_active: true },
      orderBy: [{ year: "desc" }, { week_number: "desc" }],
    });

    const transformedOperations = operations.map((item) => ({
      id: Number(item.id),
      week_number: item.week_number,
      year: item.year,
      title: item.title,
      description: item.description,
      pdf_data: item.pdf_data,
      pdf_filename: item.pdf_filename,
      schedule_type: item.schedule_type,
      team_type: item.team_type,
      is_active: item.is_active,
      created_at: item.created_at.toISOString(),
      updated_at: item.updated_at.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      message: "Operations fetched successfully",
      operations: transformedOperations,
      total_operations: transformedOperations.length,
    });
  } catch (error) {
    console.error("Error fetching operations:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch operations",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
