export type ApplicationInput = {
  name: unknown;
  furigana: unknown;
  member_no: unknown;
  event_id: unknown;
  is_new: unknown;
};

export function normalizeParticipantName(value: unknown): string {
  return String(value ?? "")
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

  if (input.is_new === true) {
    if (!String(input.furigana ?? "").trim()) {
      return "ふりがなを入力してください";
    }
    return null;
  }

  // 既存会員は「ふりがな」で照合する。会員番号は覚えている方のための任意入力。
  if (
    !String(input.furigana ?? "").trim() &&
    !String(input.member_no ?? "").trim()
  ) {
    return "ふりがなを入力してください";
  }

  return null;
}
