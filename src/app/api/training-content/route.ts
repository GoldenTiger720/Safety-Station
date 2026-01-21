import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all active training content
export async function GET() {
  try {
    const contents = await prisma.training_content.findMany({
      where: { is_active: true },
      orderBy: [{ display_order: "asc" }, { created_at: "desc" }],
    });

    const transformedContents = contents.map((item) => ({
      id: Number(item.id),
      contentType: item.content_type,
      title: item.title,
      description: item.description,
      linkUrl: item.link_url,
      pdfData: item.pdf_data,
      pdfFilename: item.pdf_filename,
      displayOrder: item.display_order,
      isActive: item.is_active,
      createdAt: item.created_at.toISOString(),
      updatedAt: item.updated_at.toISOString(),
    }));

    // Group by content type
    const trainingVideos = transformedContents.filter(
      (c) => c.contentType === "training_videos"
    );
    const workInstructions = transformedContents.filter(
      (c) => c.contentType === "work_instructions"
    );
    const documents = transformedContents.filter(
      (c) => c.contentType === "documents"
    );

    return NextResponse.json({
      success: true,
      message: "Training content fetched successfully",
      contents: transformedContents,
      trainingVideos,
      workInstructions,
      documents,
      totalContents: transformedContents.length,
    });
  } catch (error) {
    console.error("Error fetching training content:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch training content",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
