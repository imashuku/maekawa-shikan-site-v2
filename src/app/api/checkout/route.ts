import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "旧支援プランの受付は終了しました" },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
