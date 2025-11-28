import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Re-check in a user (update existing record)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = BigInt(params.id);
    const now = new Date();

    const record = await prisma.checkInRecord.update({
      where: { id },
      data: {
        checkInTime: now,
        checkOutTime: null,
        status: "checked-in",
        updatedAt: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Re-check-in successful",
      record: {
        id: Number(record.id),
        company: record.company,
        name: record.name,
        reason: record.reason,
        check_in_time: record.checkInTime?.toISOString() || null,
        check_out_time: record.checkOutTime?.toISOString() || null,
        status: record.status,
        created_at: record.createdAt.toISOString(),
        updated_at: record.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error re-checking in:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to re-check in",
      },
      { status: 500 }
    );
  }
}
