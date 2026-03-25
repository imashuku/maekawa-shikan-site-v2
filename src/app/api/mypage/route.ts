import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Get member detail + attendance history by member_no
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const memberNo = searchParams.get("no");

    if (!memberNo) {
      return NextResponse.json(
        { error: "会員番号が必要です" },
        { status: 400 }
      );
    }

    // Member info
    const memberResult = await db.execute({
      sql: `SELECT m.*, e.name as joined_event_name
            FROM members m
            LEFT JOIN events e ON m.joined_event_id = e.id
            WHERE m.member_no = ?`,
      args: [memberNo],
    });

    if (memberResult.rows.length === 0) {
      return NextResponse.json(
        { error: "会員が見つかりません" },
        { status: 404 }
      );
    }

    const member = memberResult.rows[0];

    // Attendance history
    const attendances = await db.execute({
      sql: `SELECT e.id, e.name, e.event_date, e.venue
            FROM attendances a
            JOIN events e ON a.event_id = e.id
            WHERE a.member_id = ?
            ORDER BY e.event_date`,
      args: [member.id],
    });

    // Total events count
    const totalEvents = await db.execute(
      "SELECT COUNT(*) as count FROM events"
    );

    return NextResponse.json({
      member,
      attendances: attendances.rows,
      totalEvents: Number(totalEvents.rows[0].count),
    });
  } catch (error) {
    console.error("Mypage fetch error:", error);
    return NextResponse.json(
      { error: "データの取得に失敗しました" },
      { status: 500 }
    );
  }
}
