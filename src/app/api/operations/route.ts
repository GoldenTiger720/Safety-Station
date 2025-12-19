import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active operations
export async function GET() {
  try {
    const operations = await prisma.operation.findMany({
      where: { isActive: true },
      orderBy: [{ year: "desc" }, { weekNumber: "desc" }],
    });

    const transformedOperations = operations.map((item) => ({
      id: Number(item.id),
      week_number: item.weekNumber,
      year: item.year,
      title: item.title,
      description: item.description,
      excel_data: item.excelData,
      excel_filename: item.excelFilename,
      schedule_type: item.scheduleType,
      is_active: item.isActive,
      created_at: item.createdAt.toISOString(),
      updated_at: item.updatedAt.toISOString(),
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
