import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "参加お申し込み｜それはまことですか？（前川史観プロジェクト）",
  description:
    "「それはまことですか？」講演会・イベントの参加お申し込みページ。現在募集中のイベント情報とお申し込みはこちらから。",
  path: "/apply",
});

export default function ApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
