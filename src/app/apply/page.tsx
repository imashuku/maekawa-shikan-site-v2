"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface EventInfo {
  id: number;
  name: string;
  event_date: string;
  venue: string;
}

interface MemberOption {
  member_no: string;
  name: string;
  furigana: string;
}

export default function ApplyPage() {
  const [event, setEvent] = useState<EventInfo | null>(null);
  const [memberList, setMemberList] = useState<MemberOption[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [selectedValue, setSelectedValue] = useState("");
  const [newName, setNewName] = useState("");
  const [afterparty, setAfterparty] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    member_no?: string;
    message?: string;
    is_new?: boolean;
    already_registered?: boolean;
  } | null>(null);

  const isNewMember = selectedValue === "__new__";
  const selectedMember = memberList.find((m) => m.member_no === selectedValue);

  useEffect(() => {
    Promise.all([
      fetch("/api/apply").then((r) => r.json()),
      fetch("/api/members").then((r) => r.json()),
    ])
      .then(([applyData, membersData]) => {
        setEvent(applyData.event);
        const sorted = (membersData as MemberOption[]).sort((a, b) =>
          (a.furigana || "").localeCompare(b.furigana || "", "ja")
        );
        setMemberList(sorted);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedValue) return;
    setSubmitting(true);

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          member_no: isNewMember ? null : selectedValue,
          name: isNewMember ? newName : selectedMember?.name,
          event_id: event?.id,
          is_new: isNewMember,
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

  const canSubmit =
    selectedValue && (isNewMember ? newName.trim() : true) && !submitting;

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
                次回からはお名前を選ぶだけで申し込めます
              </p>
            </div>
          )}

          {!result.is_new && !result.already_registered && (
            <div className="bg-sumi-dark/5 border border-sumi/10 p-6 mb-8 mt-8">
              <p className="font-serif text-sumi-dark">
                お申し込みありがとうございます！
              </p>
            </div>
          )}

          <p className="text-sumi/70 font-serif mb-2">{event.name}</p>
          <p className="text-sumi font-serif font-bold mb-8">
            {formatDate(event.event_date)} 18:30〜 / {event.venue}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link
              href={`/mypage/${result.member_no}`}
              className="bg-kokihi text-white px-6 py-3 font-serif font-bold hover:bg-sumi-dark transition-colors text-center"
            >
              マイページを見る
            </Link>
            <Link
              href="/"
              className="border border-sumi text-sumi px-6 py-3 font-serif hover:bg-sumi hover:text-kinari transition-colors text-center"
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

        {/* Single form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-serif text-sm font-bold text-sumi-dark mb-2">
              お名前
            </label>
            <select
              value={selectedValue}
              onChange={(e) => {
                setSelectedValue(e.target.value);
                setNewName("");
              }}
              className="w-full border border-sumi/20 px-4 py-3 font-serif bg-white focus:outline-none focus:border-kokihi transition-colors appearance-none"
              required
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M6 8L1 3h10z' fill='%23333'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <option value="">-- 選択してください --</option>
              {memberList
                .filter((m) => m.member_no !== "001") // 講師は除外
                .map((m) => (
                  <option key={m.member_no} value={m.member_no}>
                    {m.name}
                  </option>
                ))}
              <option value="__new__">
                ── この中にない方（初参加・久しぶり）
              </option>
            </select>
          </div>

          {/* New member: name input */}
          {isNewMember && (
            <div>
              <label className="block font-serif text-sm font-bold text-sumi-dark mb-2">
                お名前を入力してください
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="例: 山田太郎"
                className="w-full border border-sumi/20 px-4 py-3 font-serif bg-white focus:outline-none focus:border-kokihi transition-colors"
                required
                autoFocus
              />
            </div>
          )}

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
                  （20:30〜 / 近隣店舗 / 任意）
                </span>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-kokihi text-white px-6 py-4 font-serif font-bold hover:bg-sumi-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "送信中..." : "申し込む"}
          </button>
        </form>
      </div>
    </div>
  );
}
