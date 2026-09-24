export type ApplicationInput = {
  name: unknown;
  furigana: unknown;
  member_no: unknown;
  event_id: unknown;
  is_new: unknown;
};

export function normalizeParticipantName(value: unknown): string {
  return String(value ?? "")
    // NFKC で半角カタカナ・全角英数・分解された濁点を吸収する。
    // これが無いと「ｺﾊﾞﾔｼ」や、見た目は同じでも濁点が分解された入力が弾かれる。
    .normalize("NFKC")
    .trim()
    .replace(/[ 　]+/g, "");
}

/**
 * ふりがなの照合用に正規化する。
 * 空白を落とし、カタカナで書かれた場合もひらがなに寄せる（会員データは全件ひらがな）。
 */
export function normalizeFurigana(value: unknown): string {
  return normalizeParticipantName(value).replace(/[ァ-ヶ]/g, (character) =>
    String.fromCharCode(character.charCodeAt(0) - 0x60),
  );
}

export function validateApplicationInput(
  input: ApplicationInput,
): string | null {
  if (!normalizeParticipantName(input.name)) {
    return "お名前を入力してください";
  }

  if (!Number.isInteger(Number(input.event_id)) || Number(input.event_id) <= 0) {
    return "イベントを確認してください";
  }

  // ふりがなは会員照合と新規登録時の並び順に使う。
  if (!String(input.furigana ?? "").trim()) {
    return "ふりがなを入力してください";
  }

  if (typeof input.is_new !== "boolean") {
    return "参加経験を選択してください";
  }

  return null;
}

export type ApplicationMember = {
  id: number | string;
  member_no: number | string;
  name: string;
  furigana: string | null;
};

export function resolveApplicationMember<T extends ApplicationMember>(
  members: T[],
  input: { name: string; furigana: string; memberNo: string; isNew: boolean },
): { kind: "matched"; member: T } | { kind: "new" } | { kind: "review" } {
  const nameKey = normalizeParticipantName(input.name);
  const furiganaKey = normalizeFurigana(input.furigana);
  const memberNo = input.memberNo.trim();

  if (memberNo) {
    const normalizeNo = (value: string) =>
      /^\d+$/.test(value) ? value.replace(/^0+(?=\d)/, "") : value;
    const numbered = members.find(
      (member) => normalizeNo(String(member.member_no).trim()) === normalizeNo(memberNo),
    );
    return numbered && normalizeParticipantName(numbered.name) === nameKey
      ? { kind: "matched", member: numbered }
      : { kind: "review" };
  }

  const sameName = members.filter(
    (member) => normalizeParticipantName(member.name) === nameKey,
  );

  // 同姓同名や既存の重複は、ふりがなが一致しても自動で同一人物と断定しない。
  if (sameName.length > 1) return { kind: "review" };
  if (sameName.length === 1) {
    return normalizeFurigana(sameName[0].furigana) === furiganaKey
      ? { kind: "matched", member: sameName[0] }
      : { kind: "review" };
  }

  // 会員を新規作成するのは、本人が初参加を選んだ場合だけ。
  return input.isNew ? { kind: "new" } : { kind: "review" };
}
