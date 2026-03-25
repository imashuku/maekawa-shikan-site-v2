"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface EventInfo {
  id: number;
  name: string;
  event_date: string;
  venue: string;
}

export default function ApplyPage() {
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Form state
  const [isNew, setIsNew] = useState<boolean | null>(null);
  const [memberNo, setMemberNo] = useState("");
  const [name, setName] = useState("");
  const [afterparty, setAfterparty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    member_no?: string;
    message?: string;
    is_new?: boolean;
    already_registered?: boolean;
  } | null>(null);

  useEffect(() => {
    fetch("/api/apply")
      .then((res) => res.json())
      .then((data) => setEvent(data.event))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_no: isNew ? null : memberNo,
          name,
          event_id: event?.id,
          is_new: isNew,
          afterparty,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult({ success: true, ...data });
      } else {
        setResult({ success: false, message: data.error });
      }
    } catch {
      setResult({ success: false, message: "通信エラーが発生しました" });
    } finally {
      setSubmitting(false);
    }
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日（${days[d.getDay()]}）`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-serif text-sumi/50">
          読み込み中...
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-serif font-bold text-sumi-dark mb-4">
          現在募集中のイベントはありません
        </h1>
        <p className="text-sumi/70 font-serif mb-8">
          次回の開催をお楽しみに。
        </p>
        <Link
          href="/"
          className="text-kokihi font-serif border-b border-kokihi/30 hover:border-kokihi transition-colors"
        >
          トップへ戻る
        </Link>
      </div>
    );
  }

  // Success screen
  if (result?.success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <div className="max-w-lg w-full">
          <div className="text-6xl mb-8">🎌</div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-4">
            {result.already_registered
              ? "すでにお申し込み済みです"
              : "お申し込み完了！"}
          </h1>

          {result.is_new && (
            <div className="bg-kokihi/5 border border-kokihi/20 p-6 mb-8 mt-8">
              <p className="text-sm text-sumi/70 font-serif mb-2">
                あなたの会員番号
              </p>
              <p className="text-4xl font-bold font-serif text-kokihi tracking-widest">
                No.{result.member_no}
              </p>
              <p className="text-xs text-sumi/50 mt-3 font-serif">
                この番号をお控えください。次回以降のお申し込みに使います。
              </p>
            </div>
          )}

          {!result.is_new && !result.already_registered && (
            <div className="bg-sumi-dark/5 border border-sumi/10 p-6 mb-8 mt-8">
              <p className="text-sm text-sumi/70 font-serif mb-2">会員番号</p>
              <p className="text-3xl font-bold font-serif text-sumi-dark tracking-widest">
                No.{result.member_no}
              </p>
            </div>
          )}

          <p className="text-sumi/70 font-serif mb-2">
            {event.name}
          </p>
          <p className="text-sumi font-serif font-bold mb-8">
            {formatDate(event.event_date)} 18:30〜 / {event.venue}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href={`/mypage/${result.member_no}`}
              className="bg-kokihi text-white px-6 py-3 font-serif font-bold hover:bg-sumi-dark transition-colors"
            >
              マイページを見る
            </Link>
            <Link
              href="/"
              className="border border-sumi text-sumi px-6 py-3 font-serif hover:bg-sumi hover:text-kinari transition-colors"
            >
              トップへ戻る
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-5 py-16 md:py-24">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            ENTRY FORM
          </span>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-sumi-dark mb-4">
            参加お申し込み
          </h1>
          <div className="bg-white border border-sumi/10 p-6 shadow-sm mt-8">
            <h2 className="font-serif font-bold text-lg text-sumi-dark mb-3">
              {event.name}
            </h2>
            <p className="font-serif text-sumi">
              {formatDate(event.event_date)} 18:30〜
            </p>
            <p className="font-serif text-sumi/70 text-sm mt-1">
              {event.venue}（東近江市八日市本町9-19）
            </p>
            <p className="font-serif text-sm mt-2">
              会費：<span className="font-bold">2,000円</span>
              <span className="text-xs text-sumi/50 ml-2">（当日お支払い）</span>
            </p>
          </div>
        </div>

        {/* Error message */}
        {result && !result.success && (
          <div className="bg-red-50 border border-red-200 text-red-800 p-4 mb-6 font-serif text-sm">
            {result.message}
          </div>
        )}

        {/* Step 1: New or Existing */}
        {isNew === null && (
          <div className="space-y-4">
            <p className="font-serif text-center text-sumi mb-6">
              初めての方ですか？
            </p>
            <button
              onClick={() => setIsNew(true)}
              className="w-full bg-white border-2 border-sumi/20 p-6 text-left hover:border-kokihi transition-colors group"
            >
              <span className="font-serif font-bold text-lg text-sumi-dark group-hover:text-kokihi transition-colors">
                はじめて参加する
              </span>
              <p className="text-sm text-sumi/60 font-serif mt-1">
                会員番号が発行されます
              </p>
            </button>
            <button
              onClick={() => setIsNew(false)}
              className="w-full bg-white border-2 border-sumi/20 p-6 text-left hover:border-kokihi transition-colors group"
            >
              <span className="font-serif font-bold text-lg text-sumi-dark group-hover:text-kokihi transition-colors">
                会員番号を持っている
              </span>
              <p className="text-sm text-sumi/60 font-serif mt-1">
                以前参加されたことがある方
              </p>
            </button>
          </div>
        )}

        {/* Step 2: Form */}
        {isNew !== null && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isNew && (
              <div>
                <label className="block font-serif text-sm font-bold text-sumi-dark mb-2">
                  会員番号
                </label>
                <input
                  type="text"
                  value={memberNo}
                  onChange={(e) => setMemberNo(e.target.value)}
                  placeholder="例: 001"
                  className="w-full border border-sumi/20 px-4 py-3 font-serif bg-white focus:outline-none focus:border-kokihi transition-colors"
                  required
                />
              </div>
            )}

            <div>
              <label className="block font-serif text-sm font-bold text-sumi-dark mb-2">
                お名前
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="例: 山田太郎"
                className="w-full border border-sumi/20 px-4 py-3 font-serif bg-white focus:outline-none focus:border-kokihi transition-colors"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={afterparty}
                  onChange={(e) => setAfterparty(e.target.checked)}
                  className="w-5 h-5 accent-kokihi"
                />
                <span className="font-serif text-sumi">
                  懇親会にも参加する
                  <span className="text-xs text-sumi/50 ml-2">
                    （20:30〜 / 近隣店舗にて / 任意）
                  </span>
                </span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsNew(null);
                  setResult(null);
                }}
                className="border border-sumi/20 text-sumi px-6 py-3 font-serif hover:bg-sumi/5 transition-colors"
              >
                戻る
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 bg-kokihi text-white px-6 py-3 font-serif font-bold hover:bg-sumi-dark transition-colors disabled:opacity-50"
              >
                {submitting ? "送信中..." : "申し込む"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
