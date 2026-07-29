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

  if (!String(input.member_no ?? "").trim()) {
    return "会員番号を入力してください";
  }

  return null;
}
