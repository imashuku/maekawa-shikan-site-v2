import assert from "node:assert/strict";
import test from "node:test";
import {
  getRegistrationState,
  listOpenRegistrationDates,
} from "../src/lib/event-policy.ts";

test("8月27日の深層編は受付期間内ならopen", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-27",
      new Date("2026-07-30T12:00:00+09:00"),
    ),
    "open",
  );
});

test("受付終了時刻を過ぎたイベントはcompleted", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-27",
      new Date("2026-08-27T18:31:00+09:00"),
    ),
    "completed",
  );
});

test("明示されていない日付はdraft", () => {
  assert.equal(
    getRegistrationState(
      "2026-08-28",
      new Date("2026-07-30T12:00:00+09:00"),
    ),
    "draft",
  );
});

test("受付中の日付だけを返す", () => {
  assert.deepEqual(
    listOpenRegistrationDates(new Date("2026-08-28T12:00:00+09:00")),
    ["2026-09-30"],
  );
});
