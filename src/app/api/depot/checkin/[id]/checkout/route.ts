import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// POST - Check out a user
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = BigInt(params.id);
    const now = new Date();

    const record = await prisma.staff_checkinrecord.update({
      where: { id },
      data: {
        check_out_time: now,
        status: "checked-out",
        updated_at: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Check-out successful",
      record: {
        id: Number(record.id),
        company: record.company,
        name: record.name,
        reason: record.reason,
        check_in_time: record.check_in_time?.toISOString() || null,
        check_out_time: record.check_out_time?.toISOString() || null,
        status: record.status,
        created_at: record.created_at.toISOString(),
        updated_at: record.updated_at.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error checking out:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to check out",
      },
      { status: 500 }
    );
  }
}
