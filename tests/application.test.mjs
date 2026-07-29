import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeParticipantName,
  validateApplicationInput,
} from "../src/lib/application.ts";

test("氏名比較では半角・全角スペースを除去する", () => {
  assert.equal(normalizeParticipantName(" 前川　真司 "), "前川真司");
});

test("初参加は氏名とふりがなを必須にする", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: "",
      member_no: null,
      event_id: 10,
      is_new: true,
    }),
    "ふりがなを入力してください",
  );
});

test("継続参加は会員番号を必須にする", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: null,
      member_no: "",
      event_id: 10,
      is_new: false,
    }),
    "会員番号を入力してください",
  );
});

test("必要項目がそろえばnullを返す", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: null,
      member_no: "012",
      event_id: 10,
      is_new: false,
    }),
    null,
  );
});
