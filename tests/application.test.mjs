import assert from "node:assert/strict";
import test from "node:test";
import {
  normalizeFurigana,
  normalizeParticipantName,
  resolveApplicationMember,
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

test("会員番号を入れてもふりがなは必須", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田 太郎",
      furigana: "",
      member_no: "012",
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
      furigana: "やまだ たろう",
      member_no: "012",
      event_id: 10,
      is_new: false,
    }),
    null,
  );
});

test("半角カタカナのふりがなを、ひらがな登録と同一視する", () => {
  assert.equal(normalizeFurigana("ｺﾊﾞﾔｼｴﾂｺ"), normalizeFurigana("こばやしえつこ"));
});

test("濁点が分解された入力（NFD）を、通常の入力と同一視する", () => {
  assert.equal(
    normalizeFurigana("こばやしえつこ".normalize("NFD")),
    normalizeFurigana("こばやしえつこ"),
  );
  assert.equal(
    normalizeParticipantName("春木".normalize("NFD")),
    normalizeParticipantName("春木"),
  );
});

test("全角英数の会員名を半角と同一視する", () => {
  assert.equal(normalizeParticipantName("ＡＢＣ　太郎"), "ABC太郎");
});

const existing = {
  id: 2,
  member_no: "002",
  name: "今宿 裕昭",
  furigana: "いましゅく ひろあき",
};

test("既存会員のふりがなを誤入力しても新規会員を作らない", () => {
  const result = resolveApplicationMember([existing], {
    name: "今宿裕昭",
    furigana: "いましゅくひろき",
    memberNo: "",
    isNew: false,
  });
  assert.equal(result.kind, "review");
});

test("会員番号と氏名が一致すればふりがなの誤入力でも既存会員に結び付ける", () => {
  const result = resolveApplicationMember([existing], {
    name: "今宿裕昭",
    furigana: "いましゅくひろき",
    memberNo: "2",
    isNew: false,
  });
  assert.deepEqual(result, { kind: "matched", member: existing });
});

test("初参加を明示した場合だけ、未登録の氏名で新規会員を作る", () => {
  const input = {
    name: "山田太郎",
    furigana: "やまだたろう",
    memberNo: "",
  };
  assert.equal(resolveApplicationMember([existing], { ...input, isNew: false }).kind, "review");
  assert.equal(resolveApplicationMember([existing], { ...input, isNew: true }).kind, "new");
});

test("同姓同名の会員が複数いるときは自動照合しない", () => {
  const duplicate = { ...existing, id: 52, member_no: "052", furigana: "いましゅく ひろき" };
  const result = resolveApplicationMember([existing, duplicate], {
    name: "今宿裕昭",
    furigana: "いましゅくひろあき",
    memberNo: "",
    isNew: false,
  });
  assert.equal(result.kind, "review");
});

test("参加経験が未選択なら送信を受け付けない", () => {
  assert.equal(
    validateApplicationInput({
      name: "山田太郎",
      furigana: "やまだたろう",
      member_no: "",
      event_id: 10,
      is_new: null,
    }),
    "参加経験を選択してください",
  );
});
