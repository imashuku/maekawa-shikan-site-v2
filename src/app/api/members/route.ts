import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { error: "この公開APIは終了しました" },
    {
      status: 410,
      headers: { "Cache-Control": "no-store" },
    },
  );
}
