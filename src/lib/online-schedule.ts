const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const WEEKDAY_JA = ["日", "月", "火", "水", "木", "金", "土"] as const;

export type OnlineSession = {
  /** 開催日（JST）。表示用の文字列はこの値から生成するので、日付の正本はここだけ */
  isoDate: string;
  title: string;
  subtitle: string;
};

/** オンライン歴史ラウンジ「近江にみちびかれて」全10回（毎月第2木曜 19:00–21:00） */
export const onlineSessions: readonly OnlineSession[] = [
  {
    isoDate: "2026-06-11",
    title: "近江は、私たちのどこにいたのだろう",
    subtitle: "日本史の地図を、近江から広げてみる",
  },
  {
    isoDate: "2026-07-09",
    title: "一万年前の、しあわせのかたち",
    subtitle: "東近江の縄文と土偶が語るもの",
  },
  {
    isoDate: "2026-08-13",
    title: "もしかして、ここが「あの国」？",
    subtitle: "邪馬台国近江説というロマン",
  },
  {
    isoDate: "2026-09-10",
    title: "兄と弟が、国を二つに分けた日",
    subtitle: "ふたつの正義がぶつかった、古代の決断",
  },
  {
    isoDate: "2026-10-08",
    title: "負けた者は、どこへ消えたのか",
    subtitle: "近江に残る源平の伝承と、生きのびる人々の物語",
  },
  {
    isoDate: "2026-11-12",
    title: "同じ血が、争うとき",
    subtitle: "近江を動かした一族たちの素顔",
  },
  {
    isoDate: "2026-12-10",
    title: "刀を置いて、そろばんを持った人たち",
    subtitle: "敗者はなぜ商人になったのか─三井家誕生の物語",
  },
  {
    isoDate: "2027-01-14",
    title: "「悪人」と呼ばれた人の、本当の顔",
    subtitle: "教科書が教えなかった、一期一会のある決断",
  },
  {
    isoDate: "2027-02-11",
    title: "あの会社も、近江から始まった",
    subtitle: "近江商人の挑戦と葛藤",
  },
  {
    isoDate: "2027-03-11",
    title: "あなたの「現在地」が、見えてくる",
    subtitle: "近江から、もっと深い物語の入口へ",
  },
];

function startOfDayJst(isoDate: string): number {
  const time = new Date(`${isoDate}T00:00:00+09:00`).getTime();
  if (Number.isNaN(time)) {
    throw new Error(`開催日の書式が不正です（YYYY-MM-DD）: ${isoDate}`);
  }
  return time;
}

/** "2026-08-13" → "2026/08/13（木）"（曜日はJSTで算出するのでサーバのTZに依存しない） */
export function formatSessionDate(isoDate: string): string {
  const jstMidnight = new Date(startOfDayJst(isoDate) + JST_OFFSET_MS);
  return `${isoDate.replace(/-/g, "/")}（${WEEKDAY_JA[jstMidnight.getUTCDay()]}）`;
}

/** 次の回へ切り替わる時刻＝開催日の翌日 0:00（JST）。当日いっぱいはその回を出し続ける */
export function getSwitchoverTime(isoDate: string): number {
  return startOfDayJst(isoDate) + DAY_MS;
}

export type UpcomingOnlineSession = OnlineSession & { number: number };

/**
 * いま告知すべき回を返す。開催当日は当該回、翌日0:00（JST）以降は次の回。
 * 全10回が終わったあとは null。
 */
export function getNextOnlineSession(
  now = new Date(),
): UpcomingOnlineSession | null {
  const index = onlineSessions.findIndex(
    (session) => now.getTime() < getSwitchoverTime(session.isoDate),
  );
  if (index === -1) return null;
  return { ...onlineSessions[index], number: index + 1 };
}
