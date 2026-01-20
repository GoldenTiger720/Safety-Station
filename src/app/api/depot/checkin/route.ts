import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// GET - Fetch all check-in records
export async function GET() {
  try {
    const records = await prisma.staff_checkinrecord.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    // Transform to match the expected API response format
    const transformedRecords = records.map((record) => ({
      id: Number(record.id),
      company: record.company,
      name: record.name,
      reason: record.reason,
      check_in_time: record.check_in_time?.toISOString() || null,
      check_out_time: record.check_out_time?.toISOString() || null,
      status: record.status as "checked-in" | "checked-out",
      created_at: record.created_at.toISOString(),
      updated_at: record.updated_at.toISOString(),
    }));

    return NextResponse.json({
      success: true,
      count: transformedRecords.length,
      records: transformedRecords,
    });
  } catch (error) {
    console.error("Error fetching check-in records:", error);
    return NextResponse.json(
      {
        success: false,
        count: 0,
        records: [],
      },
      { status: 500 }
    );
  }
}

// POST - Create a new check-in record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, reason } = body;

    if (!name || !company || !reason) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, company, and reason are required",
        },
        { status: 400 }
      );
    }

    const now = new Date();
    const record = await prisma.staff_checkinrecord.create({
      data: {
        name,
        company,
        reason,
        check_in_time: now,
        status: "checked-in",
        created_at: now,
        updated_at: now,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Check-in successful",
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
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create check-in",
      },
      { status: 500 }
    );
  }
}
