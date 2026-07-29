"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicRealEvent } from "@/lib/real-events";

type SubmissionResult = {
  success: boolean;
  message?: string;
  is_new?: boolean;
  member_no?: string;
  already_registered?: boolean;
};

function formatDate(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const date = new Date(year, month - 1, day);
  return `${year}/${String(month).padStart(2, "0")}/${String(day).padStart(
    2,
    "0",
  )}（${weekdays[date.getDay()]}）`;
}

export default function ApplicationForm({
  event,
}: {
  event: PublicRealEvent;
}) {
  const [participantType, setParticipantType] = useState<"new" | "existing">(
    "new",
  );
  const [name, setName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [memberNo, setMemberNo] = useState("");
  const [afterparty, setAfterparty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  async function handleSubmit(eventObject: React.FormEvent<HTMLFormElement>) {
    eventObject.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          furigana: participantType === "new" ? furigana : null,
          member_no: participantType === "existing" ? memberNo : null,
          event_id: event.id,
          is_new: participantType === "new",
          afterparty,
        }),
      });
      const data = await response.json();
      setResult(
        response.ok
          ? { success: true, ...data }
          : { success: false, message: data.error },
      );
    } catch {
      setResult({
        success: false,
        message: "通信エラーが発生しました。時間をおいてお試しください。",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (result?.success) {
    return (
      <section className="min-h-[70vh] py-20">
        <div className="mx-auto max-w-2xl px-5 text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            APPLICATION COMPLETE
          </p>
          <h1 className="mt-5 text-3xl font-bold md:text-5xl">
            {result.already_registered
              ? "すでにお申込み済みです"
              : "お申込みを受け付けました"}
          </h1>
          <p className="mt-6 font-serif text-xl font-bold">{event.name}</p>
          <p className="mt-2 text-sumi/65">
            {formatDate(event.event_date)} 18:30–｜{event.venue}
          </p>
          {result.is_new && result.member_no ? (
            <div className="mx-auto mt-9 max-w-sm border-t-4 border-kokihi bg-paper p-7">
              <p className="text-sm text-sumi/70">次回から使う会員番号</p>
              <p className="mt-2 font-serif text-4xl font-bold text-kokihi">
                No.{result.member_no}
              </p>
              <p className="mt-3 text-xs leading-6 text-sumi/70">
                次回の申込みに必要です。画面を保存してください。
              </p>
            </div>
          ) : null}
          <Link
            href="/"
            className="mt-9 inline-flex border border-sumi px-7 py-4 font-bold"
          >
            トップへ戻る
          </Link>
        </div>
      </section>
    );
  }

  const canSubmit = Boolean(
    name.trim() &&
      (participantType === "new" ? furigana.trim() : memberNo.trim()) &&
      !submitting,
  );

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-2xl px-5">
        <div className="text-center">
          <p className="text-xs font-bold tracking-[0.24em] text-kokihi">
            REAL SALON APPLICATION
          </p>
          <h1 className="mt-5 text-3xl font-bold md:text-5xl">参加お申込み</h1>
        </div>

        <div className="mt-10 border-t-4 border-kokihi bg-paper p-7">
          <h2 className="text-xl font-bold">{event.name}</h2>
          <p className="mt-3 font-serif text-lg font-bold">
            {formatDate(event.event_date)} 18:30–
          </p>
          <p className="mt-1 text-sm text-sumi/65">{event.venue}</p>
          {event.notes ? (
            <p className="mt-4 border-t border-sumi/15 pt-4 text-sm leading-7 text-sumi/70">
              {event.notes}
            </p>
          ) : null}
        </div>

        {result && !result.success ? (
          <div
            role="alert"
            className="mt-7 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          >
            {result.message}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-9 space-y-7">
          <fieldset>
            <legend className="text-sm font-bold">参加区分</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                ["new", "初めて参加する"],
                ["existing", "参加したことがある"],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className="flex cursor-pointer items-center gap-3 border border-sumi/20 bg-white p-4"
                >
                  <input
                    type="radio"
                    name="participantType"
                    value={value}
                    checked={participantType === value}
                    onChange={() =>
                      setParticipantType(value as "new" | "existing")
                    }
                    className="h-5 w-5 accent-kokihi"
                  />
                  <span className="font-bold">{label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <div>
            <label htmlFor="name" className="text-sm font-bold">
              お名前
            </label>
            <input
              id="name"
              value={name}
              onChange={(input) => setName(input.target.value)}
              autoComplete="name"
              required
              maxLength={80}
              className="mt-2 w-full border border-sumi/25 bg-white px-4 py-4 text-base focus:border-kokihi focus:outline-none"
            />
          </div>

          {participantType === "new" ? (
            <div>
              <label htmlFor="furigana" className="text-sm font-bold">
                ふりがな
              </label>
              <input
                id="furigana"
                value={furigana}
                onChange={(input) => setFurigana(input.target.value)}
                required
                maxLength={100}
                className="mt-2 w-full border border-sumi/25 bg-white px-4 py-4 text-base focus:border-kokihi focus:outline-none"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="memberNo" className="text-sm font-bold">
                会員番号
              </label>
              <input
                id="memberNo"
                value={memberNo}
                onChange={(input) => setMemberNo(input.target.value)}
                inputMode="numeric"
                autoComplete="off"
                required
                maxLength={12}
                placeholder="例：012"
                className="mt-2 w-full border border-sumi/25 bg-white px-4 py-4 text-base focus:border-kokihi focus:outline-none"
              />
              <p className="mt-2 text-xs leading-6 text-sumi/70">
                分からない場合は公式LINEからお問い合わせください。
              </p>
            </div>
          )}

          <label className="flex cursor-pointer items-start gap-3 border-y border-sumi/15 py-5">
            <input
              type="checkbox"
              checked={afterparty}
              onChange={(input) => setAfterparty(input.target.checked)}
              className="mt-0.5 h-6 w-6 shrink-0 accent-kokihi"
            />
            <span>
              <strong>懇親会にも参加する</strong>
              <span className="mt-1 block text-sm text-sumi/70">任意参加</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-kokihi px-7 py-5 font-bold text-white transition-colors hover:bg-sumi-dark disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "送信しています…" : "この内容で申し込む"}
          </button>
        </form>
      </div>
    </section>
  );
}
