"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface MemberData {
  id: number;
  member_no: string;
  name: string;
  role: string;
  bio: string | null;
  favorite_era: string | null;
  joined_event_name: string | null;
  created_at: string;
}

interface Attendance {
  id: number;
  name: string;
  event_date: string;
  venue: string;
}

interface MypageData {
  member: MemberData;
  attendances: Attendance[];
  totalEvents: number;
}

function getRankInfo(count: number) {
  if (count >= 10) return { label: "金の印", emoji: "🥇", color: "text-amber-500" };
  if (count >= 5) return { label: "銀の印", emoji: "🥈", color: "text-gray-400" };
  if (count >= 3) return { label: "銅の印", emoji: "🥉", color: "text-orange-400" };
  return { label: "新参者", emoji: "🌱", color: "text-green-600" };
}

function getRoleLabel(role: string) {
  if (role === "lecturer") return "講師";
  if (role === "organizer") return "主催";
  return "会員";
}

export default function MypagePage() {
  const params = useParams();
  const memberNo = params.no as string;
  const [data, setData] = useState<MypageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!memberNo) return;
    fetch(`/api/mypage?no=${memberNo}`)
      .then((res) => {
        if (!res.ok) throw new Error("not found");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("会員情報が見つかりません"))
      .finally(() => setLoading(false));
  }, [memberNo]);

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr + "T00:00:00");
    const days = ["日", "月", "火", "水", "木", "金", "土"];
    return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}（${days[d.getDay()]}）`;
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

  if (error || !data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center">
        <h1 className="text-2xl font-serif font-bold text-sumi-dark mb-4">
          {error || "データの取得に失敗しました"}
        </h1>
        <Link
          href="/members"
          className="text-kokihi font-serif border-b border-kokihi/30 hover:border-kokihi transition-colors"
        >
          会員一覧へ
        </Link>
      </div>
    );
  }

  const { member, attendances, totalEvents } = data;
  const attendCount = attendances.length;
  const rank = getRankInfo(attendCount);
  const attendRate = totalEvents > 0 ? Math.round((attendCount / totalEvents) * 100) : 0;

  // Stamp card: show slots for total events
  const stampSlots = Math.max(totalEvents, 10);

  return (
    <div className="min-h-screen px-5 py-16 md:py-24">
      <div className="max-w-2xl mx-auto">
        {/* Member Card */}
        <div className="bg-white border border-sumi/10 shadow-lg overflow-hidden">
          {/* Card Header */}
          <div className="bg-sumi-dark text-kinari p-8 text-center relative">
            <div className="absolute top-4 right-4 text-xs opacity-50 font-serif">
              SOREMAKO MEMBERS
            </div>
            <div className="w-20 h-20 bg-kinari/10 border-2 border-kinari/30 mx-auto flex items-center justify-center mb-4">
              <span className="text-2xl font-serif font-bold tracking-widest">
                {member.member_no}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-serif font-bold mb-1">
              {member.name}
            </h1>
            <span className="text-xs tracking-widest opacity-70">
              {getRoleLabel(member.role)}
            </span>
          </div>

          {/* Rank & Stats */}
          <div className="p-8 border-b border-sumi/10">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className={`text-3xl ${rank.color}`}>{rank.emoji}</span>
              <span className="font-serif font-bold text-lg text-sumi-dark">
                {rank.label}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold font-serif text-kokihi">
                  {attendCount}
                </p>
                <p className="text-xs text-sumi/50 font-serif mt-1">参加回数</p>
              </div>
              <div>
                <p className="text-3xl font-bold font-serif text-sumi-dark">
                  {totalEvents}
                </p>
                <p className="text-xs text-sumi/50 font-serif mt-1">
                  総開催回数
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold font-serif text-sumi-dark">
                  {attendRate}%
                </p>
                <p className="text-xs text-sumi/50 font-serif mt-1">参加率</p>
              </div>
            </div>
            <p className="text-[10px] text-sumi/40 font-serif text-center mt-4">
              ※ 第4回以降の記録です（第1〜3回「近江歴史を学ぶ会」は未計測）
            </p>
          </div>

          {/* Stamp Card */}
          <div className="p-8 border-b border-sumi/10">
            <h2 className="font-serif font-bold text-sumi-dark mb-6 text-center">
              スタンプカード
            </h2>
            <div className="grid grid-cols-5 gap-3 max-w-xs mx-auto">
              {Array.from({ length: stampSlots }).map((_, i) => {
                const isAttended = i < attendCount;
                const eventName =
                  isAttended && attendances[i]
                    ? attendances[i].name
                    : null;

                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all ${
                        isAttended
                          ? "bg-kokihi text-white shadow-md"
                          : "border-2 border-dashed border-sumi/20 text-sumi/20"
                      }`}
                      title={eventName || undefined}
                    >
                      {isAttended ? "印" : i + 1}
                    </div>
                    {eventName && (
                      <span className="text-[10px] text-sumi/40 mt-1 text-center leading-tight font-serif">
                        {eventName.replace(/それまこ会/, "").trim()}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Next rank info */}
            {attendCount < 3 && (
              <p className="text-center text-xs text-sumi/50 font-serif mt-6">
                あと{3 - attendCount}回参加で「銅の印」に昇格！
              </p>
            )}
            {attendCount >= 3 && attendCount < 5 && (
              <p className="text-center text-xs text-sumi/50 font-serif mt-6">
                あと{5 - attendCount}回参加で「銀の印」に昇格！
              </p>
            )}
            {attendCount >= 5 && attendCount < 10 && (
              <p className="text-center text-xs text-sumi/50 font-serif mt-6">
                あと{10 - attendCount}回参加で「金の印」に昇格！
              </p>
            )}
          </div>

          {/* Attendance History */}
          <div className="p-8 border-b border-sumi/10">
            <h2 className="font-serif font-bold text-sumi-dark mb-4">
              参加履歴
            </h2>
            <div className="space-y-3">
              {attendances.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-4 py-2 border-b border-sumi/5 last:border-0"
                >
                  <div className="w-2 h-2 bg-kokihi rounded-full shrink-0" />
                  <div className="flex-1">
                    <p className="font-serif text-sm font-bold text-sumi-dark">
                      {a.name}
                    </p>
                    <p className="text-xs text-sumi/50 font-serif">
                      {formatDate(a.event_date)} / {a.venue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bio section */}
          {member.bio && (
            <div className="p-8 border-b border-sumi/10">
              <h2 className="font-serif font-bold text-sumi-dark mb-3">
                ひとこと
              </h2>
              <p className="font-serif text-sumi/70 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          )}

          {member.favorite_era && (
            <div className="p-8 border-b border-sumi/10">
              <h2 className="font-serif font-bold text-sumi-dark mb-2">
                好きな時代
              </h2>
              <p className="font-serif text-kokihi font-bold">
                {member.favorite_era}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link
            href="/apply"
            className="text-center bg-kokihi text-white px-6 py-3 font-serif font-bold hover:bg-sumi-dark transition-colors"
          >
            次回イベントに申し込む
          </Link>
          <Link
            href="/"
            className="text-center border border-sumi/20 text-sumi px-6 py-3 font-serif hover:bg-sumi hover:text-kinari transition-colors"
          >
            トップへ戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
