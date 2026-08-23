import assert from "node:assert/strict";
import test from "node:test";
import { REAL_EVENT_POLICIES } from "../src/lib/event-policy.ts";
import {
  formatSessionDate,
  getNextOnlineSession,
  getNextRealSession,
  onlineSessions,
  realSessions,
} from "../src/lib/salon-schedule.ts";

test("全10回・すべて木曜日", () => {
  assert.equal(onlineSessions.length, 10);
  for (const session of onlineSessions) {
    assert.match(
      formatSessionDate(session.isoDate),
      /（木）$/,
      `${session.isoDate} が木曜ではない`,
    );
  }
});

test("表示用の日付を isoDate から組み立てる", () => {
  assert.equal(formatSessionDate("2026-08-13"), "2026/08/13（木）");
  assert.equal(formatSessionDate("2026-09-10"), "2026/09/10（木）");
});

test("開催当日は、その回を出し続ける", () => {
  assert.equal(
    getNextOnlineSession(new Date("2026-08-13T09:00:00+09:00"))?.number,
    3,
  );
  assert.equal(
    getNextOnlineSession(new Date("2026-08-13T23:59:59+09:00"))?.number,
    3,
  );
});

test("翌日0:00（JST）に次の回へ切り替わる", () => {
  const next = getNextOnlineSession(new Date("2026-08-14T00:00:00+09:00"));
  assert.equal(next?.number, 4);
  assert.equal(next?.isoDate, "2026-09-10");
  assert.equal(next?.title, "兄と弟が、国を二つに分けた日");
});

test("開催前は第1回", () => {
  assert.equal(
    getNextOnlineSession(new Date("2026-05-01T00:00:00+09:00"))?.number,
    1,
  );
});

test("全10回が終わったら null", () => {
  assert.equal(
    getNextOnlineSession(new Date("2027-03-11T23:59:59+09:00"))?.number,
    10,
  );
  assert.equal(getNextOnlineSession(new Date("2027-03-12T00:00:00+09:00")), null);
});

test("UTCのサーバで動かしても判定がずれない", () => {
  // 2026-08-13T15:00Z = 2026-08-14T00:00 JST
  assert.equal(
    getNextOnlineSession(new Date("2026-08-13T14:59:59Z"))?.number,
    3,
  );
  assert.equal(getNextOnlineSession(new Date("2026-08-13T15:00:00Z"))?.number, 4);
});

// --- リアルサロン ---

test("リアルも開催当日はその回、翌日0:00（JST）に次の回へ", () => {
  assert.equal(
    getNextRealSession(new Date("2026-08-27T23:59:59+09:00"))?.title,
    "深層編 第1回",
  );
  assert.equal(
    getNextRealSession(new Date("2026-08-28T00:00:00+09:00"))?.title,
    "深層編 第2回",
  );
});

test("リアルは日程を使い切ると null（＝サイトは「調整中」表示になる）", () => {
  assert.equal(
    getNextRealSession(new Date("2026-09-30T23:59:59+09:00"))?.isoDate,
    "2026-09-30",
  );
  assert.equal(getNextRealSession(new Date("2026-10-01T00:00:00+09:00")), null);
});

test("リアルの日程と申込受付の日付がずれていない", () => {
  assert.deepEqual(
    realSessions.map((session) => session.isoDate),
    Object.keys(REAL_EVENT_POLICIES).sort(),
    "salon-schedule の realSessions と event-policy の REAL_EVENT_POLICIES を揃えること",
  );
});
