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

  // 参加区分にかかわらず、お名前とふりがなだけを必須にする。
  // ふりがなは会員の照合キーであり、新規登録時の並び順にも使うため。
  if (!String(input.furigana ?? "").trim()) {
    return "ふりがなを入力してください";
  }

  return null;
}
