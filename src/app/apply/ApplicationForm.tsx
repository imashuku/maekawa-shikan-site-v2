"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/content/site";
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
  const [name, setName] = useState("");
  const [furigana, setFurigana] = useState("");
  const [memberNo, setMemberNo] = useState("");
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [afterparty, setAfterparty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [showMemberNo, setShowMemberNo] = useState(false);

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
          furigana: isNew ? furigana : "",
          member_no: isNew ? null : memberNo.trim() || null,
          event_id: event.id,
          is_new: isNew,
          afterparty,
        }),
      });
      const data = await response.json();
      setResult(
        response.ok
          ? { success: true, ...data }
          : { success: false, message: data.error },
      );
      if (response.status === 409 && isNew === false) setShowMemberNo(true);
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
          {result.member_no ? (
            <div className="mx-auto mt-9 max-w-sm border-t-4 border-kokihi bg-paper p-7">
              <p className="text-sm text-sumi/70">
                {result.is_new ? "次回から使う会員番号" : "あなたの会員番号"}
              </p>
              <p className="mt-2 font-serif text-4xl font-bold text-kokihi">
                No.{result.member_no}
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
    name.trim() && isNew !== null && (!isNew || furigana.trim()) && !submitting,
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

        <div className="mt-9 border border-kokihi/30 bg-white p-6 md:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-kokihi">LINEでかんたん申込</p>
          <h2 className="mt-3 text-xl font-bold">公式LINEに「参加」と送る</h2>
          <p className="mt-3 text-sm leading-7 text-sumi/75">
            LINEのトークから、そのまま参加をお知らせいただけます。
          </p>
          <a
            href={siteConfig.urls.lineParticipation}
            className="mt-5 flex w-full items-center justify-center bg-kokihi px-7 py-4 text-center font-bold text-white transition-colors hover:bg-sumi-dark"
          >
            LINEで参加を伝える
          </a>
          <p className="mt-3 text-xs leading-6 text-sumi/65">
            LINEのトーク画面が開いたら、入力済みの「参加」を送信してください。
            懇親会も希望する方は、続けてその旨をお知らせください。
          </p>
          <a
            href={siteConfig.urls.line}
            className="mt-2 inline-block text-xs text-sumi/70 underline underline-offset-4"
          >
            トーク画面が開かない場合はこちら
          </a>
        </div>

        <div className="mt-10 border-t border-sumi/20 pt-8">
          <h2 className="text-xl font-bold">Webフォームで申し込む</h2>
          <p className="mt-2 text-sm leading-7 text-sumi/70">
            LINEを使わない方はこちらから。以前参加した方は、まずお名前だけ入力してください。
          </p>
        </div>

        {result && !result.success ? (
          <div
            role="alert"
            className="mt-7 border border-red-300 bg-red-50 p-4 text-sm text-red-800"
          >
            <p>{result.message}</p>
            <a className="mt-3 inline-block font-bold underline" href={siteConfig.urls.line}>
              公式LINEで相談する
            </a>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="mt-7 space-y-7">
          <fieldset>
            <legend className="text-sm font-bold">これまでに参加したことがありますか？</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <label className={`flex cursor-pointer items-center gap-3 border p-4 ${isNew === false ? "border-kokihi bg-paper" : "border-sumi/20 bg-white"}`}>
                <input
                  type="radio"
                  name="participation-history"
                  checked={isNew === false}
                  onChange={() => setIsNew(false)}
                  className="h-5 w-5 accent-kokihi"
                />
                以前参加した
              </label>
              <label className={`flex cursor-pointer items-center gap-3 border p-4 ${isNew === true ? "border-kokihi bg-paper" : "border-sumi/20 bg-white"}`}>
                <input
                  type="radio"
                  name="participation-history"
                  checked={isNew === true}
                  onChange={() => setIsNew(true)}
                  className="h-5 w-5 accent-kokihi"
                />
                初めて参加する
              </label>
            </div>
          </fieldset>
          {isNew !== null ? (
            <>
              <div>
                <label htmlFor="name" className="text-sm font-bold">お名前</label>
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

              {isNew ? (
                <div>
                  <label htmlFor="furigana" className="text-sm font-bold">ふりがな</label>
                  <input
                    id="furigana"
                    value={furigana}
                    onChange={(input) => setFurigana(input.target.value)}
                    required
                    maxLength={100}
                    placeholder="例：やまだ たろう"
                    className="mt-2 w-full border border-sumi/25 bg-white px-4 py-4 text-base focus:border-kokihi focus:outline-none"
                  />
                </div>
              ) : (
                <div>
                  {!showMemberNo ? (
                    <button
                      type="button"
                      onClick={() => setShowMemberNo(true)}
                      className="text-sm text-sumi/70 underline underline-offset-4"
                    >
                      会員番号を入力する場合はこちら（任意）
                    </button>
                  ) : (
                    <>
                      <label htmlFor="memberNo" className="text-sm font-bold">
                        会員番号 <span className="font-normal text-sumi/60">任意</span>
                      </label>
                      <input
                        id="memberNo"
                        value={memberNo}
                        onChange={(input) => setMemberNo(input.target.value)}
                        inputMode="numeric"
                        autoComplete="off"
                        maxLength={12}
                        placeholder="分からなければ空欄のままで大丈夫です"
                        className="mt-2 w-full border border-sumi/25 bg-white px-4 py-4 text-base focus:border-kokihi focus:outline-none"
                      />
                    </>
                  )}
                </div>
              )}
            </>
          ) : null}

          {isNew !== null ? (
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
          ) : null}

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
