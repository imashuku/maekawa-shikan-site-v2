"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Member {
  id: number;
  member_no: string;
  name: string;
  role: string;
  bio: string | null;
  attend_count: number;
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
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-kokihi text-xs font-bold tracking-widest mb-4 block">
            MEMBERS
          </span>
          <h1 className="text-2xl md:text-4xl font-serif font-bold text-sumi-dark mb-4">
            それまこメンバーズ
          </h1>
          <p className="font-serif text-sumi/70 text-sm md:text-base">
            歴史の「まこと」を一緒に楽しむ仲間たち
          </p>
        </div>

        {/* Member count */}
        <div className="text-center mb-10">
          <span className="inline-block bg-sumi-dark text-kinari font-serif text-sm px-6 py-2 tracking-widest">
            現在 {members.length} 名
          </span>
        </div>

        {/* Members List */}
        <div className="bg-white border border-sumi/10 shadow-sm divide-y divide-sumi/5">
          {members.map((member) => {
            const roleLabel = getRoleLabel(member.role);
            const count = Number(member.attend_count);

            return (
              <Link
                key={member.id}
                href={`/mypage/${member.member_no}`}
                className="flex items-center gap-4 px-5 py-4 hover:bg-kokihi/3 transition-colors group"
              >
                {/* Number */}
                <span className="text-sm font-bold font-serif text-sumi/30 w-10 shrink-0 text-right tabular-nums">
                  {member.member_no}
                </span>

                {/* Name + Role */}
                <span className="flex-1 min-w-0">
                  <span className="font-serif font-bold text-sumi-dark group-hover:text-kokihi transition-colors">
                    {member.name}
                  </span>
                  {roleLabel && (
                    <span className="text-xs text-kokihi font-bold ml-2">
                      {roleLabel}
                    </span>
                  )}
                </span>

                {/* Stamp dots */}
                <span className="flex gap-1 shrink-0">
                  {Array.from({ length: count }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2.5 h-2.5 bg-kokihi rounded-full inline-block"
                    />
                  ))}
                </span>

                {/* Arrow */}
                <span className="text-sumi/20 group-hover:text-kokihi transition-colors shrink-0">
                  ›
                </span>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-col items-center gap-1 mt-4 text-xs text-sumi/40 font-serif">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-kokihi rounded-full inline-block" />
            <span>= 1回参加</span>
          </div>
          <span>※ 第4回以降の記録です（第1〜3回「近江歴史を学ぶ会」は未計測）</span>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="font-serif text-sumi/60 mb-6 text-sm">
            あなたも仲間になりませんか？
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
