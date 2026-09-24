import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import {
  type ApplicationMember,
  resolveApplicationMember,
  validateApplicationInput,
} from "@/lib/application";
import { getRegistrationState } from "@/lib/event-policy";
import { getOpenRealEvent } from "@/lib/real-events";

const noStoreHeaders = { "Cache-Control": "no-store" };

export async function GET() {
  try {
    const event = await getOpenRealEvent();
    return NextResponse.json({ event }, { headers: noStoreHeaders });
  } catch (error) {
    console.error("Next event fetch error:", error);
    return NextResponse.json(
      { error: "イベント情報の取得に失敗しました" },
      { status: 500, headers: noStoreHeaders },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const isNew = body.is_new;
    const validationError = validateApplicationInput({
      name: body.name,
      furigana: body.furigana,
      member_no: body.member_no,
      event_id: body.event_id,
      is_new: isNew,
    });

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400, headers: noStoreHeaders },
      );
    }

    const eventId = Number(body.event_id);
    const eventResult = await db.execute({
      sql: "SELECT id, event_date FROM events WHERE id = ?",
      args: [eventId],
    });
    const targetEvent = eventResult.rows[0];

    if (
      !targetEvent ||
      getRegistrationState(String(targetEvent.event_date)) !== "open"
    ) {
      return NextResponse.json(
        { error: "この回の受付は終了しています" },
        { status: 409, headers: noStoreHeaders },
      );
    }

    const allMembers = await db.execute(
      "SELECT id, member_no, name, furigana FROM members",
    );
    const resolution = resolveApplicationMember(
      allMembers.rows as unknown as ApplicationMember[],
      {
        name: String(body.name),
        furigana: String(body.furigana),
        memberNo: String(body.member_no ?? ""),
        isNew: isNew === true,
      },
    );

    if (resolution.kind === "review") {
      return NextResponse.json(
        {
          error: "会員情報を確認できませんでした。ふりがな・会員番号をご確認ください。分からない場合は公式LINEでご相談ください。",
        },
        { status: 409, headers: noStoreHeaders },
      );
    }

    let memberId: number;
    let assignedNo: string;
    let isNewMember = false;

    if (resolution.kind === "matched") {
      memberId = Number(resolution.member.id);
      assignedNo = String(resolution.member.member_no);
    } else {
      // 初参加が明示され、同姓同名の既存会員もいない場合だけ新規作成する。
      const maxNo = await db.execute(
        "SELECT MAX(CAST(member_no AS INTEGER)) AS max_no FROM members",
      );
      const nextNo = (Number(maxNo.rows[0]?.max_no ?? 0) + 1)
        .toString()
        .padStart(3, "0");
      const insertResult = await db.execute({
        sql: "INSERT INTO members (member_no, name, furigana, joined_event_id) VALUES (?, ?, ?, ?)",
        args: [
          nextNo,
          String(body.name).trim(),
          String(body.furigana).trim(),
          eventId,
        ],
      });
      memberId = Number(insertResult.lastInsertRowid);
      assignedNo = nextNo;
      isNewMember = true;
    }

    const alreadyRegistered = await db.execute({
      sql: "SELECT id FROM attendances WHERE member_id = ? AND event_id = ?",
      args: [memberId, eventId],
    });

    if (alreadyRegistered.rows.length > 0) {
      return NextResponse.json(
        { success: true, already_registered: true, member_no: assignedNo },
        { headers: noStoreHeaders },
      );
    }

    await db.execute({
      sql: "INSERT INTO attendances (member_id, event_id, status) VALUES (?, ?, ?)",
      args: [
        memberId,
        eventId,
        body.afterparty === true
          ? "registered_with_party"
          : "registered",
      ],
    });

    return NextResponse.json(
      {
        success: true,
        is_new: isNewMember,
        member_no: assignedNo,
      },
      { headers: noStoreHeaders },
    );
  } catch (error) {
    console.error("Apply error:", error);
    return NextResponse.json(
      { error: "申込処理に失敗しました" },
      { status: 500, headers: noStoreHeaders },
    );
  }
}
