import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import {
  normalizeFurigana,
  normalizeParticipantName,
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
    const isNew = body.is_new === true;
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

    // 参加区分にかかわらず、同じ手順で会員を特定する。
    // 一致しなければ弾かずに新しい会員として受け付け、重複は運営があとで統合する。
    // （常連の方を「該当なし」で門前払いする損失のほうが大きい、という運用判断）
    const nameKey = normalizeParticipantName(body.name);
    const furiganaKey = normalizeFurigana(body.furigana);
    const memberNo = String(body.member_no ?? "").trim();
    const allMembers = await db.execute(
      "SELECT id, member_no, name, furigana FROM members",
    );

    // ① 会員番号の申告があり、お名前も一致するならそれを使う
    let matched = memberNo
      ? allMembers.rows.find(
          (row) =>
            String(row.member_no).trim() === memberNo &&
            normalizeParticipantName(row.name) === nameKey,
        )
      : undefined;

    // ② 番号が無い・合わない場合は、お名前＋ふりがなで探す。
    //    既に重複レコードがある人もいるため、複数見つかってもいちばん若い番号に寄せる
    if (!matched) {
      matched = allMembers.rows
        .filter(
          (row) =>
            normalizeParticipantName(row.name) === nameKey &&
            normalizeFurigana(row.furigana) === furiganaKey,
        )
        .sort((a, b) => Number(a.member_no) - Number(b.member_no))[0];
    }

    let memberId: number;
    let assignedNo: string;
    let isNewMember = false;

    if (matched) {
      memberId = Number(matched.id);
      assignedNo = String(matched.member_no);
    } else {
      // ③ 見つからなければ新しい会員として登録する（申込は必ず受け付ける）
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
