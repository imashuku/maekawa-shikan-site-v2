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

    let memberId: number;
    let assignedNo: string;
    // 「初めて」を選んだが既存会員だった場合、完了画面で新規番号の案内を出さない
    let isExistingMemberLinked = false;

    if (isNew) {
      // 「初めて」を選んだ既存会員を、そのまま新規登録して重複させない。
      // 実際に同姓同名・同ふりがなの会員レコードが二重にできた（026/030）。
      const nameKey = normalizeParticipantName(body.name);
      const furiganaKey = normalizeFurigana(body.furigana);
      const existingRows = await db.execute(
        "SELECT id, member_no, name, furigana FROM members",
      );
      // 既に重複レコードがある人もいるため、複数見つかっても最初の1件に寄せる。
      // ここで新規作成すると重複がさらに増える。
      const alreadyMember = existingRows.rows
        .filter(
          (row) =>
            normalizeParticipantName(row.name) === nameKey &&
            normalizeFurigana(row.furigana) === furiganaKey,
        )
        .sort(
          (a, b) => Number(a.member_no) - Number(b.member_no),
        );

      if (alreadyMember.length > 0) {
        memberId = Number(alreadyMember[0].id);
        assignedNo = String(alreadyMember[0].member_no);
        isExistingMemberLinked = true;
      } else {
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
      }
    } else {
      const memberNo = String(body.member_no ?? "").trim();

      if (memberNo) {
        // 会員番号を覚えている方: 番号とお名前の一致で確認する
        const existing = await db.execute({
          sql: "SELECT id, member_no, name FROM members WHERE member_no = ?",
          args: [memberNo],
        });
        const member = existing.rows[0];

        if (
          !member ||
          normalizeParticipantName(member.name) !==
            normalizeParticipantName(body.name)
        ) {
          return NextResponse.json(
            { error: "会員番号とお名前を確認してください" },
            { status: 400, headers: noStoreHeaders },
          );
        }

        memberId = Number(member.id);
        assignedNo = String(member.member_no);
      } else {
        // 会員番号が分からない方: お名前＋ふりがなで照合する
        const nameKey = normalizeParticipantName(body.name);
        const furiganaKey = normalizeFurigana(body.furigana);
        const all = await db.execute(
          "SELECT id, member_no, name, furigana FROM members",
        );
        const matched = all.rows.filter(
          (row) =>
            normalizeParticipantName(row.name) === nameKey &&
            normalizeFurigana(row.furigana) === furiganaKey,
        );

        if (matched.length === 0) {
          return NextResponse.json(
            {
              error:
                "お名前とふりがなで会員登録が見つかりませんでした。表記をご確認ください。初めてご参加の場合は「初めて参加する」をお選びください。",
            },
            { status: 400, headers: noStoreHeaders },
          );
        }

        if (matched.length > 1) {
          return NextResponse.json(
            {
              error:
                "同じお名前の登録が複数あります。お手数ですが会員番号をご入力ください。",
            },
            { status: 409, headers: noStoreHeaders },
          );
        }

        memberId = Number(matched[0].id);
        assignedNo = String(matched[0].member_no);
      }
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
        is_new: isNew && !isExistingMemberLinked,
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
