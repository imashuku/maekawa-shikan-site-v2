import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeFurigana,
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

test("継続参加は会員番号かふりがなのどちらかを必須にする", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: "",
      member_no: "",
      event_id: 10,
      is_new: false,
    }),
    "ふりがなを入力してください",
  );
});

test("継続参加はふりがなだけでも申し込める（会員番号は任意）", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: "やまだ たろう",
      member_no: "",
      event_id: 10,
      is_new: false,
    }),
    null,
  );
});

test("ふりがな比較ではカタカナをひらがなに寄せ、空白を除去する", () => {
  assert.equal(normalizeFurigana("ヤマダ　タロウ"), "やまだたろう");
  assert.equal(normalizeFurigana(" やまだ たろう "), "やまだたろう");
  assert.equal(normalizeFurigana("ヤマダタロウ"), normalizeFurigana("やまだ たろう"));
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
