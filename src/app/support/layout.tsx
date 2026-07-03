import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "支援する｜それはまことですか？（前川史観プロジェクト）",
  description:
    "埋もれた歴史に、光を。教科書にはない「もう一つの日本史」を共に紐解く支援プロジェクト。あなたの参加が、新たな真実を照らす灯火となります。",
  path: "/support",
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
