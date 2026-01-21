import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active realtime schedule links
export async function GET() {
  try {
    const links = await prisma.realtime_schedule_links.findMany({
      where: { is_active: true },
      orderBy: { team_type: "asc" },
    });

    const transformedLinks = links.map((item) => ({
      id: Number(item.id),
      teamType: item.team_type,
      title: item.title,
      linkUrl: item.link_url,
      description: item.description,
      isActive: item.is_active,
      createdAt: item.created_at.toISOString(),
      updatedAt: item.updated_at.toISOString(),
    }));

    // Get links by team type
    const operationsLink = transformedLinks.find((l) => l.teamType === "operations");
    const maintenanceLink = transformedLinks.find((l) => l.teamType === "maintenance");

    return NextResponse.json({
      success: true,
      message: "Realtime schedule links fetched successfully",
      links: transformedLinks,
      operationsLink: operationsLink || null,
      maintenanceLink: maintenanceLink || null,
    });
  } catch (error) {
    console.error("Error fetching realtime schedule links:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch realtime schedule links",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
