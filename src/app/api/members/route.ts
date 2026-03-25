import { NextResponse } from "next/server";
import db from "@/lib/db";

// Get all members with attendance count
export async function GET() {
  try {
    const result = await db.execute(`
      SELECT
        m.id,
        m.member_no,
        m.name,
        m.furigana,
        m.role,
        m.bio,
        m.favorite_era,
        m.created_at,
        COUNT(a.id) as attend_count,
        e.name as joined_event_name
      FROM members m
      LEFT JOIN attendances a ON m.id = a.member_id AND a.status = 'attended'
      LEFT JOIN events e ON m.joined_event_id = e.id
      GROUP BY m.id
      ORDER BY m.furigana
    `);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Members fetch error:", error);
    return NextResponse.json(
      { error: "会員情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}
