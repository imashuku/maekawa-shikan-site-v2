"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Member {
  id: number;
  member_no: string;
  name: string;
  role: string;
  bio: string | null;
  favorite_era: string | null;
  attend_count: number;
  joined_event_name: string | null;
}

function getRankInfo(count: number) {
  if (count >= 10) return { label: "金", color: "bg-amber-400 text-amber-900" };
  if (count >= 5)
    return { label: "銀", color: "bg-gray-300 text-gray-700" };
  if (count >= 3)
    return { label: "銅", color: "bg-orange-300 text-orange-800" };
  return { label: "", color: "" };
}

function getRoleLabel(role: string) {
  if (role === "lecturer") return "講師";
  if (role === "organizer") return "主催";
  return null;
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then(setMembers)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse font-serif text-sumi/50">
          読み込み中...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            MEMBERS
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-sumi-dark mb-4">
            それまこメンバーズ
          </h1>
          <p className="font-serif text-sumi/70 text-sm md:text-base">
            「それはまことですか？」を共に問い続ける仲間たち
          </p>
          <div className="flex items-center justify-center gap-6 mt-8 text-sm font-serif text-sumi/60">
            <span>
              <span className="text-2xl font-bold text-sumi-dark">
                {members.length}
              </span>{" "}
              名
            </span>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => {
            const rank = getRankInfo(Number(member.attend_count));
            const roleLabel = getRoleLabel(member.role);

            return (
              <Link
                key={member.id}
                href={`/mypage/${member.member_no}`}
                className="group block bg-white border border-sumi/10 p-6 hover:shadow-lg hover:border-kokihi/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar placeholder with member number */}
                    <div className="w-12 h-12 bg-sumi-dark flex items-center justify-center text-kinari font-serif text-xs font-bold tracking-wider shrink-0">
                      {member.member_no}
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-sumi-dark group-hover:text-kokihi transition-colors">
                        {member.name}
                      </h3>
                      {roleLabel && (
                        <span className="text-xs text-kokihi font-bold">
                          {roleLabel}
                        </span>
                      )}
                    </div>
                  </div>
                  {rank.label && (
                    <span
                      className={`text-xs font-bold px-2 py-1 rounded-sm ${rank.color}`}
                    >
                      {rank.label}
                    </span>
                  )}
                </div>

                {member.bio && (
                  <p className="text-sm text-sumi/70 font-serif mb-3 line-clamp-2">
                    {member.bio}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-sumi/50 font-serif mt-auto pt-3 border-t border-sumi/5">
                  <span>参加 {member.attend_count}回</span>
                  {member.favorite_era && (
                    <span>好きな時代: {member.favorite_era}</span>
                  )}
                </div>

                {/* Stamp dots */}
                <div className="flex gap-1 mt-3">
                  {Array.from({ length: Number(member.attend_count) }).map(
                    (_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-kokihi rounded-full"
                      />
                    )
                  )}
                  {Array.from({
                    length: Math.max(0, 5 - Number(member.attend_count)),
                  }).map((_, i) => (
                    <div
                      key={`empty-${i}`}
                      className="w-3 h-3 border border-sumi/20 rounded-full"
                    />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-serif text-sumi/60 mb-6 text-sm">
            あなたも「まこと」を探す仲間になりませんか？
          </p>
          <Link
            href="/apply"
            className="inline-block bg-kokihi text-white px-8 py-4 font-serif font-bold hover:bg-sumi-dark transition-colors shadow-lg"
          >
            次回イベントに申し込む
          </Link>
        </div>
      </div>
    </div>
  );
}
