import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Get next event info
export async function GET() {
  try {
    const result = await db.execute(`
      SELECT * FROM events
      WHERE event_date >= date('now')
      ORDER BY event_date ASC
      LIMIT 1
    `);

    if (result.rows.length === 0) {
      return NextResponse.json({ event: null });
    }

    return NextResponse.json({ event: result.rows[0] });
  } catch (error) {
    console.error("Next event fetch error:", error);
    return NextResponse.json(
      { error: "イベント情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}

// Submit application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { member_no, name, event_id, is_new, afterparty } = body;

    if (!name || !event_id) {
      return NextResponse.json(
        { error: "お名前とイベントは必須です" },
        { status: 400 }
      );
    }

    let memberId: number;
    let assignedNo: string;

    if (is_new || !member_no) {
      // New member: assign next number
      const maxNo = await db.execute(
        "SELECT MAX(CAST(member_no AS INTEGER)) as max_no FROM members"
      );
      const nextNo = (Number(maxNo.rows[0].max_no) + 1)
        .toString()
        .padStart(3, "0");

      const insertResult = await db.execute({
        sql: "INSERT INTO members (member_no, name, joined_event_id) VALUES (?, ?, ?)",
        args: [nextNo, name, event_id],
      });
      memberId = Number(insertResult.lastInsertRowid);
      assignedNo = nextNo;
    } else {
      // Existing member
      const existing = await db.execute({
        sql: "SELECT id, member_no FROM members WHERE member_no = ?",
        args: [member_no],
      });
      if (existing.rows.length === 0) {
        return NextResponse.json(
          { error: "会員番号が見つかりません" },
          { status: 404 }
        );
      }
      memberId = Number(existing.rows[0].id);
      assignedNo = String(existing.rows[0].member_no);
    }

    // Check if already registered
    const alreadyRegistered = await db.execute({
      sql: "SELECT id FROM attendances WHERE member_id = ? AND event_id = ?",
      args: [memberId, event_id],
    });

    if (alreadyRegistered.rows.length > 0) {
      return NextResponse.json({
        success: true,
        member_no: assignedNo,
        already_registered: true,
        message: "すでにお申し込み済みです",
      });
    }

    // Register (not yet attended - stamp given after actual attendance)
    await db.execute({
      sql: "INSERT INTO attendances (member_id, event_id, status) VALUES (?, ?, ?)",
      args: [memberId, event_id, afterparty ? "registered_with_party" : "registered"],
    });

    return NextResponse.json({
      success: true,
      member_no: assignedNo,
      is_new: is_new || !member_no,
      message: is_new
        ? `会員No.${assignedNo}で登録しました！`
        : "お申し込みを受け付けました！",
    });
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json(
      { error: "申込処理に失敗しました" },
      { status: 500 }
    );
  }
}
